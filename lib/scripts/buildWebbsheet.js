const fs = require('fs');
const _ = require('lodash');
const { createCanvas, loadImage } = require('canvas');


const canvas = createCanvas(512, 128);
const ctx = canvas.getContext('2d');

const imagePath = './public/spritesheets';
const spritesheetFiles = fs.readdirSync(imagePath).filter(filename => filename.includes('.png'));

(async () => {
    for (let sheet of spritesheetFiles) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let img;
        console.log(`${sheet}`);
        try {
            img = await loadImage(`${imagePath}/${sheet}`);
        } catch (e) {
            console.log('Error -- ', files[i + 1]);
            console.log(e.message);
            exit;
        }

        // Row 1
        ctx.drawImage(img, 0, 0, 24, 24, 4, 8, 24, 24);
        ctx.drawImage(img, 0, 0, 24, 24, 36, 8, 24, 24);
        ctx.drawImage(img, 24, 24, 24, 24, 68, 8, 24, 24);
        ctx.drawImage(img, 24, 24, 24, 24, 100, 8, 24, 24);

        // Row 2
        ctx.save();
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(canvas, 0, 0, 128, 32, 384, 32, 128, 32);
        ctx.restore();

        // Row 3
        ctx.drawImage(img, 0, 0, 24, 24, 4, 72, 24, 24);

        // Row 4
        ctx.save();
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0, 24, 24, 484, 104, 24, 24);
        ctx.restore();


        const fileData = canvas.toBuffer();
        fs.writeFileSync(`./public/webbsheets/${sheet}`, fileData)
    }
    console.log('done');
})();