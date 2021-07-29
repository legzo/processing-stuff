// noinspection JSPotentiallyInvalidConstructorUsage
const makeSketch = () => {

    const sketch = (p: p5) => {

        let params = {
            side: 50,
            definition: 100,
            definitionMin: 20,
            definitionMax: 400
        };
        let gui: any;
        let guiVisible = true


        p.setup = () => {

            // Modes
            p.rectMode(p.CENTER)
            p.colorMode(p.HSB, 100)

            // @ts-ignore
            gui = p.createGui(p);
            gui.addObject(params);

        }

        p.draw = () => {
            drawSquare(params.definition, params.side, "large")
        }

        function drawSquare(definition: number, side: number, cssClass: string) {
            p.createCanvas(definition, definition).addClass(cssClass)
            let corna = 20
            let cornb = 20
            p.background(255)
            for (let i = 0; i < definition; i++) {
                for (let j = 0; j < definition; j++) {
                    let x = corna + i * side / 100
                    let y = cornb + j * side / 100

                    const intValue = Math.floor(x * x + y * y)

                    if (intValue % 2 == 0) {
                        p.fill(0)
                        p.point(i, j)
                    }

                    if (intValue % 3 == 0) {
                        p.fill(100)
                        p.point(i, j)
                    }
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