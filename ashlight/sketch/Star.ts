class Star {
    constructor(
        readonly p: p5,
        readonly x: number,
        readonly y: number
    ) {
        this.position = p.createVector(x, y);
        this.previousPosition = p.createVector(x, y);
        this.velocity = p.createVector(0, 0);
        this.angle = p.atan2(y - 400/2, x - 600/2)
    }

    position: p5.Vector
    previousPosition: p5.Vector
    velocity: p5.Vector
    angle: number

    update(acceleration: number) {
        this.velocity.x += this.p.cos(this.angle) * acceleration
        this.velocity.y += this.p.sin(this.angle) * acceleration
        this.previousPosition = this.position
        this.position.add(this.velocity)
    }

    display() {
        this.p.strokeWeight(2);
        this.p.stroke('#fff');

        this.p.line(this.position.x, this.position.y, this.previousPosition.x, this.previousPosition.y)
    }

}