// 產品區塊
// [  ] 瀏覽產品列表
// [  ] 篩選產品
// [  ] 加入購物車：將事件綁定在整個產品列表上，提升效能


// 購物車區塊
//  確認購物車列表
//   [  ] 瀏覽購物車內容
//  編輯 / 刪除購物車
//   [  ] 刪除單一商品
//   [  ] 刪除所有品項

// 訂單區塊
//  驗證內容：先在前端進行驗證，通過後再送出訂單，減少資源耗費
//   [  ] 檢查購物車有無商品
//   [  ] 檢查表單欄位是否有填寫
//   [  ] 送出訂單
//   [  ] 送出後清空表單


// ____________________________________________API____________________________________
const apiUrl = "https://livejs-api.hexschool.io/api/livejs/v1/customer";
const apiPath = "phy17";

////////////產品相關（客戶）
/* 取得產品列表 */
function getProductList() {
    axios
        .get(`${apiUrl}/${apiPath}/products`
        )
        .then(function (response) {
            console.log("取得產品列表", response.data)
        })
        .catch(function (error) {
            console.log("取得產品列表", error.response.data)
        })
}
// getProductList();

////////////購物車相關(客戶)
/* 取得購物車列表 */
function getCartList() {
    axios
        .get(`${apiUrl}/${apiPath}/carts`
        )
        .then(function (response) {
            console.log("取得購物車列表", response.data)
        })
        .catch(function (error) {
            console.log("取得購物車列表", error.response.data)
        })
}
// getCartList();

/* 加入購物車 */
function addCartItem() {
    axios
        .post(`${apiUrl}/${apiPath}/carts`, {
            "data": {
                "productId": "kH58gGWOsSaRaJafiygH",
                "quantity": 10
            }
        })
        .then(function (response) {
            console.log("加入購物車", response.data)
        })
        .catch(function (error) {
            console.log("加入購物車", error.response.data)
        })
}
// addCartItem();

/* 清除購物車內全部品 */
function deleteAllCartList() {
    axios
        .delete(`${apiUrl}/${apiPath}/carts`)
        .then(function (response) {
            console.log("清除購物車內全部品", response.data)
        })
        .catch(function (error) {
            console.log("清除購物車內全部品", error.response.data)
        })
}
// deleteAllCartList();

/* 刪除購物車內特定產品 */
function deleteCartItem() {
    axios
        .delete(`${apiUrl}/${apiPath}/carts`, {
            "data": {
                "productId": "kH58gGWOsSaRaJafiygH",
                "quantity": 10
            }
        })
        .then(function (response) {
            console.log("刪除購物車內特定產品", response.data)
        })
        .catch(function (error) {
            console.log("刪除購物車內特定產品失敗", error.response.data)
        })
}

/* 編輯購物車產品數量 */
/* 跳過 */


////////////訂單相關（客戶）
/* 送出購買訂單 */

function creatOrder(orderFromData) {
    axios
        .post(`${apiUrl}/${apiPath}/orders`,orderFromData
        )
        .then(function (response) {
            console.log("送出訂單成功", response.data);
            console.log(orderFromData);

        })
        .catch(function (error) {
            console.log("送出訂單失敗", error.response.data)
        })
}


////////////訂單相關（管理者）
/* 取得訂單列表 */
/* 修改訂單狀態 */
/* 刪除全部訂單 */
/* 刪除特定訂單 */

