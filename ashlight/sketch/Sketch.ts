///<reference path="Star.ts"/>


const sketch = (p: p5) => {

    const width = 500
    const height = 400

    const maxStars = 8000
    const starsPerClick = 1000
    const acceleration = 0.018

    const textX = 60
    const textY = 230

    const fontSize = 90

    let font: p5.Font
    let stars: Star[] = []

    const words = ["AshLight", " Bun <3 ", "Petit Pain", "Marianoo"]
    let wordIndex = 0
    let points: p5.Vector[] = []

    p.preload = () => {
        font = p.loadFont('https://cdn.glitch.global/a073e5a8-7198-4dea-8bbd-6e05664ab744/Inter-Bold.otf?v=1739829114401');

    }

    p.setup = () => {
        p.createCanvas(width, height)
        p.fill(255)
        drawStars()
    }

    function createStarsAt(points: p5.Vector[]): Star[] {
        return points.map((it) => new Star(p, it.x, it.y));
    }

    p.draw = () => {
        p.background('rgba(0, 0, 0, 0.20)')

        stars = stars.filter((it) => {
            it.update(acceleration);
            it.display()
            return it.isOnScreen()
        })
    }

    p.mouseClicked = debounce(() => {
        wordIndex = (wordIndex + 1) % words.length
        drawStars()
        console.log("changed word to " + getWord())
        spawnStars()()
    }, 500, true)

    p.keyPressed = () => {
        if (p.key === 'r') {
            wordIndex = (wordIndex + 1) % words.length
            drawStars()
        }
    }

    function spawnStars() {
        return () => {
            const shuffled = [...points].sort(() => 0.5 - Math.random());
            const starsToCreate = maxStars - stars.length
            let selected = shuffled.slice(0, p.min([starsPerClick, starsToCreate]));

            console.log(`${starsToCreate} stars to create`)

            stars.push(...createStarsAt(selected))
        };
    }

    p.deviceShaken = debounce(spawnStars(), 500, true)

    function getWord() {
        return words[wordIndex];
    }

    function drawStars() {
        const word = getWord();
        points = font.textToPoints(word, textX, textY, fontSize, {sampleFactor: 0.5})
        points = points.concat(font.textToPoints(word, textX, textY, fontSize - 2, {sampleFactor: 0.5}))
        points = points.concat(font.textToPoints(word, textX, textY, fontSize - 6, {sampleFactor: 0.5}))
    }

    /**
     * Retourne une fonction qui, tant qu'elle continue à être invoquée,
     * ne sera pas exécutée. La fonction ne sera exécutée que lorsque
     * l'on cessera de l'appeler pendant plus de N millisecondes.
     * Si le paramètre `immediate` vaut vrai, alors la fonction
     * sera exécutée au premier appel au lieu du dernier.
     * Paramètres :
     *  - func : la fonction à `debouncer`
     *  - wait : le nombre de millisecondes (N) à attendre avant
     *           d'appeler func()
     *  - immediate (optionnel) : Appeler func() à la première invocation
     *                            au lieu de la dernière (Faux par défaut)
     *  - context (optionnel) : le contexte dans lequel appeler func()
     *                          (this par défaut)
     */
    function debounce<T extends (...args: any[]) => void>(func: () => void, wait: number, immediate?: boolean, context?: T): () => void {
        // @ts-ignore
        let result: () => void = null;
        let timeout: ReturnType<typeof setTimeout> | undefined;
        return function () {
            // @ts-ignore
            let ctx = context || this, args = arguments;
            let later = function () {
                timeout = undefined;
                if (!immediate) {
                    // @ts-ignore
                    result = func.apply(ctx, args);
                }
            };
            let callNow = immediate && !timeout;
            // Tant que la fonction est appelée, on reset le timeout.
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                // @ts-ignore
                result = func.apply(ctx, args);
            }
            return result;
        };
    }


}

new p5(sketch)