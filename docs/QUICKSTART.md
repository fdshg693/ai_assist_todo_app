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
pnppm run dev
```

- backendの起動
```bash
cd backend
dotnet run
```
