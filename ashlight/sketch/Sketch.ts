///<reference path="Star.ts"/>

const sketch = (p: p5) => {

    const width = 600
    const height = 400
    let font: p5.Font
    let stars: Star[] = []

    p.preload = () => {
        font = p.loadFont('build/Inter-Bold.otf');

    }

    p.setup = () => {
        p.createCanvas(width, height)
        p.fill(255)

        const points = font.textToPoints("AshLight", 80, 200, 100, { sampleFactor : 0.15})
        stars = initStars(points)
    }


    function initStars(points: p5.Vector[]): Star[] {
        return points.map((it) => new Star(p, it.x, it.y));
    }


    p.draw = () => {
        p.background('rgba(0, 0, 0, 0.20)')
        //const acceleration = p.map(p.mouseX, 0, width, 0.005, 0.2);
        const acceleration = 0.01;
        stars.forEach((it) => {it.update(acceleration) ; it.display()})
    }

    p.mouseClicked = () => {
    }

    p.keyPressed = () => {
        console.log(p.key)
        if (p.key === 'r') {
        }
    }

}

new p5(sketch)