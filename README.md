# 戒癮網站（Addiction Rehab Dog）

## 專案介紹

這是一個戒癮網站。使用者進到網站後可以跟自己立下約定，並逐日紀錄當天是否達成約定，藉由持續的紀錄與回顧，慢慢把成癮戒掉。

> 目前僅完成專案初始化骨架，後續功能（用戶認證、約定管理、打卡系統、統計展示）將於各自的 PRD 中陸續開發。

## 技術棧

- **Next.js 16**（App Router）
- **React 19**
- **TypeScript**（strict 模式，路徑別名 `@/` → `src/`）
- **Tailwind CSS v4**
- **ESLint 9**（flat config）+ **Prettier**
- **Jest** + **Testing Library**（單元測試）

## 安裝環境

- **Node.js**：需 `>= 20`（建議 24）
- 安裝依賴：

```bash
npm install
```

## 開發流程

| 指令 | 說明 |
|------|------|
| `npm run dev` | 啟動開發伺服器，瀏覽 http://localhost:3000 |
| `npm run build` | 編譯正式版 |
| `npm run start` | 啟動正式版伺服器（需先 build） |
| `npm test` | 執行單元測試 |
| `npm run test:watch` | 監看模式執行測試 |
| `npm run lint` | 執行 ESLint 檢查 |
| `npm run format` | 以 Prettier 格式化 `src` 程式碼 |
| `npm run typecheck` | TypeScript 型別檢查（`tsc --noEmit`） |

## 專案結構

```
addiction-rehab-dog/
├── eslint.config.mjs      # ESLint flat config（含 Prettier 整合）
├── jest.config.ts         # Jest 設定（next/jest）
├── jest.setup.ts          # 測試前置（jest-dom matchers）
├── next.config.ts
├── postcss.config.mjs     # Tailwind v4 PostCSS
├── tsconfig.json          # strict + @/ 路徑別名
├── .prettierrc
├── public/                # 靜態資源
├── src/
│   └── app/               # Next.js App Router
│       ├── layout.tsx
│       ├── page.tsx
│       ├── globals.css
│       └── __tests__/     # 單元測試
└── docs/
    └── prd/               # 產品需求文件
```

## 開發規範

本專案採 **TDD（測試驅動開發）**：先寫失敗的測試（紅燈）→ 寫最小程式碼通過（綠燈）→ 重構。測試檔案以 `__tests__/<name>.test.ts(x)` 與原始碼共置。
