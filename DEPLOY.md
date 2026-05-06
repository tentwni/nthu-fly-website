# 部署指南 / Deployment Guide

> 把這個資料夾推上 GitHub，並用 GitHub Pages 自動部署成公開網站。
> 完成後：你每次 `git push`，網站就會在 1 分鐘內自動更新，不需要手動做任何事。

---

## 你需要的東西

- [ ] 一個 GitHub 帳號（免費版即可）
- [ ] 電腦上裝好 Git
  - macOS：終端機輸入 `git --version`，沒裝會自動跳安裝視窗
  - Windows：到 [git-scm.com](https://git-scm.com) 下載 Git for Windows
  - Linux：通常已經裝好；沒有的話 `sudo apt install git`
- [ ] 知道這個 `Website/` 資料夾在你電腦上的完整路徑

---

## 一次性設定（之後不用再做）

打開終端機（Terminal / PowerShell），執行以下兩行，把 `你的名字` 跟
`你的email` 換成你自己的（建議用 GitHub 註冊用的那組 email）：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的email@example.com"
```

---

## STEP 1 · 在 GitHub 建立新 repo

1. 登入 [github.com](https://github.com)
2. 右上角 **「+」 → New repository**
3. **Repository name**：取個英文名字，例如 `nthu-fly-2026`、`igem-website`
4. **Description**：可選，例如 `NTHU-FLY · iGEM 2026 Website`
5. **Public / Private**：選 **Public**
   （GitHub Pages 免費版只有 Public 才能部署；除非你升級 Pro）
6. **不要勾** 「Add a README file」、「Add .gitignore」、「Choose a license」
   （我們已經有了，避免衝突）
7. 點 **Create repository**

建好後 GitHub 會出現一頁有 `git remote add origin ...` 指令的畫面 —
**先不要關**，待會兒會用到。

---

## STEP 2 · 把 Website 資料夾推上去

打開終端機，`cd` 到 Website 資料夾。

> 偷吃步：在檔案總管／Finder 找到 `Website` 資料夾，
> macOS 拖到 Terminal 圖示上會自動 cd；
> Windows 在資料夾內按 `Shift + 右鍵 → 在這裡開啟 PowerShell`。

確認自己在對的位置（應該看到 `index.html`、`assets`、`README.md`）：

```bash
ls          # macOS / Linux
dir         # Windows
```

接著依序執行：

```bash
# 1. 初始化 git，預設分支命名為 main
git init -b main

# 2. 把所有要上傳的檔案加進來
git add .

# 3. 第一次 commit
git commit -m "Initial commit: NTHU-FLY editorial monochrome site"

# 4. 連到剛剛建好的 GitHub repo
#    把下面那行的 USERNAME 跟 REPO 換成你自己的
git remote add origin https://github.com/USERNAME/REPO.git

# 5. 推上去
git push -u origin main
```

第一次 push 時 GitHub 會要求驗證身份。**最簡單的做法：用 GitHub Desktop**
（[desktop.github.com](https://desktop.github.com)）登入一次，之後 git push
就會自動帶身份。或者用 [Personal Access Token](https://github.com/settings/tokens)
當密碼。

---

## STEP 3 · 啟用 GitHub Pages

1. 回到 GitHub 上你的 repo 頁面，重整一下 — 應該能看到剛剛推上去的檔案
2. 點上方分頁列的 **Settings**
3. 左側選單滾到 **Pages**（在 Code and automation 那一區）
4. **Source** 下拉選 **Deploy from a branch**
5. **Branch** 選 `main`，資料夾選 `/ (root)`
6. 按 **Save**

等大約 30 秒～1 分鐘，重整頁面，最上方會出現綠色框：

```
✓ Your site is live at https://USERNAME.github.io/REPO/
```

點那個連結 — 你的網站已經在線上了。

---

## STEP 4 · 之後每次更新

這就是你想要的「不用手動部署」的部分。流程：

1. 在電腦上改檔案（直接用 VS Code、Sublime、任何編輯器都可以）
2. 改完後在終端機執行：

   ```bash
   cd 你的Website資料夾路徑

   git add .
   git commit -m "更新了什麼（用英文或中文都可以）"
   git push
   ```

3. 約 1 分鐘後，網站自動更新。**沒有別的步驟**。

---

## 常見問題 / Troubleshooting

### 「網站打開都是 404」
- 等 1-2 分鐘再試一次（第一次部署比較久）
- 確認 GitHub Pages 設定真的是 `main` + `/ (root)`，按了 Save
- 確認 repo 內最上層有 `index.html`（不是放在子資料夾裡）

### 「字型沒載入 / 樣式跑掉」
- 打開瀏覽器 F12 開發者工具的 Network 分頁，看是不是 `assets/styles.css`
  載入失敗
- 如果路徑寫成大寫 `Assets/Styles.CSS` 之類的，本機看得到但
  GitHub Pages 是區分大小寫的 — 改成小寫即可

### 「我想要自訂網域，例如 nthufly.org」
- 在 repo → Settings → Pages 最下方 **Custom domain** 欄位填入網域
- 在你的 DNS 設定 CNAME 指向 `USERNAME.github.io`
- 等待 DNS 生效（通常 10-60 分鐘），GitHub 會自動幫你發 SSL 憑證

### 「我 push 了但網站沒更新」
- repo → Actions 分頁，看 `pages build and deployment` 那個 workflow
  是不是失敗了。失敗會有紅色 ✗，點進去看錯誤訊息
- 通常是 HTML / CSS 寫錯導致 build 失敗

### 「同事改了檔案，我要怎麼拿到更新」
```bash
git pull
```
就會把同事推上去的版本拉下來。改完後一樣 `git add` → `commit` → `push`。

### 「我搞砸了想 reset」
別慌。把資料夾複製一份備份，然後問 ChatGPT 或來找 Bennett 救援，
**不要自己 `git reset --hard`** — 改錯指令會把工作弄不見。

---

## 重要習慣

- **每次改完都 commit + push**，不要累積一堆改動才一次推
  （等於沒備份；萬一電腦掛掉就全沒了）
- **commit message 寫清楚改了什麼**，例如：
  - 好：`Fix typo in hero subtitle`
  - 好：`Add Module 04 about edge AI deployment`
  - 不好：`update`、`asd`、`fix`
- **絕對不要 commit 機密**（密碼、API key、個人資料）
  — `.gitignore` 已經幫你擋掉常見的，但寫死在 HTML 裡的還是會推上去
