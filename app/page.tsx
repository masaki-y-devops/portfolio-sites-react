// クライアント側で実行
"use client";

// 状態管理のためのuseState,useEffectを使用
import { useState, useEffect } from "react";

// GitHub APIから返るデータの「形」を定義
interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null; // 説明文は空(null)の場合もある
  stargazers_count: number;
  language: string | null;
}

export default function Home() {

  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [catImageUrl, setCatImageUrl] = useState<string | null>(null);
	
  // GitHub情報取得
  // インフラでいう curl コマンド的な役割となる
  // ラグを考慮し、非同期処理で実行
  useEffect(() => {
    const fetchRepos = async () => {
      // GitHub APIより、自分のGitHubの公開リポジトリ情報を取得
      const response = await fetch("https://api.github.com/users/masaki-y-devops/repos?sort=updated");
      // json形式のレスポンスをdata変数に代入
      const data = await response.json();
      setRepos(data.slice(0, 4)); // 直近更新の4つだけ取得
    };
    fetchRepos();
  }, []);

  //ねこ画像取得用汎用関数
  const refreshImg = async () => {
      setCatImageUrl(null);
      const res = await fetch("https://api.thecatapi.com/v1/images/search");
      const images = await res.json();
      console.log("fetchCatImg: ねこの画像情報を更新完了！", images);

      setCatImageUrl(images[0].url);
  };

  //問い合わせボタン用処理
  const QueryBtnClick = () => {
    alert("送信機能は未実装です！ごめんなさい！\r\nお詫びに他の素晴らしいねこちゃんをお届けします。")
    refreshImg();
  }

  // ねこ画像取得
  useEffect(() => {
      refreshImg();
  }, []);
  
  // 1. スキルデータの配列
  const skills = [
    { name: "Shell", level: "中級？" },
    { name: "Nix", level: "初級" },
    { name: "C#", level: "初級" },
    { name: "TypeScript", level: "初級" },
    { name: "Python", level: "初級" },
    { name: "Haskell", level: "初級" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 p-8 text-slate-900">
      <div className="max-w-3xl mx-auto w-full">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">ポートフォリオ（もどき）サイト</h1>
          <p className="text-slate-500">React(TypeScript)で構築</p>
        </header>

        <section>
          <h2 className="text-center text-xl font-bold mb-6 border-b-2 border-indigo-200 pb-2">勉強中の分野（言語）</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* mapを使ってループ処理 */}
            {skills.map((skill) => (
              <div key={skill.name} onClick={() => alert(`${skill.name}を学習中。現在、${skill.level}です。`)} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow">
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
          <h2 className="text-center text-xl font-bold mb-6 border-b-2 border-indigo-200 pb-2">公開中のGitHubリポジトリ</h2>
          <div className="grid grid-cols-1 gap-4">
            {repos.map((repo: GitHubRepo) => (
              <a 
                key={repo.id} 
                href={repo.html_url} 
                target="_blank" 
                className="block bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:border-indigo-400 transition-colors"
              >
                <h3 className="font-bold text-indigo-600">{repo.name}</h3>
                <p className="text-sm text-slate-500">{repo.description || "No description"}</p>
                <div className="mt-2 text-xs text-slate-400">Language: {repo.language}</div>
              </a>
            ))}
          </div>
        </section>
      </div>
	  
	  {/* --- お問い合わせセクション --- */}
        <section className="mt-12 max-w-3xl mx-auto bg-indigo-50 p-8 rounded-2xl border border-indigo-100">
          <h2 className="text-xl font-bold mb-4 text-indigo-900">
            お問い合わせフォーム（よくあるやつ）
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-indigo-700">お名前</label>
              <input 
                type="text" 
                placeholder="お名前の入力欄"
                className="w-full mt-1 p-2 rounded-md border border-indigo-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={(e) => console.log("入力中:", e.target.value)} 
              />
            </div>
            <button 
              onClick={QueryBtnClick}
              title="ただの送信ボタンじゃありません!"
              className="w-full bg-indigo-600 text-white py-2 rounded-md font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
            >
              メッセージを送る（モック）
            </button>
          </div>
        </section>

    {/* 猫画像が見たい */}
        <section className="mt-16">
          <h2 className="text-center text-xl font-bold mb-6 border-b-2 border-indigo-200 pb-2">
            猫画像切らしてたので助かる
          </h2>

          {/* catImageUrlがある時「だけ」、imgタグを表示 */}
          {/* 三項演算子（条件付きレンダリング）*/}
          {catImageUrl ? (
            <div className="mt-6 flex justify-center">
              <img
                src={catImageUrl}
                alt="かわいいねこの画像"
                className="max-h-64 rounded-xl shadow-md object-cover"
              />
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
    </main>
  );
}