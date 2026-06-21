// APIから画像を取得する関数
export async function FetchImage() {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log("fetchImage: 画像情報を取得しました", images);
  return images[0]; // 画像情報の配列から最初の要素を返す
}