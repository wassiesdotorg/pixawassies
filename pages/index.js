import Head from 'next/head';
import WassieSelector from '../components/WassieSelector';
import { useEffect, useRef, useState } from 'react';
import CSSAnimatedWassie from '../components/CSSAnimatedWassie';
import GM from '../components/GM';
import PixaDrake from '../components/PixaDrake';
import YellsAtPixa from '../components/YellsAtPixa';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { isArray } from 'lodash';
import PFP from '../components/PFP';

export default function Home() {
  const randomIDs = Array.from({ length: 15 }, () => Math.floor(Math.random() * 12345));
  const [selectableWassies, setSelectableWassies] = useState([6514]);
  const [ownedWassieIDs, setOwnedWassieIDs] = useState([]);
  const [selectedWassie, setSelectedWassie] = useState(6514);
  const wassieIdInput = useRef(0);
  const { address } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const [mm, setMM] = useState(<button onClick={() => connect()}>Connect Wallet</button>);
  const { disconnect } = useDisconnect();

  const getMyWassies = async (address) => {
    let myWassieResponse;
    try {
      myWassieResponse = await (await fetch(`/api/mywassies?address=${address}`));
    } catch (e) {
      return [];
    }

    if (myWassieResponse && myWassieResponse.body) {
      let wassieIDs = await myWassieResponse.json();

      if (isArray(wassieIDs)) {
        setSelectableWassies(wassieIDs.concat([0, 6514, ...randomIDs]));
        setOwnedWassieIDs(wassieIDs);
      }
    }
    return []
  }

  useEffect(() => {
    // On page load, if address exists, load wallet wassies (and backfull to at least 8)
    if (address) {
      getMyWassies(address);
      setMM(
        <div className='text-2xl flex flex-row items-center'>
          {address.substring(1, 5) + '...' + address.substring(address.length - 4)}
          <button onClick={() => disconnect()}>
            <svg title="Disconnect" fill="none" style={{ width: '36px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <title>Disconnect</title> <path d="M5 3H3v18h18V3H5zm14 2v14H5V5h14zm-8 4H9V7H7v2h2v2h2v2H9v2H7v2h2v-2h2v-2h2v2h2v2h2v-2h-2v-2h-2v-2h2V9h2V7h-2v2h-2v2h-2V9z" fill="currentColor" /> </svg>
          </button>
        </div>);
    } else {
      setSelectableWassies([0, 6514, ...randomIDs])
      setMM(<button onClick={() => connect()}>Connect Wallet</button>)
    }
  }, [address]);

  return (
    <div className="font-text">
      <Head>
        <title>PixaWassies</title>
        <meta name="description" content="Pixelated byWassies Wassies" />
        <link rel="icon" href="/favicon.ico" />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-NCZJK7B8F6"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-NCZJK7B8F6', { page_path: window.location.pathname });
            `,
          }}
        />
      </Head>

      <main className="pb-4 flex flex-col justify-center items-center">
        {/* Full screen with massive tiled background */}
        <div className='title-section  min-w-[100vw] min-h-[20vh] flex flex-col justify-center items-center'>
          <div className='title-wrapper px-6 pt-8 pb-2 m-5 bg-white'>
            <h1 className="font-title text-3xl md:text-5xl text-center">

              <span style={{ color: "#ec00ff" }}>P</span>
              <span style={{ color: "#ff009a" }}>I</span>
              <span style={{ color: "#ffe200" }}>X</span>
              <span style={{ color: "#9100ff" }}>A</span>
              <span style={{ color: "#d3ff00" }}>W</span>
              <span style={{ color: "#ff0098" }}>A</span>
              <span style={{ color: "#4200ff" }}>S</span>
              <span style={{ color: "#a400ff" }}>S</span>
              <span style={{ color: "#ff0027" }}>I</span>
              <span style={{ color: "#ffe000" }}>E</span>
              <span style={{ color: "#00ffed" }}>S</span>

            </h1>
            <h2 className='text-center'>
              Smol 8-bit versions of your favorite wassies<br />
            </h2>
            <h3 className='text-slate-400 pt-4'>
              A <a href='https://bywassies.com/' rel="noreferrer" target={'_blank'}>byWassies</a> grant project by <a href='https://twitter.com/eterps' rel="noreferrer" target={'_blank'}>terp</a> and <a rel="noreferrer" target={'_blank'} href='https://twitter.com/DieCrypto'>DieCrypto</a>
            </h3>
          </div>
        </div>

        {/* 
            *******
             ABOUT
            *******
        */}

        <div className='choose-wassie-section flex flex-col items-center bg-sky-300 border-black border-y-8 w-full'>

          <div className='max-w-3xl mt-6 text-lg'>

            {/* WHAT IS A PIXAWASSIE  */}

            <h2 className="section-header text-2xl font-bold text-gray-800">
              What is a PixaWassie?
            </h2>

            <section className='spritesheet-info sm:flex my-8 items-center'>
              <div className='w-full flex flex-row sm:flex-col sm:w-1/2'>

                <div className='w-1/2 sm:w-full'>
                  <img src={`https://arweave.net/ABckdetHKeV8VgUoIZ53TMDKkTi56LhTf-Gb1Mdqx9c/${selectedWassie}.png`} alt={`Wassie image for ${selectedWassie}`} />
                </div>
                <div className='w-1/2 sm:w-full'>
                  <img src={`spritesheets/${selectedWassie}.png`}
                    style={{
                      imageRendering: "pixelated"
                    }}
                    className="flex-shrink-0 mb-4 sm:mb-0 w-full"
                  />
                </div>
              </div>
              <div className='px-4 sm:pr-0 sm:pl-4 text-left'>
                <p className='mb-4'>A PixaWassie is a pixel-art representation of a wassie from the byWassies collection.</p>
                <p>PixaWassies exist as a spritesheet with four frames - idle, walk, jump, and action.
                  These frames can be combined in fun and interesting was to make them come to life!</p>
              </div>
            </section>

            <h2 className="section-header text-2xl font-bold text-gray-800">
              Pixawassies In Action
            </h2>

            <section className='mt-6'>
              <p>
                {"All the li'l shids in the byWassies collection have been squished and pixelated, and are ready to be manhandled in whatever way you see fit. To see a few examples what pixawassies can do, choose a wassie from the gallery below and enjoy the fun."}
              </p>
            </section>

            {/* === WASSIE CHOOSER === */}
            <section className='wassie-chooser mt-6'>

              <p className="text-left mb-2 text-sm font-normal text-gray-500">
                {"A random assortment of wassies are available below. Scroll through the gallery and smash one with your mouse pointer or finger to see the pixa-version. If there is a particular smol you want, enter the ID in the box below and push le green button.  To see the shids you own, click 'connect wallet' and yours will be inserted into the gallery (along with more randos)."}
              </p>

              {/* Wassie Chooser Input Controls */}
              <div className='flex flex-col sm:flex-row sm:justify-between mb-4'>

                <div className='flex items-center my-4'>
                  <span className='mr-4 text-2xl'>Wassie ID:</span>
                  <input ref={wassieIdInput}
                    className="nes-input w-28 h-14 p-4 mr-4 "
                    defaultValue={selectedWassie}
                    type={'number'}
                    min={1} max={12344}
                    onKeyPress={(e) => { if (e.key === "Enter") setSelectedWassie(wassieIdInput.current.value) }}
                    onFocus={e => e.target.select()}
                  />
                  <button className='input-button' onClick={(e) => { setSelectedWassie(wassieIdInput.current.value) }}>{'>'}</button>
                </div>

                {mm}

              </div>

              {/* Wassie Selector Grid */}
              <div className="grid grid-cols-4 gap-4 mx-1 px-1.5 h-80 overflow-scroll">
                {selectableWassies.map((wassieId) => {
                  let isOwned = ownedWassieIDs.includes(wassieId);
                  return <WassieSelector wassieid={wassieId} isOwned={isOwned} key={wassieId} onclick={(e) => { setSelectedWassie(wassieId) }} />
                })}
              </div>

            </section>

            {/* CSS3 ANIMATIONS */}
            <section className='animation-info sm:flex justify-center items-center my-8 px-2'>
              <div className=' text-left sm:mr-8 sm:grow-1'>
                <p>You can use CSS, JavaScript, or even your favorite game engine or animation suite to put these wassies to work.</p>
              </div>
              <div className="sm:grow-1 flex flex-row justify-around">
                <div>
                  <CSSAnimatedWassie wassieid={selectedWassie} anim="walk" />
                  walk
                </div>

                <div>
                  <CSSAnimatedWassie wassieid={selectedWassie} anim="jump" />
                  jump
                </div>

                <div>
                  <CSSAnimatedWassie wassieid={selectedWassie} anim="action" />
                  action!
                </div>

              </div>
            </section>

            {/* WASSIE GAME */}
            <section className='my-8 w-full'>
              <h3>{"Here's a smol game you may have seen before, but now has been improved with wassies! Click/tap the window to start. To jump - use space or up-arrow on desktop or tap on mobile. Good luck :)"}</h3>
              <iframe className='w-full h-56' src={`wassierun/index.html?wassie=${selectedWassie}`}></iframe>
            </section>

            {/* MEMES */}
            <section className='memes mt-12'>
              <p className='text-left px-2'>{"Each spritesheet is also a transparent PNG. Use them as a PFP, drop them in your art projects, or make some memes!"}</p>
              <div className='my-4 flex flex-col justify-center items-center sm:flex-row sm:items-end flex-wrap'>
                <PFP wassieid={selectedWassie} />
                <GM wassieid={selectedWassie} />
                <PixaDrake wassieid={selectedWassie} />
                <YellsAtPixa wassieid={selectedWassie} />
              </div>
            </section>

            {/* DOWNLOAD */}
            <section className='title-wrapper mt-12 w-full bg-pink-500'>
              <div className='py-8 text-center'>
                Download the spritesheet here: <a className='text-xs sm:text-lg underline' href={`https://pixa.wassies.org/spritesheets/${selectedWassie}.png`}>https://pixa.wassies.org/spritesheets/{selectedWassie}.png</a>
                <img className="inline-block  ml-4" src={`/spritesheets/${selectedWassie}.png`} />
              </div>
            </section>

            {/* METAVERSE */}
            <section className='text-left w-full mt-12'>
              <h2 className='section-header text-2xl font-bold text-gray-800 mb-6'> Pixawassies in the Metaverse</h2>

              <div>

                <h3 className='mb-4 text-xl'>
                  <a href="https://webb.game/"> == Worldwide Web3 == </a>
                </h3>

                <p className='mb-2'>{'A free to play interoperable MMORPG metagame on Ethereum.'}</p>

                <p className='mb-2'>{"All Pixawassies have been added as playable characters!"}</p>

                <p className='mb-2'>Log into the game with your Wassie-infused wallet and pick your Pixawassie as an avatar.  Run around, do quests, chat with other NFT enjoyoooors, and play games (Rug Busters... so fun). You can even buy your wassie its own apartment! Check out their <a href="https://webb.game/">website</a>, <a href='https://twitter.com/Worldwide_WEB3' target="_blank" rel="noreferrer" alt="Web3 Twitter">Twitter</a>, and <a target="_blank" rel="noreferrer" href="https://t.co/8jrlIl2IPm">Discord</a> for more info.</p>

                <div className='my-4 flex flex-col justify-center items-center sm:flex-row sm:items-start flex-wrap'>

                  <div className="sm:w-2/4 overflow-hidden py-4 sm:px-4">
                    <div className="">
                      <img src='webbgame.png' alt="Pixawassie in Webb Game" />
                    </div>
                    <div className="pt-2 text-sm">
                      Explore and quest with wassie
                    </div>
                  </div>

                  <div className="sm:w-2/4 overflow-hidden  py-4 sm:px-4">
                    <div className="">
                      <img src='rugbusters.png' alt="Pixawassie in Rug Busters game" />
                    </div>
                    <div className="pt-2 text-sm">
                      Watch wassie die in Rug Busters
                    </div>
                  </div>
                </div>

              </div>

              <div>
                <p className='mb-4 text-xl'>
                  == Webaverse == <br /> Coming Soon?
                </p>
              </div>

            </section>

          </div>


        </div>

      </main >
    </div >
  )
}
