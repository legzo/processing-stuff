const makeSketch = () => {

    const sketch = (p: p5) => {
        const canvasSize = 400
        let params = {
            radius: 50,
        }
        let gui: any
        let guiVisible = true

        p.setup = () => {
            // Modes

            p.colorMode(p.HSB, 100)
            // @ts-ignore
            gui = p.createGui(p).setPosition(canvasSize + 80, 20)

            gui.addObject(params)
            p.createCanvas(canvasSize, canvasSize)
        }

        p.draw = () => {
            p.background(220)
            let resolution = canvasSize / params.radius

            for (let x = resolution; x <= canvasSize - resolution; x += resolution) {
                for (let y = resolution; y <= canvasSize - resolution; y += resolution) {
                    p.circle(x, y, resolution)
                }
            }
        }

        p.keyPressed = () => {
            if (p.key === 'p') {
                guiVisible = !guiVisible;
                if (guiVisible) gui.show(); else gui.hide();
            }
        }

    }

    return new p5(sketch)
}

makeSketch()