# bunny-jay

## 快速開始

1. 安裝 vscode、 node.js、mongoDB 和 yarn
2. 使用 vscode 開啟本專案
3. 開啟終端機並輸入以下指令安裝所需模組

   ```shell
   yarn install
   ```

4. 完成後輸入以下指令產生資料庫日誌和資料的存放路徑

   ```shell
   yarn mkdbdir
   ```

5. 再來輸入以下指令開啟資料庫伺服器

   ```shell
   yarn db
   ```

6. 開一個新的終端機，輸入以下指令開啟後端伺服器

   ```shell
   node server
   ```

7. 再開一個新的終端機，輸入以下指令開啟開發用的前端熱載伺服器

   ```shell
   yarn serve
   ```

8. 連線至 <http://localhost:8080/> 即可

> 首次啟動須從步驟 1 至 7 完整執行一次，第二次開始由第 5 步開始即可。

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

前端資料夾

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

虛擬路由 (vue-router)

#### store

全域資料 (vuex)

#### views

視圖 e.g. home, about

### dist

編譯後的生產網站

### server

後端資料夾

#### index.js

後端進入點

#### config.js

後端設定檔

#### unitity.js

後端全域變數

#### database

資料庫

#### router

路由
