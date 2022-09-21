const fs = require('fs');
const _ = require('lodash');
const { createCanvas, loadImage } = require('canvas');
const { endsWith } = require('lodash');

const WASSIES_HORIZ = 104;
const WASSIES_VERT = 105;
const canvas = createCanvas(WASSIES_HORIZ * 24, WASSIES_VERT * 24);
const ctx = canvas.getContext('2d');

const imagePath = './public/pixawassies/wassies';
const files = fs.readdirSync(imagePath).filter(filename => filename.includes('.png'));


(async () => {


    for (let i = 0; i <= (WASSIES_HORIZ * WASSIES_VERT); i++) {
        let row = (i / WASSIES_HORIZ) | 0;
        let col = i % WASSIES_HORIZ;
        let img;
        console.log(`${files[i + 1]}`);
        try {
            img = await loadImage(`${imagePath}/${files[i + 1]}`);
        } catch (e) {
            console.log('Error -- ', files[i + 1]);
            console.log(e.message);
            exit;
        }
        let rndm = Math.random();
        if (rndm < 0.25) {
            ctx.drawImage(img, 0, 0, 24, 24, (col * 24), (row * 24), 24, 24);
        } else if (rndm < 0.50) {
            ctx.drawImage(img, 0, 24, 24, 24, (col * 24), (row * 24), 24, 24);
        } else if (rndm < 0.75) {
            ctx.drawImage(img, 24, 0, 24, 24, (col * 24), (row * 24), 24, 24);
        } else {
            ctx.drawImage(img, 24, 24, 24, 24, (col * 24), (row * 24), 24, 24);
        }
    }

    const fileData = canvas.toBuffer();
    fs.writeFileSync(`./public/pixawassies/wassiecollage.png`, fileData)

    const SCALE = 4;
    const bigCanvas = createCanvas(WASSIES_HORIZ * 24 * SCALE, WASSIES_VERT * 24 * SCALE);
    const bigCanvasCtx = bigCanvas.getContext('2d');
    const bigImg = await loadImage(`./public/pixawassies/wassiecollage.png`);
    bigCanvasCtx.imageSmoothingEnabled = false;
    bigCanvasCtx.drawImage(bigImg, 0, 0, WASSIES_HORIZ * 24, WASSIES_VERT * 24, 0, 0, WASSIES_HORIZ * 24 * SCALE, WASSIES_VERT * 24 * SCALE)
    const buffer = bigCanvas.toBuffer()
    fs.writeFileSync(`./public/pixawassies/wassiecollage2.png`, buffer);
})();