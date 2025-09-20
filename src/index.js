// 将来的に新規登録画面から登録するときやログイン画面で、
// 入力値で、SQLインジェクションができないような設計をしなければならない。

const express = require("express");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const db = require(path.join(__dirname, "public", "js", "db"));

const app = express();
const port = 3000;

// ミドルウェア
// フォームデータのパース
app.use(express.urlencoded({ extended: true }));
// 静的ファイルの提供
app.use(express.static(path.join(__dirname, "public")));
// セッション管理
app.use(session({
  secret: "secretKey123",
  resave: false,
  saveUninitialized: false
}));

// ホーム画面（ログイン状態確認）
app.get("/", (req, res) => {
  // ログインしていない場合はログインページへ、ログインしている場合はホームページを表示
  if (!req.session.user) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  } else {
    res.sendFile(path.join(__dirname, "public", "home.html"));
  }
});

// =============== 404エラーハンドリング ================
// 静的ファイルの後に追加
app.use(express.static(path.join(__dirname, "public")));

// ルート以外がヒットしなかった場合
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// ================ 認証関連ルーティング ================
// 新規登録（GETリクエスト対応）
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

// 新規登録
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);

  db.run("INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashed],
    (err) => {
      if (err) {
        res.send("ユーザー登録失敗: " + err.message);
      } else {
        res.redirect("/");
      }
    });
});

// ログイン画面表示（GETリクエスト対応）
app.get("/Login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// ログイン（POSTリクエスト対応）
app.post("/Login", (req, res) => {
  const { username, password } = req.body;

  // ユーザー取得
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err || !user) {
      return res.send("ユーザーが存在しません");
    }
    // パスワード照合
    if (bcrypt.compareSync(password, user.password)) {
      req.session.user = username;
      res.redirect("/home");
    } else {
      res.send("パスワードが違います");
    }
  });
});

// ================ ホーム画面・ログアウト関連ルーティング ================
// ホーム画面
app.get("/home", (req, res) => {
  if (!req.session.user) {
    // ログインしていない場合はログインページへリダイレクト
    res.redirect("/Login");
  } else {
    // ログインしている場合はホームページを表示
    res.sendFile(path.join(__dirname, "public", "home.html"));
  }
});

// ログアウト
app.get("/Logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

// ================ APIエンドポイント ================
// 現在ログイン中のユーザー情報を返す
app.get("/user", (req, res) => {
  // ログインしていない場合は401エラーを返す
  if (!req.session.user) 
    {res.status(401).json({ error: "Not logged in" });
  } else {
    res.json({ username: req.session.user });
  }
});

// サーバー起動
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));