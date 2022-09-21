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
    "Body Colour",
    "Belly Colour",
    "Sigil",
    "Clothes",
    "Beak",
    "Eyes",
    "Hat",
    "Feet",
    "Wieldable",
];

const imageFolder = "./public/pixawassies/traitimages";

const pixawassieFolder = "./public/pixawassies";

const notFoundImages = {};

const wassies = require("../../public/pixawassies/wassies.json");

(async () => {

    for (let i = 0; i < wassies.length; i++) {
        //for (let i = 0; i < 5; i++) {

        // Grab a wassie
        let wassie = wassies[i];
        console.log(`i: ${i} wassie: ${wassie._id}`);

        // Init canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Loop over traitOrder
        for (let trait of traitOrder) {

            // Grab trait value from wassie
            let value = wassie[trait];

            let filePath = "";

            if (trait === "Belly Colour" || trait === "Body Colour") {
                filePath = `${imageFolder}/wassies/${trait}/${wassie.Body}_${value}.png`;
            } else {
                filePath = `${imageFolder}/wassies/${trait}_${value}_${wassie.Body}.png`;
                if (!fs.existsSync(filePath)) {
                    filePath = `${imageFolder}/wassies/${trait}_${value}.png`;
                } else {
                    console.log('Using ', filePath);
                }
            }

            //console.log('Filepath: ', filePath);

            // Look up image. 
            try {
                let image = await loadImage(filePath);
                // found images to foundArray
                ctx.drawImage(image, 0, 0, 48, 48);
            } catch (e) {
                // not found images to notFoundArray
                if (trait !== "Belly Colour" && !["Ruby", "Rock", "Crystal", "Frozen", "Glitch", "Random", "Water", "Emerald"].includes(value))
                    _.set(notFoundImages, `${wassie._id}.${trait}`, value);
            }
        }

        // Save image
        fs.writeFileSync(`${pixawassieFolder}/wassies/${wassie._id}.png`, canvas.toBuffer('image/png'));

    }
    // Add notFoundArray to notFound json file
    fs.writeFileSync(`${pixawassieFolder}/notFound.json`, JSON.stringify(notFoundImages));

    client.close();
})();