
const apiUrl = "https://livejs-api.hexschool.io/api/livejs/v1/customer";
const apiPath = "phy17";

// 產品區塊
// [ v ] 瀏覽產品列表
// [ v ] 篩選產品
// [  ] 加入購物車：將事件綁定在整個產品列表上，提升效能


/* 取得產品列表 */
function getProductList() {
    axios
        .get(`${apiUrl}/${apiPath}/products`
        )
        .then(function (response) {
            // console.log("取得產品列表", response.data.products)
            productList = response.data.products;
            renderProducts(productList);
            console.log("變數productList", productList);
        })
        .catch(function (error) {
            console.log("取得產品列表發生錯誤", error.message);
        })
}
getProductList();

/* 渲染取得的產品列表 */
const productWrap = document.querySelector(".productWrap");
function renderProducts(inputProductList) {
    let productListHtml = "";
    inputProductList.forEach(function (inputProduct) {
        productListHtml += `
        <li class="productCard">
            <h4 class="productType">新品</h4>
            <img src="${inputProduct.images}"alt="">
            <a href="#" class="addCardBtn">加入購物車</a>
            <h3>Antony 雙人床架／雙人加大${inputProduct.title}</h3>
            <del class="originPrice">NT${inputProduct.price}</del>
            <p class="nowPrice">NT$${inputProduct.origin_price}</p>
        </li>`
    })
    productWrap.innerHTML = productListHtml;
}

/* 取得篩選類別 */
/* 篩選類別==產品類別 */
/* 渲染篩選的產品 */
const productSelect = document.querySelector(".productSelect");

productSelect.addEventListener("change", function () {

    if (productSelect.value == "全部") {
        // console.log('render all product');
        renderProducts(productList)

    } else {
        let fliterProduct = [];
        productList.forEach(function (product) {
            // console.log(product.title);
            if (productSelect.value == product.category) {
                fliterProduct.push(product)
            }
        })
        // console.log(fliterProduct);
        renderProducts(fliterProduct)
    }
})






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
