[![CircleCI](https://circleci.com/gh/YIPG/ubivis.svg?style=svg)](https://circleci.com/gh/YIPG/ubivis)

# [Ubivis](https://ubivis.tokyo/)
<img src="https://user-images.githubusercontent.com/19145527/53814332-c5f60f80-3fa2-11e9-95d0-e77ff644a84f.png" width="100%" >


Ubivisは地図マッチングを搭載したマッチングアプリです。

## Architecture
<p align="center">
<img src="https://user-images.githubusercontent.com/19145527/53816092-49653000-3fa6-11e9-8bce-008b43d5df5d.png" height=300 justifycontent="center">
</p>

- フロントエンドはReactで構成されています.
- バックエンドにはFirebaseを用いています.
- 開発環境と本番環境では別々にプロジェクトを用意してあり、CircleCIでデプロイ先を分けています。(マスターブランチからのコミットは[本番環境](https://ubivis.tokyo/)に. ほかは[開発環境](https://ubivis-development.firebaseapp.com/)にデプロイ)


## Important
Cloud Firestoreにおいてセキュリティルールを厳密に設定していないため、`/worker_map`にはアクセスしないでください。
