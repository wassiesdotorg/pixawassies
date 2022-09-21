export default function CSSAnimatedWassie({ wassieid, anim }) {
    const url = `/spritesheets/${wassieid}.png`;
    let cssAnim;
    switch (anim) {
        case 'jump':
            cssAnim = 'jumpX 1.5s steps(2) infinite, jumpY 1.5s steps(2) infinite';
            break;
        case 'action':
            cssAnim = 'actionX 5s steps(2) infinite, actionY 5s steps(2) infinite';
            break;
        default:
            cssAnim = 'walkX .2s steps(2) infinite, walkY .2s steps(2) infinite'
    }

    return (
        <div className="title-wrapper bg-white w-24">
            <div
                className="w-24 h-24"
                style={{
                    backgroundSize: "200%",
                    backgroundImage: `url(${url})`,
                    imageRendering: "pixelated",
                    animation: cssAnim
                }}
                alt={`Wassie spritesheet for ${wassieid}`}
            ></div>
        </div>
    )
}