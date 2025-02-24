
# next-market-ddb
* (Serverless version: 00zt4qm0hl)

* Next.js v15 
    - Amplify Hosting でデプロイする
        - Amplify Hosting でデプロイ時に IAM ロールで S3 バケットへのアクセス権限(putObjectの許可)を付与する
        - このとき、サービスロールではなく **コンピューティングロール** にロールを設定する
    - .env.development に 保存先の S3 バケット名、パス、AWS リージョン、画像公開用の CloudFront ディストリビューションの URL を指定
    -  next.config.mjs にも画像公開用の CloudFront ディストリビューションのURLを指定
* Backend
    - Amazon API Gateway + AWS Lambda + Amazon DynamoDB 
    - next-market-ddb-sam リポジトリ
 
### 参考
* Pythonでの　JWT 作成
    - https://qiita.com/kuri_Django/items/fd4622fd725f02273752

* このアプリは、下記の「Next.js/React開発入門」のアプリに AWS のサーバーレスサービスを組み込んだもの
    - https://monotein.com/books/nextjs-react-book/link-page

* Install Node.js latest
    - https://nodejs.org/en/download/package-manager

* Git へ push 時に下記が出た場合は、`git config http.postBuffer 524288000` を実行

```
error: RPC failed; HTTP 400 curl 22 The requested URL returned error: 400
send-pack: unexpected disconnect while reading sideband packet
```

* JWT
```
npm install jose
```

* このアプリでは Amazon DynamoDB を使用しているので不要だが、もし MongoDB を使う場合
```
npm install mongoose
```

* その他
```
npm install highlight.js
npm uninstall highlight.js
```
---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

```bash
npx create-next-app next-market-ddb

cd next-market-ddb

npm install @aws-sdk/client-s3
```

```bash
PORT=8080 npm run dev
# of
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
