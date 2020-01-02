enum ShapeType { Circle, Square }

class MyShape {
    constructor(
        readonly x: number,
        readonly y: number,
        readonly size: number,
        readonly color: HSLColor
    ) { }
}

class HSLColor {
    constructor(
        readonly h: number,
        readonly s: number,
        readonly l: number
    ) { }

    static random(p: p5, baseHue: number, jitter: number): HSLColor {
        let randomishHue = baseHue + p.random(-jitter / 2, jitter / 2)
        return new HSLColor(randomishHue, p.random(10, 90), p.random(10, 90))
    }
}

var generateRandomShapes
    = (p: p5,
        width: number,
        height: number,
        steps: number,
        color: number,
        colorJitter: number
    ): Array<MyShape> => {

        let marginLower = width / 6
        let marginUpper = width / 3

        let margin = p.random(marginLower, marginUpper)
        let offsetRange = width / 20
        let rectangles = Array<MyShape>()

        let sizeLower = width / 20
        let sizeUpper = width / 4

        for (let x = margin; x < width - margin; x += steps) {
            for (let y = margin; y < height - margin; y += steps) {
                let size = p.random(sizeLower, sizeUpper)
                let offset = p.random(-offsetRange, offsetRange)
                rectangles.push(new MyShape(x + offset, y + offset, size, HSLColor.random(p, color, colorJitter)))
            }
        }

        return shuffle(rectangles)
    }