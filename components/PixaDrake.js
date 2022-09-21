export default function PixaDrake({ wassieid }) {
    return (
        <div className="mx-3 pt-4">
            <img src="pixadrake.jpg" className="w-[360px]" alt="drake meme background" />
            <div
                className="w-6 h-6"
                style={{
                    position: "relative",
                    top: "-71px",
                    left: "258px",
                    backgroundSize: "200%",
                    backgroundImage: `url(/spritesheets/${wassieid}.png)`,
                    imageRendering: "pixelated",
                    transform: "scale(5) scaleX(-1)"
                }}
                alt={`Wassie spritesheet for ${wassieid}`}
            ></div>
        </div>
    )
}