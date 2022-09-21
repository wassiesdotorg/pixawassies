export default function WassieSelector({ wassieid, isOwned, onclick }) {
    return (
        <div className={`wassie-selector title-wrapper bg-white ${isOwned ? "owned" : ""}`} onClick={onclick}>
            <img src={`https://arweave.net/ABckdetHKeV8VgUoIZ53TMDKkTi56LhTf-Gb1Mdqx9c/${wassieid}.png`} alt={`Wassie image for ${wassieid}`} />
            <div className="text-center">
                {wassieid}
            </div>
        </div>
    )
}