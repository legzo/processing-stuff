const sketch = (p: p5) => {

    // Canvas size
    const width = 300
    const height = 300
    let side = 50

    p.setup = () => {

        // Modes
        p.rectMode(p.CENTER)
        p.colorMode(p.HSB, 100)

        p.createCanvas(width, height)
        p.background(255)

        drawStuff()
    }

    p.draw = () => {

    }

    function drawStuff() {
        let corna = 20
        let cornb = 20
        p.background(255)
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
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
                else {
                    
                }
            }
        }
    }

    p.keyPressed = () => {
        if (p.key === "k") {
            side++
            drawStuff()
        }

        if (p.key === "j") {
            side--
            drawStuff()
        }

    }

}

new p5(sketch)

