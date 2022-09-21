require("dotenv").config();
const { MongoClient } = require("mongodb");
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const _ = require('lodash');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const canvas = createCanvas(48, 48);
const ctx = canvas.getContext('2d');

const traitOrder = [
    "Body",
    "Wassie Colour"
];

const imageFolder = "./public/pixawassies/traitimages";

const pixawassieFolder = "./public/pixawassies";

const notFoundImages = {};

const wassies = require("../../public/pixawassies/couches.json");

(async () => {

    for (let i = 0; i < wassies.length; i++) {

        // Grab a couch
        let wassie = wassies[i];
        console.log(`i: ${i} wassie: ${wassie._id}`);

        // Init canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let traits = traitOrder;



        // Loop over trait names
        for (let trait of traits) {
            // Grab trait value from wassie
            let value = wassie[trait];

            let filePath = "";

            filePath = `${imageFolder}/wassies/Couch_${trait}_${value}.png`;
            console.log(filePath);

            // Look up image. 
            try {
                let image = await loadImage(filePath);
                ctx.drawImage(image, 0, 0, 48, 48);
            } catch (e) {
                // not found images to notFoundArray     
                _.set(notFoundImages, `${wassie._id}.${trait}`, value);
            }
        }

        // Draw body placeholder
        let bodyimage = await loadImage(`${imageFolder}/wassies/Couch_Body.png`);
        ctx.drawImage(bodyimage, 0, 0, 48, 48);

        // Save image
        fs.writeFileSync(`${pixawassieFolder}/wassies/${wassie._id}.png`, canvas.toBuffer('image/png'));
    }
    // Add notFoundArray to notFound json file
    fs.writeFileSync(`${pixawassieFolder}/couchesNotFound.json`, JSON.stringify(notFoundImages));

    client.close();
})();