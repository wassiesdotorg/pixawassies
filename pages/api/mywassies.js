import got from "got";
import _ from "lodash";

const options = {
    chain: "eth",
    token_address: "0x1D20A51F088492A0f1C57f047A9e30c9aB5C07Ea",
    format: "decimal"
};

export default async function handler(req, res) {
    let url = `https://deep-index.moralis.io/api/v2/${req.query.address}/nft/0x1D20A51F088492A0f1C57f047A9e30c9aB5C07Ea`;
    let apiResponse = await got(url, {
        headers: {
            accept: 'application/json',
            'X-API-KEY': process.env.MORALIS_KEY
        }
    }).json();

    let IDs = [];
    if (apiResponse && _.isArray(apiResponse.result)) {
        IDs = apiResponse.result.map(wassie => wassie.token_id);
    }

    res.status(200).json(IDs);
}