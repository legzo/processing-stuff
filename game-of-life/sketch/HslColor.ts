class HSLColor {
    constructor(
        readonly h: number,
        readonly s: number,
        readonly l: number
    ) {
    }

    static random(p: p5): HSLColor {
        return new HSLColor(p.random(0, 100), p.random(10, 90), p.random(10, 90))
    }
}