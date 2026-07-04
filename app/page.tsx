// クライアント側で実行
"use client";

// 状態管理のためのuseState,useEffectを使用
import { useState, useEffect } from "react";

// ねこ画像をより効率的に扱うためにnext / imageコンポーネントを使用(ESLintの指摘に対応)
import Image from "next/image";

// GitHub APIから返るデータの「形」を定義
interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null; // 説明文は空(null)の場合もある
  stargazers_count: number;
  language: string | null; // プロフィールのリポジトリは言語未設定(null)
}

export default function Home() {

  // 変数を操作するための「関数」宣言
  // 上からGitHub情報、ねこ画像URL、名前欄に入力された文字列を格納する。
  const [repos, setRepos] = useState<GitHubRepo[] | null>([]);
  const [catImageUrl, setCatImageUrl] = useState<string | null>(null);

  // useEffectによる関数のトリガー
  useEffect(() => {
    // APIの応答がある前に画面遷移され、State更新が空振りしないようにするフラグ(ESLintエラー対策)
    let isMounted = true;

    async function fetchAllData() {
      try {
        // 以下の三項演算子による未取得状態の判定用
        setRepos(null);
        setCatImageUrl(null);

        // 複数のfetchをPromise.allで同時に行う（表示速度向上のため）
        const [gitres, catres] = await Promise.all([
          fetch("https://api.github.com/users/masaki-y-devops/repos?sort=updated"),
          fetch("https://api.thecatapi.com/v1/images/search")
        ]);

        const data = await gitres.json();
        const images = await catres.json();

        // isMountedフラグを見て画面上にあるときだけ取得値をセット
        if (isMounted){
          setRepos(data?.slice(0, 8)); // 直近更新の8件取得
          setCatImageUrl(images[0].url);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchAllData();
    
    return () => {
      // 画面から消えるときに実行されるクリーンアップ関数
      // APIの応答がある前に画面遷移がされた場合、フラグを折る→State更新がされずエラー防止
      isMounted = false;
    }
  }, []);

  
  // 猫画像のonLoad時に作動する関数
  const whenImageLoaded = () => {
    // ボタンが押下されたことを示すフラグの取得を試行して代入
    const shouldScroll = localStorage.getItem('shouldScrollToCat');

    // もし取得が成功すれば、id=cat_sectionまで移動
    if (shouldScroll === 'true'){
      // 猫画像のセクションの位置を特定
      const catElement = document.getElementById('cat_section');

      // 自動スクロール
      if (catElement) {
        catElement.scrollIntoView({ behavior: 'auto', block: 'start' })
      }

      // 後始末としてフラグをクリア
      localStorage.removeItem('shouldScrollToCat');
    }
  }
  
  // 問い合わせボタン用処理
  const QueryBtnClick = () => {
	
    // ボタンが押されたことを示すフラグデータを保存しておく
    localStorage.setItem('shouldScrollToCat', 'true');

    // ボタン押下時のねこ画像更新用
    async function SpawnNewCat() {
      try {
        setCatImageUrl(null);
        const catres = await fetch("https://api.thecatapi.com/v1/images/search");
        const images = await catres.json();
        console.log("SpawnNetCat: 新しいねこを呼びました", images);
        setCatImageUrl(images[0].url);
      } catch (error) {
        console.error('通信エラー', error)
      }  
    }

    SpawnNewCat();
  }

  // スキルデータの配列
  const skills = [
    { name: "Shell", level: "中級？" },
    { name: "Nix", level: "初級" },
    { name: "C#", level: "初級" },
    { name: "TypeScript", level: "初級" },
    { name: "Python", level: "初級" },
    { name: "Haskell", level: "初級" },
  ];

  // return以下の要素が動的に変化する
  return (
    <main className="h-screen bg-slate-50 p-8 text-slate-900 overflow-y-auto">
      <div className="max-w-3xl mx-auto w-full">
        <header className="mb-12 text-center">
          <h1 className="text-2xl font-extrabold text-indigo-700 mb-2">masaki-y-devopsの遊び場</h1>
          <p className="text-slate-500">React(TypeScript)で構築</p>
        </header>

        <section className="mt-12">
          <h2 className="text-center text-xl font-bold mb-6 border-b-2 border-indigo-200 pb-2">
            勉強中の分野（言語）
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* mapを使ってループ処理 */}
            {skills.map((skill) => (
              <div key={skill.name} onClick={() => alert(`${skill.name}を学習中。現在、${skill.level}です。`)} 
              className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-bold">{skill.name}</h3>
                </div>

                {/* 条件分岐 レベルによって背景色を変えてみる */}
                <span className={`px-3 py-1 rounded-full text-white text-xs font-bold ${
                  skill.level === "上級（自称）" ? "bg-red-500" : 
                  skill.level === "中級？" ? "bg-green-500" : 
				          skill.level === "初級" ? "bg-blue-500" :
                  "bg-slate-400"
                }`}>
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </section>
		
		    <section className="mt-12">
          <h2 className="text-center text-xl font-bold mb-6 border-b-2 border-indigo-200 pb-2">
            公開中のGitHubリポジトリ
          </h2>

          {/* reposの中身で判定する三項演算子。API情報取得前はnullであるため後者の処理となり、データが入り次第前者の表示がされる */}
          {repos ? (
            <div className="grid grid-cols-2 gap-4">
            {repos.map((repo: GitHubRepo) => (
              <a 
                key={repo.id} 
                href={repo.html_url} 
                target="_blank" 
                className="block bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:border-indigo-400 transition-colors"
              >
                <h3 className="font-bold text-indigo-600">{repo.name}</h3>
                <p className="text-sm text-slate-500">{repo.description || "No description"}</p>
                <div className="mt-2 text-xs text-slate-400">Language: {repo.language || "N/A"}</div>
              </a>
            ))}
            </div>
          ) : (
            <div className="flex justify-center">
              <p className="text-center py-8 text-gray-500 text-sm animate-pulse">
                リポジトリ情報を読み込み中...
              </p>
            </div>
          )}
        </section>

        <section className="mt-12">
          <h2 className="text-center text-xl font-bold mb-6 border-b-2 border-indigo-200 pb-2">
            お気に入りの曲
          </h2>
          {/* Spotify公開プレイリストとの連携 */}
          {/* 自分のSpotifyアカウントに公開プレイリストを作成して紐付け、アカウント側の操作（曲の追加・削除）により動的に変化させる */}
          {/* iframe貼り付けで実装 */}
          <div className="shadow-md rounded-xl overflow-hidden">
            <iframe className="shadow-md rounded-xl" data-testid="embed-iframe" style={{ borderRadius: '12px', border: 'none' }} 
              src="https://open.spotify.com/embed/playlist/635C2n92A07J8urkBP5mqH?utm_source=generator&si=abf6821c55c94fc1" 
              width="100%" height="480" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy">
            </iframe>
          </div>
        </section>

        {/* 猫画像が見たい */}
        {/* スクロールの位置特定用にidを設定 */}
        <section className="mt-12" id="cat_section">
          <h2 className="text-center text-xl font-bold mb-6 border-b-2 border-indigo-200 pb-2">
            猫画像切らしてたので助かる
          </h2>

          {/* catImageUrlがある時「だけ」、imgタグを表示 */}
          {/* GitHub側と同じく三項演算子（条件付きレンダリング）*/}
          {catImageUrl ? (
            <div className="mt-6 flex justify-center">
              <div 
                className="w-full h-[500px] rounded-xl shadow-md overflow-hidden" 
                style={{ width: '100%', height: '500px', }}
              >
                <Image
                src={catImageUrl}
                alt="かわいいねこの画像"
                width={800}
                height={600}
                className="w-full h-auto"
                onLoad={whenImageLoaded}
                />
              </div>
            </div>
            ) : (
            <div className="flex justify-center">
              <p className="text-center py-8 text-gray-500 text-sm animate-pulse">
                ねこを読み込み中。。。ちょっとだけまってね
              </p>
            </div>    
            )    
          }
        </section>

        {/* --- お問い合わせセクション --- */}
        <section className="mt-12 max-w-3xl mx-auto bg-indigo-50 p-8 rounded-2xl border border-indigo-100">
          <h2 className="text-l font-bold mb-4 text-indigo-900">
            お問い合わせフォーム（よくあるやつ）
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-indigo-700">お名前</label>
              <input 
                type="text"
                placeholder="お名前の入力欄"
                className="w-full mt-1 p-2 rounded-md border border-indigo-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <button 
              onClick={QueryBtnClick}
              title="ただの送信ボタンじゃありません!"
              className="w-full bg-indigo-600 text-white py-2 rounded-md font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95">
              メッセージを送る（新しいねこを呼ぶ）
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
