import use1 from "../img/use1.png"
import use2 from "../img/use2.png"
import use3 from "../img/use3.png"
import use4 from "../img/use4.png"

function About(){
    return (
        <div>
            <h1 className="text-3xl">About</h1>
            <div className=" text-sm sm:text-lg grid grid-cols-1 divide-y gap-y-3 mt-4 divide-black divide-opacity-10">
                <div>
                    <div>
                        BGM Playerとは、音楽を聴きながら作業したいときに、簡単に検索と再生ができるツールです。
                    </div>
                    <img className="border-2 w-full my-3" src={use1} alt="picture" />
                    <div>
                        まずはプラスボタンを押して、流したいBGMに関連するキーワードを追加しましょう。
                        このキーワードはブラウザに保存されるため、何度も同じキーワードを打ち込む手間が省けます
                    </div>
                </div>
                <div >
                    <div className="mt-3">
                        キーワードは、3種類まで登録することができます。例えばこのように使うとよいでしょう。
                    </div>
                    <img className="border-2 w-full my-3" src={use2} alt="picture" />
                </div>
                <div >
                    <div className="mt-3">
                        キーワードを選択したら、タイマーを選択し、Playボタンを押してください。
                        そうすると、選択したキーワード+bgmでYoutube検索を行い、結果からランダムに動画が再生されます。
                    </div>
                    <img className="border-2 w-full my-3 " src={use3} alt="picture" />
                </div>
                <div >
                    <div className="mt-3">
                        hidePlayerを押すと、Youtubeプレイヤーを隠すことができます。作業に集中できますね。
                    </div>
                    <img className="border-2 w-full my-3" src={use4} alt="picture" />
                </div>
                
            </div>
            
        </div>
    )
}

export default About;