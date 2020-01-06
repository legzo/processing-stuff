const sketch = (p: p5) => {

    p.setup = () => {
        // Canvas size
        p.createCanvas(600, 400);
    };

    p.draw = () => {
        p.fill(255);
        p.circle(p.width / 2, p.height / 2, 200)
    };

};

new p5(sketch);