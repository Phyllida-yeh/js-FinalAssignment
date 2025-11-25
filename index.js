
const apiUrl = "https://livejs-api.hexschool.io/api/livejs/v1/customer";
const apiPath = "phy17";

// 產品區塊
// [ v ] 1瀏覽產品列表
// [ v ] 2篩選產品
// [ v ] 3加入購物車：將事件綁定在整個產品列表上，提升效能

/* 1-1取得產品列表 */
let productList = [];
let cartList = [];

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
        let filterProduct = [];
        productList.forEach(function (product) {
            // console.log(product.title);
            if (productSelect.value == product.category) {
                filterProduct.push(product)
            }
        })
        // console.log(filterProduct);
        renderProducts(filterProduct)
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
//   [ v ] 5刪除單一商品
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
            // console.log("取得購物車列表發生錯誤", error.response.data)
            console.log("取得購物車列表發生錯誤", error)
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
                  <a href="#" class="material-icons" data-id="${inputCart.id}">
                      clear
                  </a>
              </td>
          </tr>
        `
    })
    shoppingCartTableBody.innerHTML = cartListHtml;
    shoppingCartFinalTotal.textContent = `NT$${finalTotal}`;
    /* 7-1 */
    if (!cartList.length) {
        orderInfoBtn.disabled = true;  // 禁用
        
        console.log("購物車裡沒有東西無法送出");
    } else {
        orderInfoBtn.disabled = false; // 啟用
    }

}

/* 5-1監聽叉叉按鈕取得ID */
shoppingCartTableBody.addEventListener("click", function (event) {
    // console.log(event.target);
    const cartId = event.target.dataset.id;
    if (cartId) {
        deleteCartItem(cartId);
        // console.log("執行刪除品項");
        // console.log(cartId);
    };
    event.preventDefault();

})

/* 5-2組合ID執行API */
function deleteCartItem(inputCartID) {
    axios
        .delete(`${apiUrl}/${apiPath}/carts/${inputCartID}`, {
        })
        .then(function (response) {
            console.log("刪除購物車內特定產品成功", response.data)
            getCartList();
        })
        .catch(function (error) {
            console.log("刪除購物車內特定產品失敗", error.response.data)
        })
}

/* 6-1監聽刪除全部的按鈕 */
/* 6-2執行刪除全部ＡＰＩ */
const discardAllBtn = document.querySelector(".discardAllBtn");
discardAllBtn.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("discardAllBtn");
    axios
        .delete(`${apiUrl}/${apiPath}/carts`)
        .then(function (response) {
            console.log("清除購物車內全部品成功", response.data)
            getCartList();
        })
        .catch(function (error) {
            console.log("清除購物車內全部品發生錯誤", error.response.data)
        })

})

// 訂單區塊
//  驗證內容：先在前端進行驗證，通過後再送出訂單，減少資源耗費
//   [ v ] 7檢查購物車有無商品
//   [ v ] 8檢查表單欄位是否有填寫
//   [ v ] 9送出訂單
//   [ v ] 10送出後清空表單


/* 0-1監聽刪除全部的按鈕 */
/* 0-1組合要發送的資料 */
const orderInfoBtn = document.querySelector(".orderInfo-btn");

const customerName = document.querySelector("#customerName");
const customerPhone = document.querySelector("#customerPhone");
const customerEmail = document.querySelector("#customerEmail");
const customerAddress = document.querySelector("#customerAddress");
const tradeWay = document.querySelector("#tradeWay");

/* 7-1沒有商品就不能送出 */
/* 在4-2渲染購物車列表處理 */

orderInfoBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const name = customerName.value.trim();
    const phone = customerPhone.value.trim();
    const email = customerEmail.value.trim();
    const address = customerAddress.value.trim();
    const payment = tradeWay.value;

    customerName.nextElementSibling.style.display = "none";
    customerPhone.nextElementSibling.style.display = "none";
    customerEmail.nextElementSibling.style.display = "none";
    customerAddress.nextElementSibling.style.display = "none";

    /* 8-1檢查表單欄位 */
    let isEmpty = false;
    if (!name) {
        console.log("請輸入姓名");
        customerName.nextElementSibling.style.display = "block";
        isEmpty = true;
    }
    if (!phone) {
        console.log("請輸入電話");
        customerPhone.nextElementSibling.style.display = "block";
        isEmpty = true;
    }
    if (!email) {
        console.log("請輸入郵件");
        customerEmail.nextElementSibling.style.display = "block";
        isEmpty = true;
    }
    if (!address) {
        console.log("請輸入地址");
        customerAddress.nextElementSibling.style.display = "block";
        isEmpty = true;
    }
    if (isEmpty === false) {
        const orderFormData = {
            "data": {
                "user": {
                    "name": name,
                    "tel": phone,
                    "email": email,
                    "address": address,
                    "payment": payment
                }
            }
        }
        console.log("成功送出表單資料");
        createOrder(orderFormData);
    }
})


const orderInfoForm = document.querySelector(".orderInfo-form");
/* 9-1送出表單 */
function createOrder(orderFormData) {
    axios
        .post(`${apiUrl}/${apiPath}/orders`, orderFormData
        )
        .then(function (response) {
            console.log("送出訂單成功", response.data);
            console.log(orderFormData);
            /* 10-1送出後清空表單 */
            orderInfoForm.reset();
            getCartList();

        })
        .catch(function (error) {
            console.log("送出訂單失敗", error.response.data)
        })
}

