const makeSketch = () => {

    const sketch = (p: p5) => {
        let params = {
            definition: 10,
        }
        let gui: any
        let guiVisible = true

        const desiredSize = 400

        p.setup = () => {
            // Modes

            p.colorMode(p.HSB, 100)
            // @ts-ignore
            gui = p.createGui(p).setPosition(20, 460)

            gui.addObject(params)
            p.noLoop()
        }

        p.draw = () => {
            let numberOfColumns = Math.floor(desiredSize / params.definition)
            let canvasSize = numberOfColumns * params.definition
            p.createCanvas(canvasSize, canvasSize)
            p.strokeWeight(2)
            p.background(220)
            let resolution = params.definition

            for (let x = 0; x <= canvasSize; x += resolution) {
                for (let y = 0; y <= canvasSize; y += resolution) {
                    p.circle(x + resolution / 2, y + resolution / 2, resolution)
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