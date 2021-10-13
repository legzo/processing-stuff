const makeSketch = () => {

    const sketch = (p: p5) => {
        let params = {
            definitionMin: 2,
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
            p.noStroke()
        }

        p.draw = () => {
            let numberOfColumns = Math.floor(desiredSize / params.definition)
            let board = new Board(p, numberOfColumns, params.definition)
            board.render()
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