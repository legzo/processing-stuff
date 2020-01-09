class FlowField {
    constructor(
        readonly p: p5,
        readonly width: number,
        readonly height: number,
        readonly resolution: number
    ) {
        this.columns = this.width / this.resolution
        this.rows = this.height / this.resolution
    }

    columns: number
    rows: number
    vectors: p5.Vector[][] = []

    make2dArray(n: number) {
        for (let i = 0; i < n; i++) {
            this.vectors[i] = [];
        }
        return this.vectors;
    }

    init() {
        // Reseed noise so we get a new flow field every time
        // Need to get noise working
        this.p.noiseSeed(Math.floor(this.p.random(10000)));

        this.vectors = this.make2dArray(this.columns)

        let xOffset = 0
        for (let y = 0; y < this.rows; y++) {
            let yOffset = 0
            for (let x = 0; x < this.columns; x++) {
                const theta = this.p.map(this.p.noise(xOffset, yOffset), 0, 1, 0, this.p.TWO_PI);
                this.vectors[x][y] = this.p.createVector(this.p.cos(theta), this.p.sin(theta))
                yOffset += 0.1
            }
            xOffset += 0.1
        }
    }

    display() {
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.drawVector(
                    this.vectors[i][j],
                    i * this.resolution,
                    j * this.resolution,
                    this.resolution - 2
                );
            }
        }
    }

    drawVector(v: p5.Vector, x: number, y: number, scale: number) {
        this.p.push();
        this.p.translate(x, y);
        this.p.stroke(200, 100);
        this.p.rotate(v.heading());
        const len = v.mag() * scale;
        this.p.line(0, 0, len, 0);
        this.p.pop();
    }

    lookup(position: p5.Vector) {
        const column = Math.floor(this.p.constrain(position.x / this.resolution, 0, this.columns - 1))
        const row = Math.floor(this.p.constrain(position.y / this.resolution, 0, this.rows - 1))
        return this.vectors[column][row].copy();
    };
}