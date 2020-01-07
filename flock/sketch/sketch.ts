const sketch = (p: p5) => {

    let v: Vehicle;

    p.setup = () => {
        // Canvas size
        p.createCanvas(600, 400);
        v = new Vehicle(p, 300, 200, 5);

        p.fill(255);
    };

    let mousePosition = function() {
        return p.createVector(p.mouseX, p.mouseY)
    };

    let force = function() {
        return p5.Vector.sub(mousePosition(), v.position)
            .mult(0.1)
            .sub(v.velocity)
    };

    p.draw = () => {
        p.background(55);

        v.applyForce(force());
        v.update();
        v.display();
    };

    p.mouseClicked = () => {
        console.log(`Force : ${force()}`);
        v.position = p.createVector(300, 200);
        v.velocity = p.createVector(0, 0)
    };

};

new p5(sketch);