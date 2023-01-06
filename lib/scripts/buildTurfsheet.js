const fs = require('fs');
const _ = require('lodash');
const { createCanvas, loadImage } = require('canvas');


const canvas = createCanvas(192, 72);
//const canvas = createCanvas(192, 24);
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
        ctx.drawImage(img, 0, 0, 24, 24, 0, 0, 24, 24);
        ctx.drawImage(img, 0, 0, 24, 24, 24, 0, 24, 24);
        ctx.drawImage(img, 0, 0, 24, 24, 48, 0, 24, 24);
        // flip
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 24, 24, 24, -97, 0, 24, 24);
        ctx.drawImage(img, 0, 0, 24, 24, -121, 0, 24, 24);
        ctx.drawImage(img, 0, 0, 24, 24, -145, 0, 24, 24);
        ctx.drawImage(img, 0, 0, 24, 24, -169, 0, 24, 24);
        ctx.restore();
        // unflipped
        ctx.drawImage(img, 0, 24, 24, 24, 168, 0, 24, 24);


        // Row 2
        ctx.drawImage(img, 0, 0, 24, 24, 0, 24, 24, 24);
        ctx.drawImage(img, 0, 0, 24, 24, 24, 24, 24, 24);
        ctx.drawImage(img, 24, 24, 24, 24, 48, 24, 24, 24);
        ctx.drawImage(img, 24, 24, 24, 24, 72, 24, 24, 24);
        ctx.drawImage(img, 0, 0, 24, 24, 96, 24, 24, 24);
        ctx.drawImage(img, 0, 0, 24, 24, 120, 24, 24, 24);
        ctx.drawImage(img, 24, 24, 24, 24, 144, 24, 24, 24);
        ctx.drawImage(img, 24, 24, 24, 24, 168, 24, 24, 24);


        // // Row 3
        ctx.save();
        //ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0, 24, 24, -25, 48, 24, 24);
        ctx.drawImage(img, 24, 24, 24, 24, -49, 48, 24, 24);
        ctx.drawImage(img, 24, 24, 24, 24, -73, 48, 24, 24);
        ctx.drawImage(img, 0, 0, 24, 24, -97, 48, 24, 24);
        ctx.drawImage(img, 0, 0, 24, 24, -121, 48, 24, 24);
        ctx.drawImage(img, 24, 24, 24, 24, -145, 48, 24, 24);
        ctx.drawImage(img, 24, 24, 24, 24, -169, 48, 24, 24);
        ctx.drawImage(img, 0, 0, 24, 24, -193, 48, 24, 24);
        ctx.restore();

        const fileData = canvas.toBuffer();
        fs.writeFileSync(`./public/turfsheets/${sheet}`, fileData)
    }
    console.log('done');
})();