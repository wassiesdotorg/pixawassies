export default function YellsAtPixa({ wassieid }) {
    return (
        <div className="mx-3 pt-4 self-center">
            <img src="womanyellsatpixa.jpg" className="w-[360px]" alt="woman yells at cat meme background" />
            <div
                className="w-6 h-6"
                style={{
                    position: "relative",
                    top: "-112px",
                    left: "284px",
                    backgroundSize: "260%",
                    backgroundImage: `url(/spritesheets/${wassieid}.png)`,
                    imageRendering: "pixelated",
                    transform: "scale(4) scaleX(-1)"
                }}
                alt={`Wassie spritesheet for ${wassieid}`}
            ></div>
        </div>
    )
}