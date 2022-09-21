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
    "Clothes",
    "Hat",
    "Eyes",
    "Feet",
    "Wieldable",
];

const traitOrderLevitation = [
    "Feet",
    "Clothes",
    "Hat",
    "Eyes",
    "Wieldable",
];

const imageFolder = "./public/pixawassies/traitimages";

const pixawassieFolder = "./public/pixawassies";

const notFoundImages = {};

const wassies = require("../../public/pixawassies/outcasts.json");

(async () => {

    for (let i = 0; i < wassies.length; i++) {
        //for (let i = 0; i < 5; i++) {

        // Grab a wassie
        let wassie = wassies[i];
        console.log(`i: ${i} wassie: ${wassie._id}`);

        // Init canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let traits = traitOrder;

        if (wassie.Feet === "Levitation") {
            traits = traitOrderLevitation;
        }

        // Loop over trait names
        for (let trait of traits) {

            // Grab trait value from wassie
            let value = wassie[trait];

            let filePath = "";

            if (trait === "Body") {
                filePath = `${imageFolder}/wassies/Outcast_${value}.png`;
            } else if (trait === "Eyes") {
                filePath = `${imageFolder}/wassies/${trait}_${value}_Outcast.png`;
                if (!fs.existsSync(filePath)) {
                    filePath = `${imageFolder}/wassies/${trait}_${value}.png`;
                }
            }
            else {
                filePath = `${imageFolder}/wassies/${trait}_${value}_${wassie.Body}.png`;
                if (!fs.existsSync(filePath)) {
                    filePath = `${imageFolder}/wassies/${trait}_${value}.png`;
                }
            }

            // Look up image. 
            try {
                let image = await loadImage(filePath);
                // found images to foundArray
                ctx.drawImage(image, 0, 0, 48, 48);
            } catch (e) {
                // not found images to notFoundArray     
                _.set(notFoundImages, `${wassie._id}.${trait}`, value);
            }
        }

        // Save image
        fs.writeFileSync(`${pixawassieFolder}/wassies/${wassie._id}.png`, canvas.toBuffer('image/png'));

    }
    // Add notFoundArray to notFound json file
    fs.writeFileSync(`${pixawassieFolder}/outcastsNotFound.json`, JSON.stringify(notFoundImages));

    client.close();
})();