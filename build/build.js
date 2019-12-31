var Rectangle = (function () {
    function Rectangle(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
    return Rectangle;
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
    var margin = p.random(150, 250);
    var offsetRange = 30;
    var rectangles = Array();
    for (var x = margin; x < width - margin; x += steps) {
        for (var y = margin; y < height - margin; y += steps) {
            var size = p.random(20, 150);
            var offset = p.random(-offsetRange, offsetRange);
            rectangles.push(new Rectangle(x + offset, y + offset, size));
        }
    }
    return shuffle(rectangles);
};
var sketch = function (p) {
    var sliderJitter;
    var sliderSteps;
    var sliderOpacity;
    var sliderDepth;
    var stepsValue = 85;
    var previous;
    var rectangles;
    var color;
    p.setup = function () {
        p.rectMode(p.CENTER);
        p.stroke(0);
        p.strokeWeight(40);
        p.colorMode(p.HSL, 100);
        p.createCanvas(800, 800);
        color = HSLColor.random(p);
        sliderJitter = p.createSlider(0, 20, 7, 1);
        sliderJitter.position(10, 10);
        sliderJitter.style('width', '80px');
        sliderSteps = p.createSlider(25, 100, stepsValue, 5);
        sliderSteps.position(120, 10);
        sliderSteps.style('width', '80px');
        sliderOpacity = p.createSlider(0, 50, 17, 1);
        sliderOpacity.position(230, 10);
        sliderOpacity.style('width', '80px');
        sliderDepth = p.createSlider(0, 1, 0.22, 0.01);
        sliderDepth.position(340, 10);
        sliderDepth.style('width', '80px');
        rectangles = generateRandomSquares(p, p.width, p.height, stepsValue);
    };
    p.draw = function () {
        var newSteps = Number(sliderSteps.value());
        var jitter = Number(sliderJitter.value());
        if (newSteps !== stepsValue) {
            rectangles = generateRandomSquares(p, p.width, p.height, newSteps);
            stepsValue = newSteps;
        }
        p.stroke(255, 80);
        p.strokeWeight(4);
        if (previous !== rectangles || jitter !== 0) {
            p.clear();
            p.background("#333");
            rectangles.forEach(function (rect, index) {
                drawRect(rect, jitter, (index / rectangles.length));
            });
            previous = rectangles;
        }
    };
    p.keyPressed = function () {
        console.log(p.key);
        if (p.key === "i") {
            var info = {
                "jitter": sliderJitter.value(),
                "steps": sliderSteps.value(),
                "opacity": sliderOpacity.value(),
                "depth": sliderDepth.value()
            };
            console.log(info);
            return;
        }
        rectangles = generateRandomSquares(p, p.width, p.height, Number(sliderSteps.value()));
        if (p.key === "r") {
            newRandomColor();
        }
    };
    var newRandomColor = function () {
        color = HSLColor.random(p);
    };
    var drawRect = function (r, sizeVariation, depth) {
        var opacityOffset = Number(sliderOpacity.value());
        var depthOffset = Number(sliderDepth.value());
        var relativeSizeVariation = sizeVariation / (depth + depthOffset);
        p.fill(color.h, color.s, color.l, depth * 80 + opacityOffset);
        p.rect(r.x, r.y, r.size + p.random(0, relativeSizeVariation), r.size + p.random(0, relativeSizeVariation));
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