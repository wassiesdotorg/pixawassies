export default function GM({ wassieid }) {
    return (
        <div className="mb-4 w-[360px] h-[360px]" style={{
            imageRendering: "pixelated"
        }}>
            <img
                src="gm_bg.png"
                className="w-full h-full"
                alt="gm background"
            />
            <div

                style={{
                    position: "relative",
                    top: "-234px",
                    left: "201px",
                    backgroundSize: "200%",
                    backgroundImage: `url(/spritesheets/${wassieid}.png)`,
                    imageRendering: "pixelated",
                    transform: "scaleX(-1)",
                    height: "144px",
                    width: "144px"
                }}
                alt={`Wassie spritesheet for ${wassieid}`}
            ></div>
        </div>
    )
}