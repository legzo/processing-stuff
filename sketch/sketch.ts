var sketch = (p: p5) => {

    let sliderSteps: p5.Element, sliderJitter: p5.Element, sliderOpacity: p5.Element, sliderDepth: p5.Element

    let previousShapes: Array<MyShape>
    let shapes: Array<MyShape>

    let color: HSLColor

    let shapeType = ShapeType.Square

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

        shapes = generateRandomSquares(p, p.width, p.height, stepsValue)
    }

    p.draw = () => {
        const newSteps = params().steps
        const jitter = params().jitter

        // refresh squares if steps param has changed
        if (newSteps !== stepsValue) {
            shapes = generateRandomSquares(p, p.width, p.height, newSteps)
            stepsValue = newSteps
        }

        p.stroke(255, 80)
        p.strokeWeight(4)

        // redraw only if rectangles are new or if jitter is active
        if (previousShapes !== shapes || jitter !== 0) {
            p.clear()
            p.background("#333")

            shapes.forEach((rect, index) => {
                drawShape(rect, jitter, (index / shapes.length))
            })
            
            previousShapes = shapes
        }

    }
    
    let refreshShapes = () => {
        color = HSLColor.random(p)
        shapes = generateRandomSquares(p, p.width, p.height, params().steps)
    }

    p.keyPressed = () => {
        console.log(p.key)
        
        if (p.key === "i") {
            console.log(params())
            return
        }

        if (p.key === "c") {
            shapeType = ShapeType.Circle
            console.log("Circles now !")
        }

        if (p.key === "s") {
            shapeType = ShapeType.Square
            console.log("Squares are ON !")
        }
        
        refreshShapes()
    }
    
    p.mouseClicked = refreshShapes

    let params = () => {
        return {
            jitter : Number(sliderJitter.value()),
            steps  : Number(sliderSteps.value()),
            opacity: Number(sliderOpacity.value()),
            depth  : Number(sliderDepth.value())
        }
    }

    let drawShape = (
        shape: MyShape,
        sizeVariation: number,
        depth: number
    ) => {

        const depthOffset = params().depth
        const relativeSizeVariation = sizeVariation / (depth + depthOffset)

        p.fill(color.h, color.s, color.l, depth * 80 + params().opacity)

        if (shapeType == ShapeType.Circle) {
            p.circle(
                shape.x,
                shape.y,
                shape.size + p.random(0, relativeSizeVariation)
            )
        }

        if (shapeType == ShapeType.Square) {
            p.square(
                shape.x,
                shape.y,
                shape.size + p.random(0, relativeSizeVariation)
            )
        }
        
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