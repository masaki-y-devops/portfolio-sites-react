// サーバー側で実行

// MainContent.tsxにデータを受け渡すためにインポート
import MainContent from "@/components/MainContent";

// GitHubリポジトリ情報の取得関数
async function getGitData() {
  const gitres = await fetch("https://api.github.com/users/masaki-y-devops/repos?per_page=8&sort=updated");
  if (!gitres.ok) throw new Error("failed")
  return gitres.json();
}

// ねこ画像の取得関数
async function getCatData() {
  const catres = await fetch("https://api.thecatapi.com/v1/images/search")
  if (!catres.ok) throw new Error("failed")
  return catres.json();
}

// メインで実行される関数
// Promise.allで上記API取得関数を並列実行
export default async function Page() {
  const [gitData, catData] = await Promise.all([
    getGitData(),
    getCatData()
  ]);

  // MainContent.tsxに処理結果を投げる
  return (
    <div>
      <MainContent
        InitGitItems={gitData}
        InitCatItems={catData}
      />
    </div>  
  )
}