
const apiUrl = "https://livejs-api.hexschool.io/api/livejs/v1/customer";
const apiPath = "phy17";

// 產品區塊
// [ v ] 1瀏覽產品列表
// [ v ] 2篩選產品
// [ v ] 3加入購物車：將事件綁定在整個產品列表上，提升效能


/* 1-1取得產品列表 */
function getProductList() {
    axios
        .get(`${apiUrl}/${apiPath}/products`
        )
        .then(function (response) {
            // console.log("取得產品列表", response.data.products)
            productList = response.data.products;
            renderProducts(productList);
            // console.log("變數productList", productList);
        })
        .catch(function (error) {
            console.log("取得產品列表發生錯誤", error.message);
            console.log("取得產品列表發生錯誤", error.response.data.message);
        })
}
getProductList();

/* 1-2.渲染取得的產品列表 */
const productWrap = document.querySelector(".productWrap");
function renderProducts(inputProductList) {
    let productListHtml = "";
    inputProductList.forEach(function (inputProduct) {
        productListHtml += `
        <li class="productCard">
            <h4 class="productType">新品</h4>
            <img src="${inputProduct.images}"alt="">
            <a href="#" class="addCardBtn" data-id=${inputProduct.id}>加入購物車</a>
            <h3>${inputProduct.title}</h3>
            <del class="originPrice">NT${inputProduct.price}</del>
            <p class="nowPrice">NT$${inputProduct.origin_price}</p>
        </li>`
    })
    productWrap.innerHTML = productListHtml;
}

/* 2-1取得篩選類別 */
/* 2-2篩選類別==產品類別 */
/* 2-3渲染篩選的產品 */
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

/* 3-1監聽產品列表 */
/* 3-2取得產品ID */
/* 3-3執行加入購物車 */
productWrap.addEventListener("click", function (event) {
    console.log(event.target.dataset.id);
    const id = event.target.dataset.id;
    if (id) {
        addCart(id);
    }
    event.preventDefault();
})
function addCart(productId) {
    const data = {
        "data": {
            "productId": productId,
            "quantity": 1
        }
    };
    axios
        .post(`${apiUrl}/${apiPath}/carts`, data)
        .then(function (response) {
            /* ？ */
            // newCartList=response.data.carts;
            // finalTotal=response.data.finalTotal;
            getCartList();
            console.log("加入購物車成功", response.data);

        })
        .catch(function (error) {
            console.log("加入購物車發生錯誤", error.message);
            console.log("加入購物車發生錯誤", error.response.data.message);
        })

}

// 購物車區塊
//  確認購物車列表
//   [ v ] 4瀏覽購物車內容
//  編輯 / 刪除購物車
//   [  ] 5刪除單一商品
//   [ v ] 6刪除所有品項


/* 4-1取得購物車列表 */
let finalTotal = 0;
function getCartList() {
    axios
        .get(`${apiUrl}/${apiPath}/carts`
        )
        .then(function (response) {
            // console.log("取得購物車列表", response.data)
            cartList = response.data.carts;
            // console.log("變數cartList", cartList);
            finalTotal = response.data.finalTotal
            renderShoppingCart(cartList)
        })
        .catch(function (error) {
            console.log("取得購物車列表發生錯誤", error.response.data)
        })
}
getCartList();

/* 4-2渲染購物車列表 */
const shoppingCartTableBody = document.querySelector(".shoppingCart-table tbody");
const shoppingCartFinalTotal = document.querySelector(".total");
function renderShoppingCart(inputCartList) {
    // console.log("inputCartList", inputCartList);
    let cartListHtml = "";
    inputCartList.forEach(function (inputCart) {
        cartListHtml += `
        <tbody>
          <tr>
              <td>
                  <div class="cardItem-title">
                      <img src="${inputCart.product.images}" alt="">
                      <p>${inputCart.product.title}</p>
                  </div>
              </td>
              <td>NT$${inputCart.product.origin_price}</td>
              <td>${inputCart.quantity}</td>
              <td>NT$${inputCart.product.price}</td>
              <td class="discardBtn">
                  <a href="#" class="material-icons">
                      clear
                  </a>
              </td>
          </tr>
        </tbody>`
    })
    shoppingCartTableBody.innerHTML = cartListHtml;
    shoppingCartFinalTotal.textContent = `NT$${finalTotal}`;
}


/* 6-1取得刪除全部的按鈕 */
/* 6-2執行刪除全部ＡＰＩ */
const discardAllBtn = document.querySelector(".discardAllBtn");
discardAllBtn.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("discardAllBtn");
    axios
        .delete(`${apiUrl}/${apiPath}/carts`)
        .then(function (response) {
            console.log("清除購物車內全部品成功", response.data)
        })
        .catch(function (error) {
            console.log("清除購物車內全部品發生錯誤", error.response.data)
        })
        getCartList();
})



// 訂單區塊
//  驗證內容：先在前端進行驗證，通過後再送出訂單，減少資源耗費
//   [  ] 檢查購物車有無商品
//   [  ] 檢查表單欄位是否有填寫
//   [  ] 送出訂單
//   [  ] 送出後清空表單
