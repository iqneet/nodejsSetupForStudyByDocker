// ログインフォーム送信処理
document.addEventListener("DOMContentLoaded", () => {
  // loginFormが存在する場合のみ処理を実行
  const form = document.getElementById("loginForm");
  // フォームが存在する場合のみイベントリスナーを追加
  if (form) {
    // フォーム送信イベントを監視
    form.addEventListener("submit", async (e) => {
      // フォームのデフォルト送信を防止
      e.preventDefault();
      // フォームデータを収集
      const formData = new FormData(form);
      // フォームデータをオブジェクトに変換
      const data = Object.fromEntries(formData.entries());

      // サーバーにPOSTリクエストを送信
      const res = await fetch("/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // サーバーからのレスポンスを処理
      const result = await res.json();
      // メッセージ表示
      document.getElementById("message").innerText = result.message;

      // ログイン成功時にホーム画面へリダイレクト
      if (res.ok) {
        // ログイン成功時にリダイレクト
        window.location.href = "/home";
      }
    });
  }
});
