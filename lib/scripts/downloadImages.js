require("dotenv").config();
const fs = require('fs');
const { MongoClient } = require("mongodb");
const _ = require("lodash");
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const traitsCollection = client
    .db("loomlock")
    .collection("pixawassie_images");

(async () => {
    client.connect(async (err) => {
        let traitsWithImages = await traitsCollection.find({ pixaWassieImage: { $exists: true, $nin: ["", undefined, null] } }).toArray();

        traitsWithImages.forEach(t => {
            let imgData = t.pixaWassieImage?.replace(/^data:image\/png;base64,/, "");
            let fileName = `${t.trait_type}_${t.value}.png`
            console.log('filename ', fileName);
            console.log('image ', imgData);

            fs.writeFileSync(`./public/traitimages/${t.wassie_type}/` + fileName, imgData, { encoding: 'base64' })
        })

        client.close();
    });
})();