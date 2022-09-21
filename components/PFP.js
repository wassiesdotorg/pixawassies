export default function PFP({ wassieid }) {
    return (
        <div className="title-wrapper flex w-[360px] h-[360px] mb-4">
            <div

                style={{
                    backgroundSize: "200%",
                    backgroundImage: `url(/spritesheets/${wassieid}.png)`,
                    imageRendering: "pixelated",
                    transform: "scaleX(-1)",
                    width: "100%",
                    height: "100%"
                }}
                alt={`Wassie spritesheet for ${wassieid}`}
            ></div>
        </div>
    )
}