const fs = require('fs');
const _ = require('lodash');
const { createCanvas, loadImage } = require('canvas');
const convert = require('color-convert');
const colors = require('../../public/pixawassies/colors.json');
const canvas = createCanvas(48, 48);
const ctx = canvas.getContext('2d');

const BODY_COLOR = "6ABE30";
const BELLY_COLOR = "D77BBA";
const ZOMBIE_ARM_COLOR = "AC3232";

async function generateColors(sourceFolder, outputFolder, swapColor) {
    // Open all Body Colour files
    const path = sourceFolder;
    const files = fs.readdirSync(path);
    console.log(files);

    // loop through them
    for (const file of files) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // load png into canvas
        let imgPath = `${path}/${file}`;
        let image = await loadImage(imgPath);

        // Loop through colors
        _.forEach(colors, function (hexCode, colorName) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0);
            // Read pixels into pixel array
            let img = ctx.getImageData(0, 0, canvas.width, canvas.height)
            let imgData = img.data;

            let color = convert.hex.rgb(hexCode);

            // Loop through all pixels in the image
            for (let i = 0; i < imgData.length; i += 4) {
                let hexColor = convert.rgb.hex([imgData[i], imgData[i + 1], imgData[i + 2]])

                // Replace old color with new color
                if (hexColor === swapColor) {
                    imgData[i] = color[0];
                    imgData[i + 1] = color[1];
                    imgData[i + 2] = color[2];
                    imgData[i + 3] = 255;
                }
            }
            // Create image 
            ctx.putImageData(img, 0, 0);

            // Write image to disk
            let fileData = canvas.toDataURL()?.replace(/^data:image\/png;base64,/, "");
            let fileName = `${file.slice(0, -4)}_${colorName}.png`
            fs.writeFileSync(`${outputFolder}/${fileName}`, fileData, { encoding: 'base64' })
        });
    }
}

(async () => {
    let bodySource = './public/pixawassies/traitimages/wassies/Body Colour Source';
    let bodyOutput = './public/pixawassies/traitimages/wassies/Body Colour';
    let bellySource = './public/pixawassies/traitimages/wassies/Belly Colour Source';
    let bellyOutput = './public/pixawassies/traitimages/wassies/Belly Colour';

    console.log("Generating wassie Bodies");
    generateColors(bodySource, bodyOutput, BODY_COLOR);
    console.log("Bodies Done");

    console.log("Generating wassie Bellies");
    generateColors(bellySource, bellyOutput, BELLY_COLOR);
    console.log("Bellies Done");
}
)();