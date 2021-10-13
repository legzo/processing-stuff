class Board {
    constructor(
        readonly p: p5,
        readonly nbOfColumns: number,
        readonly definition: number
    ) {
        this.cells = Array(nbOfColumns)
        for (let x = 0; x <= nbOfColumns; x++) {
            let col = Array(nbOfColumns)
            for (let y = 0; y <= nbOfColumns; y++) {
                col.push(new Cell(this.p, x * definition, y * definition, definition))
            }

            this.cells.push(col)
        }
    }

    cells: Cell[][]

    render() {
        let canvasSize = this.nbOfColumns * this.definition
        this.p.createCanvas(canvasSize, canvasSize)
        this.p.background(220)

        this.cells
            .forEach(cols => cols
                .forEach(cell => {
                    cell.render()
                }))
    }
 }

class Cell {
    constructor(
        readonly p: p5,
        readonly x: number,
        readonly y: number,
        readonly resolution: number
    ) {
    }

    isAlive: boolean = this.p.random([0, 1]) == 0

    render() {
        if (this.isAlive) {
            this.p.fill(20)
        }
        this.p.square(this.x, this.y, this.resolution)
        this.p.fill(255)
    }
}