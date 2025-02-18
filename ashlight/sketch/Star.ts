class Star {
    constructor(
        readonly p: p5,
        readonly x: number,
        readonly y: number
    ) {
        this.position = p.createVector(x, y);
        this.previousPosition = p.createVector(x, y);
        this.velocity = p.createVector(0, 0);
        this.angle = p.atan2(y - 400/2, x - 500/2)
    }

    position: p5.Vector
    previousPosition: p5.Vector
    velocity: p5.Vector
    angle: number

    possibleColors = ['rgba(255, 205, 255, xxx)', 'rgba(205, 255, 255, xxx)', 'rgba(255, 255, 205, xxx)']

    color = this.possibleColors[this.p.random([0, 1, 2])]

    update(acceleration: number) {
        this.velocity.x += this.p.cos(this.angle) * acceleration
        this.velocity.y += this.p.sin(this.angle) * acceleration
        this.previousPosition = this.position
        this.position.add(this.velocity)
    }

    display() {

        const alpha = this.p.map(this.velocity.mag(), 0, 3, 0, 1);
        this.p.strokeWeight(2);
        this.p.stroke(this.color.replace('xxx', alpha.toString()));

        this.p.line(this.position.x, this.position.y, this.previousPosition.x, this.previousPosition.y)
    }

    isOnScreen() {
        return this.position.x >= 0 && this.position.x <= 500 && this.position.y >= 0 && this.position.y <= 400;
    }

}