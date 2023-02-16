const fs = require('fs');
const _ = require('lodash');
const { createCanvas, loadImage } = require('canvas');
const { endsWith } = require('lodash');
const { handleWebpackExtenalForEdgeRuntime } = require('next/dist/build/webpack/plugins/middleware-plugin');
const WH = 48;
const WASSIES_HORIZ = 8;
const WASSIES_VERT = 8;
const STANDING_ONLY = true;
const canvas = createCanvas(WASSIES_HORIZ * WH, WASSIES_VERT * WH);
const ctx = canvas.getContext('2d');

const imagePath = './public/spritesheets';
const files = fs.readdirSync(imagePath).filter(filename => filename.includes('.png'));

/** Generates integers between low (inclusive) and high (exclusive) */
function generateRandomInteger(low, high) {
    const lowCeil = Math.ceil(low);
    const highFloor = Math.floor(high);
    const randomFloat = lowCeil + Math.random() * (highFloor - lowCeil);
    return Math.floor(randomFloat);
}

(async () => {
    //ctx.fillStyle = "#A793AF";
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < (WASSIES_HORIZ * WASSIES_VERT); i++) {
        let row = (i / WASSIES_HORIZ) | 0;
        let col = i % WASSIES_HORIZ;
        let img;

        let rndImg = generateRandomInteger(0, 12345);

        try {
            img = await loadImage(`${imagePath}/${files[rndImg]}`);
        } catch (e) {
            console.log('Error -- ', files[rndImg]);
            console.log(e.message);
            exit;
        }


        // Outlines w/ 1px canvas hack
        ctx.strokeStyle = '#A793AF';
        ctx.beginPath();
        let c = col * WH + 0.5;
        let r = row * WH + 0.5;
        ctx.moveTo(c, r);
        ctx.lineTo(c + WH, r);
        ctx.lineTo(c + WH, r + WH);
        ctx.stroke();


        if (STANDING_ONLY) {
            ctx.drawImage(img, 0, 0, 24, 24, (col * WH + 12), (row * WH + 8), 24, 24);
        } else {
            let rndm = Math.random();
            if (rndm < 0.25) {
                ctx.drawImage(img, 0, 0, 24, 24, (col * 28), (row * 28), 24, 24);
            } else if (rndm < 0.50) {
                ctx.drawImage(img, 0, 24, 24, 24, (col * 28), (row * 28), 24, 24);
            } else if (rndm < 0.75) {
                ctx.drawImage(img, 24, 0, 24, 24, (col * 28), (row * 28), 24, 24);
            } else {
                ctx.drawImage(img, 24, 24, 24, 24, (col * 28), (row * 28), 24, 24);
            }
        }
    }

    // Finish borders
    ctx.beginPath();
    ctx.moveTo(0.5, 0);
    ctx.lineTo(0.5, WH * WASSIES_VERT - 0.5);
    ctx.lineTo(WH * WASSIES_HORIZ - 0.5, WH * WASSIES_VERT - 0.5);
    ctx.lineTo(WH * WASSIES_HORIZ - 0.5, 0);
    ctx.stroke();

    const fileData = canvas.toBuffer();
    fs.writeFileSync(`./public/pixawassies/wasseks.png`, fileData)

    // const SCALE = 4;
    // const bigCanvas = createCanvas(WASSIES_HORIZ * WH * SCALE, WASSIES_VERT * WH * SCALE);
    // const bigCanvasCtx = bigCanvas.getContext('2d');
    // const bigImg = await loadImage(`./public/pixawassies/wassiecollage.png`);
    // bigCanvasCtx.imageSmoothingEnabled = false;
    // bigCanvasCtx.drawImage(bigImg, 0, 0, WASSIES_HORIZ * WH, WASSIES_VERT * WH, 0, 0, WASSIES_HORIZ * WH * SCALE, WASSIES_VERT * WH * SCALE)
    // const buffer = bigCanvas.toBuffer()
    // fs.writeFileSync(`./public/pixawassies/wassiecollage2.png`, buffer);
})();