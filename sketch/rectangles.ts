class Rectangle {
    constructor(
        readonly x: number,
        readonly y: number,
        readonly size: number
    ) {}
}

class HSLColor {
    constructor(
        readonly h: number,
        readonly s: number,
        readonly l: number
    ) { }

    static random(p: p5): HSLColor {
        return new HSLColor(p.random(0, 100), p.random(40, 60), p.random(30, 70))
    }
}

var generateRandomSquares
    = (p: p5, width: number, height: number, steps: number | null): Array<Rectangle> => {
        
        let marginLower = width / 6
        let marginUpper = width / 3
        
        let margin = p.random(marginLower, marginUpper)
        let offsetRange = width / 20
        let rectangles = Array<Rectangle>()

        let sizeLower = width / 20
        let sizeUpper = width / 4
        
        for (let x = margin; x < width - margin; x += steps) {
            for (let y = margin; y < height - margin; y += steps) {
                let size = p.random(sizeLower, sizeUpper)
                let offset = p.random(-offsetRange, offsetRange)                
                rectangles.push(new Rectangle(x + offset, y + offset, size))
            }
        }

        return shuffle(rectangles)
    }