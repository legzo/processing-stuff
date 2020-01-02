var ShapeType;
(function (ShapeType) {
    ShapeType[ShapeType["Circle"] = 0] = "Circle";
    ShapeType[ShapeType["Square"] = 1] = "Square";
})(ShapeType || (ShapeType = {}));
var MyShape = (function () {
    function MyShape(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
    return MyShape;
}());
var HSLColor = (function () {
    function HSLColor(h, s, l) {
        this.h = h;
        this.s = s;
        this.l = l;
    }
    HSLColor.random = function (p) {
        return new HSLColor(p.random(0, 100), p.random(40, 60), p.random(30, 70));
    };
    return HSLColor;
}());
var generateRandomSquares = function (p, width, height, steps) {
    var marginLower = width / 6;
    var marginUpper = width / 3;
    var margin = p.random(marginLower, marginUpper);
    var offsetRange = width / 20;
    var rectangles = Array();
    var sizeLower = width / 20;
    var sizeUpper = width / 4;
    for (var x = margin; x < width - margin; x += steps) {
        for (var y = margin; y < height - margin; y += steps) {
            var size = p.random(sizeLower, sizeUpper);
            var offset = p.random(-offsetRange, offsetRange);
            rectangles.push(new MyShape(x + offset, y + offset, size));
        }
    }
    return shuffle(rectangles);
};
var sketch = function (p) {
    var sliderSteps, sliderJitter, sliderOpacity, sliderDepth;
    var previousShapes;
    var shapes;
    var color;
    var shapeType = ShapeType.Square;
    var width, height, canvasSize, stepsValue;
    p.setup = function () {
        p.rectMode(p.CENTER);
        p.stroke(0);
        p.strokeWeight(40);
        p.colorMode(p.HSL, 100);
        width = p.windowWidth;
        canvasSize = width * 0.90;
        height = p.windowHeight;
        p.createCanvas(canvasSize, canvasSize);
        color = HSLColor.random(p);
        stepsValue = canvasSize / 15;
        initSliders(width, canvasSize + 90);
        shapes = generateRandomSquares(p, p.width, p.height, stepsValue);
    };
    p.draw = function () {
        var newSteps = params().steps;
        var jitter = params().jitter;
        if (newSteps !== stepsValue) {
            shapes = generateRandomSquares(p, p.width, p.height, newSteps);
            stepsValue = newSteps;
        }
        p.stroke(255, 80);
        p.strokeWeight(4);
        if (previousShapes !== shapes || jitter !== 0) {
            p.clear();
            p.background("#333");
            shapes.forEach(function (rect, index) {
                drawShape(rect, jitter, (index / shapes.length));
            });
            previousShapes = shapes;
        }
    };
    var refreshShapes = function () {
        color = HSLColor.random(p);
        shapes = generateRandomSquares(p, p.width, p.height, params().steps);
    };
    p.keyPressed = function () {
        console.log(p.key);
        if (p.key === "i") {
            console.log(params());
            return;
        }
        if (p.key === "c") {
            shapeType = ShapeType.Circle;
            console.log("Circles now !");
        }
        if (p.key === "s") {
            shapeType = ShapeType.Square;
            console.log("Squares are ON !");
        }
        refreshShapes();
    };
    p.mouseClicked = refreshShapes;
    var params = function () {
        return {
            jitter: Number(sliderJitter.value()),
            steps: Number(sliderSteps.value()),
            opacity: Number(sliderOpacity.value()),
            depth: Number(sliderDepth.value())
        };
    };
    var drawShape = function (shape, sizeVariation, depth) {
        var depthOffset = params().depth;
        var relativeSizeVariation = sizeVariation / (depth + depthOffset);
        p.fill(color.h, color.s, color.l, depth * 80 + params().opacity);
        if (shapeType == ShapeType.Circle) {
            p.circle(shape.x, shape.y, shape.size + p.random(0, relativeSizeVariation));
        }
        if (shapeType == ShapeType.Square) {
            p.square(shape.x, shape.y, shape.size + p.random(0, relativeSizeVariation));
        }
    };
    var initSliders = function (width, top) {
        var sliderWidthNum = (width / 2 - 40);
        var sliderWidth = sliderWidthNum + 'px';
        sliderJitter = p.createSlider(0, 20, 7, 1);
        sliderJitter.position(20, top);
        sliderJitter.style('width', sliderWidth);
        sliderSteps = p.createSlider(25, 100, stepsValue, 5);
        sliderSteps.position(20 + sliderWidthNum + 30, top);
        sliderSteps.style('width', sliderWidth);
        sliderOpacity = p.createSlider(0, 50, 17, 1);
        sliderOpacity.position(20, top + 60);
        sliderOpacity.style('width', sliderWidth);
        sliderDepth = p.createSlider(0, 1, 0.22, 0.01);
        sliderDepth.position(20 + sliderWidthNum + 30, top + 60);
        sliderDepth.style('width', sliderWidth);
    };
};
new p5(sketch);
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
//# sourceMappingURL=build.js.map