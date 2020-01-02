var sketch = (p: p5) => {

    let sliderSteps: p5.Element, 
        sliderJitter: p5.Element, 
        sliderOpacity: p5.Element, 
        sliderDepth: p5.Element

    let previousShapes: Array<MyShape>
    let shapes: Array<MyShape>

    let shapeType = ShapeType.Square

    let color: number, 
        width: number, 
        colorJitter: number = 25, 
        canvasSize: number, 
        stepsValue: number

    p.setup = () => {

        // Modes
        p.rectMode(p.CENTER)
        p.colorMode(p.HSB, 100)

        // Canvas size
        width = p.windowWidth
        canvasSize = width * 0.90

        p.createCanvas(canvasSize, canvasSize)

        // Init some values
        color = p.random(0, 100)
        stepsValue = canvasSize / 15

        initSliders(width, canvasSize + 90)

        shapes = generateRandomShapes(p, p.width, p.height, stepsValue, color, colorJitter)
    }

    p.draw = () => {
        const newSteps = params().steps
        const jitter = params().jitter

        // refresh shapes if steps param has changed
        if (newSteps !== stepsValue) {
            shapes = generateRandomShapes(p, p.width, p.height, newSteps, color, colorJitter)
            stepsValue = newSteps
        }

        p.strokeWeight(3)

        // redraw only if rectangles are new or if jitter is active
        if (previousShapes !== shapes || jitter !== 0) {
            p.clear()

            shapes.forEach((rect, index) => {
                drawShape(rect, jitter, (index / shapes.length))
            })
            
            previousShapes = shapes
        }

    }
    
    let refreshShapes = () => {
        color = p.random(0, 100)
        shapes = generateRandomShapes(p, p.width, p.height, params().steps, color, colorJitter)
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

        p.fill(shape.color.h, shape.color.s, shape.color.l, depth * 80 + params().opacity)

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