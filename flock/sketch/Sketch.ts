///<reference path="Vehicle.ts"/>
///<reference path="FlowField.ts"/>

const sketch = (p: p5) => {

    const numberOfVehicles = 50;
    const width = 600
    const height = 400

    let flowField: FlowField
    let vehicles: Vehicle[] = []

    let generateFleet = () => {
        for (let i = 0; i < numberOfVehicles; i++) {
            vehicles.push(new Vehicle(p, p.random(width - 10, width + 10), p.random(0, height), p.random(2, 6)))
        }
    }

    p.setup = () => {
        // Canvas size
        p.createCanvas(width, height)
        flowField = new FlowField(p, width, height, 20)
        flowField.init()

        generateFleet();

        p.fill(255);
    }

    let constraintByFlow = (vehicle: Vehicle) => {
        return flowField.lookup(vehicle.position)
            .mult(5)
    }

    p.draw = () => {
        p.background("#333")

        vehicles.forEach((vehicle) => {
            let force = vehicle.follow(flowField)
            vehicle.applyForce(force)
            vehicle.update()
            vehicle.display()
        })

        flowField.display()
    }

    p.mouseClicked = () => {
        flowField.init()
        generateFleet()
    }

    p.keyPressed = () => {
        console.log(p.key)
        if (p.key === 'r') {
            flowField.init()
        }
    }

}

new p5(sketch)