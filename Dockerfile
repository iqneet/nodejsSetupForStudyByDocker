# Node.js公式の軽量イメージを利用
FROM node:18-bullseye

# 作業ディレクトリを作成
WORKDIR /app

# package.json をコピー（依存関係管理）
COPY package*.json ./

# 依存関係をインストール
RUN npm install --include=dev

# アプリコードをコピー
COPY . .

# ポートを開放（例: Expressで使う3000番）
EXPOSE 3000

# デフォルトコマンド
# CMD ["node", "src/index.js"]

# nodemon で自動リロード
# CMD ["npx", "nodemon", "src/index.js"]

CMD ["npm", "run", "dev"]