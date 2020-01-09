///<reference path="Vehicle.ts"/>
///<reference path="FlowField.ts"/>

const sketch = (p: p5) => {

    let vehicle: Vehicle
    let flowField: FlowField

    p.setup = () => {
        // Canvas size
        p.createCanvas(600, 400)
        vehicle = new Vehicle(p, 300, 200, 5)
        flowField = new FlowField(p, 600, 400, 20)
        flowField.init()
        p.fill(255);
    }

    let mousePosition = function() {
        return p.createVector(p.mouseX, p.mouseY)
    }

    let attractionToMouse = function() {
        return p5.Vector.sub(mousePosition(), vehicle.position)
            .mult(0.1)
            .mult(0)
    }

    let constraintByFlow = function() {
        let flowForce = flowField.lookup(vehicle.position);
        return flowForce.mult(5)
    }

    p.draw = () => {
        p.background("#333")
        let force = attractionToMouse()
                    .add(constraintByFlow())
                    .sub(vehicle.velocity);

        vehicle.applyForce(force)
        vehicle.update()
        vehicle.display()
        flowField.display()
    }

    p.mouseClicked = () => {
        console.log(`Force : ${attractionToMouse()}`)
        vehicle.position = p.createVector(300, 200)
        vehicle.velocity = p.createVector(0, 0)
    }

}

new p5(sketch)