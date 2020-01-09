class Vehicle {
    constructor(
        readonly p: p5,
        readonly x: number,
        readonly y: number,
        readonly size: number
    ) {
        this.position = p.createVector(x, y);
        this.velocity = p.createVector(0, 0);
        this.acceleration = p.createVector(0, 0);
    }

    position: p5.Vector;
    velocity: p5.Vector;
    acceleration: p5.Vector;

    applyForce(force: p5.Vector) {
        this.acceleration.add(force)
    }

    update() {
        this.velocity.add(this.acceleration)
        this.position.add(this.velocity);
        this.acceleration.mult(0)
    }

    display() {
        let theta = this.velocity.heading() + this.p.PI / 2;
        this.p.fill(127);
        this.p.stroke(200);
        this.p.strokeWeight(1);
        this.p.push();
        this.p.translate(this.position.x, this.position.y);
        this.p.rotate(theta);
        this.p.beginShape();
        this.p.vertex(0, -this.size * 2);
        this.p.vertex(-this.size, this.size * 2);
        this.p.vertex(this.size, this.size * 2);
        this.p.endShape(this.p.CLOSE);
        this.p.pop();
    }

}