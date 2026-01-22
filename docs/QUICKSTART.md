# クイックスタートガイド

## プロジェクト環境概要

### 必要環境

WSL2推奨 (Windowsの場合)

### frontend

Viteをバンドラーに採用したTypeScript + ReactのWebアプリケーションです。
node: 24.5.0
pnpm: 10.27.0

### backend

dotnet: 10.0.101
ASP.NET Core Web API プロジェクト

## 開発環境構築セットアップ

## 環境準備

## frontendのセットアップ

- Node.jsのインストール  
  Node.jsのバージョン24.5.0とnpmをインストールしてください。
- pnpmのインストール  
  npmを使用して、pnpmのバージョン10.27.0をインストールしてください。

```bash
npm install -g pnpm@10.27.0
```

- corepackのインストールと有効化

  corepackを使用して、pnpmを管理します。

```bash
npm install -g corepack
```

corepackを有効にして、pnpmを使用できるようにします。

```bash
corepack enable
```

- 依存パッケージのインストール

```bash
cd frontend
pnpm install
```

## backendのセットアップ

- .NET SDKのインストール  
  .NET SDKのバージョン10.0.101をインストールしてください。  
  [公式ダウンロードページ](https://dotnet.microsoft.com/en-us/download/dotnet/10.0)からインストーラーを取得できます。

- 依存パッケージのインストール

```bash
cd backend
dotnet restore
```

## 実際のアプリケーションの起動方法

- frontendの起動

```bash
cd frontend
pnpm run dev
```

起動後、ブラウザで http://localhost:5173 にアクセスできます。

- backendの起動

```bash
cd backend
dotnet run
```

起動後、バックエンドAPIは http://localhost:5120 で待ち受けます。

## アプリケーションの利用

両方のサーバーを起動後、ブラウザで http://localhost:5173 にアクセスすると、Todo管理アプリケーションを利用できます。

- Todoの追加: テキストボックスにタイトルを入力して「Add」ボタンをクリック
- Todoの完了/未完了切り替え: チェックボックスをクリック
- Todoの削除: 「Delete」ボタンをクリック

注意: 現在、データはインメモリに保存されているため、バックエンドを再起動するとデータは消失します。
