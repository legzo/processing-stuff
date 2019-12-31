var sketch = (p: p5) => {

    let sliderJitter: p5.Element
    let sliderSteps: p5.Element
    let sliderOpacity: p5.Element
    let sliderDepth: p5.Element

    let stepsValue = 85

    let previous: Array<Rectangle>
    let rectangles: Array<Rectangle>

    let color: HSLColor

    p.setup = () => {

        p.rectMode(p.CENTER)

        p.stroke(0)
        p.strokeWeight(40)

        p.colorMode(p.HSL, 100)

        p.createCanvas(800, 800)

        color = HSLColor.random(p)

        sliderJitter = p.createSlider(0, 20, 7, 1)
        sliderJitter.position(10, 10)
        sliderJitter.style('width', '80px')

        sliderSteps = p.createSlider(25, 100, stepsValue, 5)
        sliderSteps.position(120, 10)
        sliderSteps.style('width', '80px')

        sliderOpacity = p.createSlider(0, 50, 17, 1)
        sliderOpacity.position(230, 10)
        sliderOpacity.style('width', '80px')

        sliderDepth = p.createSlider(0, 1, 0.22, 0.01)
        sliderDepth.position(340, 10)
        sliderDepth.style('width', '80px')

        rectangles = generateRandomSquares(p, p.width, p.height, stepsValue)
    }

    p.draw = () => {
        const newSteps = Number(sliderSteps.value())
        const jitter = Number(sliderJitter.value())

        if (newSteps !== stepsValue) {
            rectangles = generateRandomSquares(p, p.width, p.height, newSteps)
            stepsValue = newSteps
        }
        p.stroke(255, 80)
        p.strokeWeight(4)

        if (previous !== rectangles || jitter !== 0) {
            p.clear()
            p.background("#333")
            rectangles.forEach((rect, index) => {
                drawRect(rect, jitter, (index / rectangles.length))
            })
            previous = rectangles
        }

    }

    p.keyPressed = () => {
        console.log(p.key)

        if (p.key === "i") {
            const info = {
                "jitter" : sliderJitter.value(),
                "steps"  : sliderSteps.value(),
                "opacity": sliderOpacity.value(),
                "depth"  : sliderDepth.value()
            }

            console.log(info)
            return
        }

        rectangles = generateRandomSquares(p, p.width, p.height, Number(sliderSteps.value()))

        if (p.key === "r") {
            newRandomColor()
        }

    }

    let newRandomColor = () => {
        color = HSLColor.random(p)
    }

    let drawRect = (
        r: Rectangle,
        sizeVariation: number,
        depth: number
    ) => {

        const opacityOffset = Number(sliderOpacity.value())
        const depthOffset = Number(sliderDepth.value())
        const relativeSizeVariation = sizeVariation / (depth + depthOffset)

        p.fill(color.h, color.s, color.l, depth * 80 + opacityOffset)

        p.rect(
            r.x,
            r.y,
            r.size + p.random(0, relativeSizeVariation),
            r.size + p.random(0, relativeSizeVariation)
        )
    }
}

new p5(sketch)