var sketch = (p: p5) => {

    let sliderSteps: p5.Element, sliderJitter: p5.Element, sliderOpacity: p5.Element, sliderDepth: p5.Element

    let previous: Array<Rectangle>
    let rectangles: Array<Rectangle>

    let color: HSLColor

    let width: number, height: number, canvasSize: number, stepsValue: number

    p.setup = () => {

        p.rectMode(p.CENTER)

        p.stroke(0)
        p.strokeWeight(40)

        p.colorMode(p.HSL, 100)

        width = p.windowWidth
        canvasSize = width * 0.90
        height = p.windowHeight

        p.createCanvas(canvasSize, canvasSize)

        color = HSLColor.random(p)

        stepsValue = canvasSize / 15

        initSliders(width, canvasSize + 90)

        rectangles = generateRandomSquares(p, p.width, p.height, stepsValue)
    }

    p.draw = () => {
        const newSteps = params().steps
        const jitter = params().jitter

        // refresh squares if steps param has changed
        if (newSteps !== stepsValue) {
            rectangles = generateRandomSquares(p, p.width, p.height, newSteps)
            stepsValue = newSteps
        }

        p.stroke(255, 80)
        p.strokeWeight(4)

        // redraw only if rectangles are new or if jitter is active
        if (previous !== rectangles || jitter !== 0) {
            p.clear()
            p.background("#333")

            rectangles.forEach((rect, index) => {
                drawRect(rect, jitter, (index / rectangles.length))
            })
            
            previous = rectangles
        }

    }
    
    let refreshSquares = () => {
        color = HSLColor.random(p)
        rectangles = generateRandomSquares(p, p.width, p.height, params().steps)
    }

    p.keyPressed = () => {
        console.log(p.key)
        
        if (p.key === "i") {
            console.log(params())
            return
        }
        
        refreshSquares()
    }
    
    p.mouseClicked = refreshSquares

    let params = () => {
        return {
            jitter : Number(sliderJitter.value()),
            steps  : Number(sliderSteps.value()),
            opacity: Number(sliderOpacity.value()),
            depth  : Number(sliderDepth.value())
        }
    }

    let drawRect = (
        r: Rectangle,
        sizeVariation: number,
        depth: number
    ) => {

        const depthOffset = params().depth
        const relativeSizeVariation = sizeVariation / (depth + depthOffset)

        p.fill(color.h, color.s, color.l, depth * 80 + params().opacity)

        p.rect(
            r.x,
            r.y,
            r.size + p.random(0, relativeSizeVariation),
            r.size + p.random(0, relativeSizeVariation)
        )
    }

    let initSliders = (width: number, top: number) => {
        const sliderWidthNum = (width / 2 - 40)
        const sliderWidth = sliderWidthNum + 'px'

        sliderJitter = p.createSlider(0, 20, 7, 1)
        sliderJitter.position(20, top)
        sliderJitter.style('width', sliderWidth)

        sliderSteps = p.createSlider(25, 100, stepsValue, 5)
        sliderSteps.position(20 + sliderWidthNum + 30, top)
        sliderSteps.style('width', sliderWidth)

        sliderOpacity = p.createSlider(0, 50, 17, 1)
        sliderOpacity.position(20, top + 60)
        sliderOpacity.style('width', sliderWidth)

        sliderDepth = p.createSlider(0, 1, 0.22, 0.01)
        sliderDepth.position(20 + sliderWidthNum + 30, top + 60)
        sliderDepth.style('width', sliderWidth)
    } 
}

new p5(sketch)