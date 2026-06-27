## これは何？

React(TypeScript)の学習目的で作成したポートフォリオ風サイトです。

## なんで作ったの？

フロントエンドより、インフラ寄りの知識が比較的多く、

また、個人のOSなどの環境構築が一段落ついたので、

現代的(？)なWebサイト、サービスの作成の基礎である:

- TypeScript(JavaScript)の学習

- React特有の学習(useState,useEffect,useRefなど)

- Vercelによる自動的なCI/CDの実行やデプロイ

を試したくて作成してみました。

AI支援を利用して学習・開発を高速化しています。

## 閲覧方法は？

Vercelで公開しております。

[masaki-y-devopsの遊び場][1]

[1]:https://portfolio-sites-react.vercel.app/

## 作成にあたって考えたこと

- async/await(非同期処理)を用いたAPIアクセス、情報取得処理
- useStateによるAPI情報取得状態、ユーザーのフォームへの入力状態の保持
- useEffectによる状況変化に基づくアクションのトリガー
- [localStorageプロパティ](https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage)による状態保存で、再読み込みをまたがった状態記憶
- iframeに自身の公開プレイリストを埋め込み、Spotifyとの連携を意識（アカウント側のプレイリスト名変更、曲追加削除をリニアにサイトに反映する）

## 猫かわいいね

作っているときに何回もリロードしたり、自動スクロール機能(小ネタ)を作るきっかけにもなりました。
