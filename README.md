# NTHU-FLY · iGEM 2026 Website

> 結合果蠅神經運算模型與活體細胞感測陣列之仿生嗅覺邊緣運算系統。
> Bio-Digital Olfactory System.

National Tsing Hua University · iGEM 2026

---

## 給之後接手的隊員（請先讀這份）

這個網站是純靜態 HTML / CSS / JS，沒有任何打包工具、不需要 npm / node。
打開 `index.html` 雙擊就能在瀏覽器看到完整成品；
推到 GitHub 後 GitHub Pages 會自動部署。

---

## 檔案結構

```
Website/
├── index.html              ← 網頁主結構（HTML 內容）
├── assets/
│   ├── styles.css          ← 所有樣式（顏色、字型、版面、動畫）
│   └── script.js           ← 互動行為（捲動、滑鼠軌跡、揭露動畫）
├── archive/
│   └── v1-warm.html        ← 舊版暖色生技風（已封存，供參考）
├── WEBSITE_GUIDELINES.md   ← 設計規範（顏色、字型、動畫禁忌等）
└── README.md               ← 本文件
```

---

## 我想改 ___，要去哪裡改？

| 想改的東西 | 改哪個檔案 | 找哪裡 |
|---|---|---|
| 文字內容（標題、段落、按鈕字） | `index.html` | 對應的 `<section>` 區塊 |
| 顏色（黑、白、綠、灰） | `assets/styles.css` | 第 01 節 `:root` 變數 |
| 字型 | `assets/styles.css` | 第 01 節 `--font-display` 等變數 |
| 字級大小 | `assets/styles.css` | 第 03 節 `Typography` |
| 區塊間距、欄寬 | `assets/styles.css` | 第 04 節 `Layout primitives` |
| 動畫的速度、進入時機 | `assets/styles.css` 第 09 節<br>`assets/script.js` 第 4 節 | 揭露動畫 |
| 滑鼠跟隨點的大小、速度 | `assets/script.js` | 第 5 節 `MOUSE CURSOR` |
| 新增章節 | `index.html` + `assets/styles.css` | 複製現有 `<section>` 結構 |
| 替換 logo 為正式版 | `index.html` | 搜尋「線稿果蠅標誌」註解 |
| 修改聯絡信箱 | `index.html` | 搜尋 `mailto:` |

---

## 設計規範速查（完整版見 `WEBSITE_GUIDELINES.md`）

### 顏色（v0.3 純黑白單色方向）
- **主色**：`#FFFFFF` 白、`#000000` 黑
- **灰階**：`--ink-50` (#525252) 次級文字、`--ink-20` (#D9D9D9) 細線
- **唯一彩色**：`--accent-live` (#14CC61) — 全站只用在首屏狀態指示燈

### 字型
- **Fraunces**（Google Fonts）— 大型編輯級襯線，用於 H1 與大型 H2
- **Inter**（Google Fonts）— 內文與 UI 主力
- **JetBrains Mono**（Google Fonts）— 編號、按鈕、技術標籤
- **Noto Sans TC**（Google Fonts）— 中文 fallback

### 動畫禁忌
- ❌ 任何彩色（除了狀態指示燈那一抹綠）
- ❌ 陰影（用邊框與留白製造分層）
- ❌ 元素旋轉、彈跳、過衝
- ❌ 閃爍背景漸層
- ❌ 動畫超過 700ms（捲動驅動的除外）

---

## 本機預覽

雙擊 `index.html` 就會在預設瀏覽器打開，但有些瀏覽器對於 `file://` 的 CORS
限制會阻擋字型載入。**建議用本地 server**：

### 方法一：VS Code Live Server 擴充套件（最簡單）
1. VS Code 安裝「Live Server」擴充套件
2. 在 `index.html` 上右鍵 → Open with Live Server
3. 自動在瀏覽器打開 `http://127.0.0.1:5500`

### 方法二：Python 內建 server
```bash
cd Website
python3 -m http.server 8000
# 開瀏覽器到 http://localhost:8000
```

### 方法三：Node.js
```bash
npx serve .
```

---

## 部署到 GitHub Pages

完整步驟見下方「Deploy」章節。簡言之：
1. 把這個資料夾推上 GitHub
2. Settings → Pages → Source 選 `main` 分支
3. 等 1 分鐘後網站就會在 `https://你的帳號.github.io/repo名稱/` 上線
4. 之後改完 code `git push` 就會自動更新，**不需要手動再做任何事**

---

## 給未來自己的提醒

- 改顏色之前，先看一次 `WEBSITE_GUIDELINES.md` v0.3 ——
  我們是 **純黑白編輯級** 不是「黑白為主、可以加點藍色」。
  如果想加色，先想能不能用字級、位置、留白解決。
- Fraunces 的 `WONK` 軸目前設為 0（關掉），維持 `f / g / y` 常規樣貌。
  想恢復原始「奇趣」字形，把 `font-variation-settings` 內 `"WONK" 0` 拿掉。
- 滑鼠跟隨點的 `mix-blend-mode: difference` 是讓黑點在黑底自動變白的關鍵 ——
  別把它換成固定顏色，會在反相區段瞎掉。
- 所有揭露動畫都靠 IntersectionObserver 觸發 **一次**。重複進出視窗不會
  重播，這是刻意設計。

---

## Version

- v0.3 · editorial monochrome（current）
- v0.2 · warm biotech（archive/v1-warm.html）

---

## License

iGEM 2026 NTHU-FLY 團隊內部使用。
