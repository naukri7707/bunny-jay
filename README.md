# bunny-jay

## 指令

- 啟動資料庫伺服器

  ```shell
  yarn db
  ```

- 啟動後台伺服器 (serve/index.js)

  ```shell
  node serve
  ```

- 啟動 webpack 熱載伺服器 (開發用)

  ```shell
  yarn serve
  ```

- 生成生產用網站

  ```shell
  yarn build
  ```

- 使用 es-lint 提示不合規定的語法

  ```shell
  yarn lint
  ```

## 目錄結構

### public

在這個資料夾下的檔案編譯時會被直接複製至 dist 的根目錄下。適用於不同頁面但相同的靜態資產(e.g. favicon)

### src

vue 主要開發環境

#### assets

靜態資產

##### img

圖片資源

##### js

全域 js (由 App.vue 引入 index.js 並使用 index.js 引入其餘的 js 檔案來統一管理)

##### scss

全域 scss (由 App.vue 引入 index.scss 並使用 index.scss 引入其餘的 scss 檔案來統一管理)

#### components

組件 e.g. navbar, sidebar

#### router

虛擬路由

#### store

全域資料

#### views

視圖 e.g. home, about

### dist

編譯後的生產網站

### server

後端資料夾

### db

資料庫

#### data

資料

#### log

紀錄
