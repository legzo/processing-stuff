const sketch = (p: p5) => {

    let paramz = {
        steps: 5,
        stepsMin: 25,
        stepsMax: 100,

        jitter: 7,
        jitterMin: 0,
        jitterMax: 20,

        opacity: 15,
        opacityMin: 0,
        opacityMax: 50,

        depth: 0.22,
        depthMin: 0,
        depthMax: 1,
        depthStep: 0.02,
    }

    let gui: any;
    let guiVisible = true

    let previousShapes: Array<MyShape>;
    let shapes: Array<MyShape>;

    let shapeType = ShapeType.Square;

    let color: number, 
        width: number, 
        colorJitter: number = 25, 
        canvasSize: number;

    p.setup = () => {

        // Modes
        p.rectMode(p.CENTER);
        p.colorMode(p.HSB, 100);

        // Canvas size
        width = p.windowWidth;
        canvasSize = width * 0.80;

        p.createCanvas(canvasSize, canvasSize);

        // Init some values
        color = p.random(0, 100);
        paramz.steps = canvasSize / 15;


        // @ts-ignore
        gui = p.createGui(p);
        gui.addObject(paramz);

        shapes = generateRandomShapes(p, p.width, p.height, paramz.steps, color, colorJitter)
    };

    p.draw = () => {
        const newSteps = paramz.steps;
        const jitter = paramz.jitter;

        // refresh shapes if steps param has changed
        if (newSteps !== paramz.steps) {
            shapes = generateRandomShapes(p, p.width, p.height, newSteps, color, colorJitter);
            paramz.steps = newSteps
        }

        p.strokeWeight(3);

        // redraw only if rectangles are new or if jitter is active
        if (previousShapes !== shapes || jitter !== 0) {
            p.clear();

            shapes.forEach((rect, index) => {
                drawShape(rect, jitter, (index / shapes.length))
            });
            
            previousShapes = shapes
        }

    };
    
    let refreshShapes = () => {
        color = p.random(0, 100);
        shapes = generateRandomShapes(p, p.width, p.height, paramz.steps, color, colorJitter)
    };

    p.keyPressed = () => {
        console.log(p.key);
        
        if (p.key === "i") {
            console.log(paramz);
            return
        }

        if (p.key === "c") {
            shapeType = ShapeType.Circle;
            console.log("Circles now !")
        }

        if (p.key === "s") {
            shapeType = ShapeType.Square;
            console.log("Squares are ON !")
        }

        if (p.key === 'p') {
            guiVisible = !guiVisible;
            if (guiVisible) gui.show(); else gui.hide();
        }

        refreshShapes()
    };
    
    p.mouseClicked = refreshShapes;

    let drawShape = (
        shape: MyShape,
        sizeVariation: number,
        depth: number
    ) => {

        const depthOffset = paramz.depth;
        const relativeSizeVariation = sizeVariation / (depth + depthOffset);

        p.fill(shape.color.h, shape.color.s, shape.color.l, depth * 80 + paramz.opacity);

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
        
    };

};

new p5(sketch);