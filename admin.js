const adminApiUrl = "https://livejs-api.hexschool.io/api/livejs/v1/admin"
const adminApiPath = "phy17";
const ordersApiUrl = `${adminApiUrl}/${adminApiPath}/orders`;

const uid = "jujN5WJ9NpRvmvZ2o0rUqzLCmb53";
const config = {
    headers: {
        Authorization: uid,
    },
}
// `${adminApiUrl}/${adminApiPath}/products`

let orderList = [];

/* 取得訂單 */
function getOrders() {
    axios
        .get(ordersApiUrl, config)
        .then(function (response) {
            // console.log(response.data);
            orderList = response.data.orders;
            // console.log(orderList);
            renderOrders();
        })
        .catch(function (error) {
            console.log(error);
            // console.log(error.response.data.message);
        });
}
getOrders();


/* 選染取得的訂單列表 */
/* 0-1處理品項字串 */
function showProductTitle(cartArray) {
    let str = "";
    cartArray.forEach(function (item, index) {
        str += `<p>${index + 1}. ${item.title}</p>`;
    });
    return str;
}
/* 0-2轉換日期格式 */
function transformData(inputTime) {
    const date = new Date(inputTime * 1000);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return `${year}/${month}/${day}`;
}

/* 1-1渲染訂單 */
const orderPageTable = document.querySelector(".orderPage-table tbody");
function renderOrders() {
    let orderListHtml = "";
    orderList.forEach(function (ordersItem) {
        let productStr = showProductTitle(ordersItem.products);
        let orderAt = transformData(ordersItem.createdAt);
        orderListHtml += `
            <tr>
                <td>${ordersItem.id}</td>
                <td>
                    <p>${ordersItem.user.name}</p>
                    <p>${ordersItem.user.tel}</p>
                </td>
                <td>${ordersItem.user.address}</td>
                <td>${ordersItem.user.email}</td>
                <td>
                    ${productStr}
                </td>
                <td>${orderAt}</td>
                <td class="orderStatus">
                    <a href="#">未處理</a>
                </td>
                <td>
                    <input type="button" class="delSingleOrder-Btn" value="刪除" data-id="${ordersItem.id}">
                </td>
            </tr>
            `
    })
    orderPageTable.innerHTML = orderListHtml;
    /* 2-2 */
    if (!orderList.length) {
        discardAllBtn.disabled = true; //禁用
        console.log("當前沒有訂單");
    } else {
        discardAllBtn.disabled = false; //啟用
    }
}

/* 2刪除 */
/* 2-0取得按鈕 */
const discardAllBtn = document.querySelector(".discardAllBtn");
const orderPageTableTbody = document.querySelector(".orderPage-table tbody");

/* 2-0監聽按鈕 */
discardAllBtn.addEventListener("click", function (event) {
    console.log(event.target);
    deleteAllOrder();
});
orderPageTableTbody.addEventListener("click", function (event) {
    const orderId = event.target.dataset.id;
    if (orderId) {
        deleteThisOrder(orderId);
    }
})

function deleteThisOrder(InputOrderId) {
    axios
        .delete(`${ordersApiUrl}/${InputOrderId}`, config)
        .then(function (response) {
            console.log("成功刪除這筆訂單");
            getOrders();
        })
        .catch(function (error) {
            console.log(error);
            console.log(`刪除這筆訂單失敗`);
        })
};

/* 2-1刪除全部訂單 */
function deleteAllOrder() {
    axios
        .delete(ordersApiUrl, config)
        .then(function (response) {
            console.log(`成功刪除全部訂單`);
            getOrders();
        })
        .catch(function (error) {
            console.log(error);
            console.log(`刪除全部訂單失敗`);
        })
}
/* 2-2如果沒有訂單就不送出刪除請求（1-1） */
/* 2-3刪除個別訂單 */










// var people = [
//   {
//     name: "卡斯伯",
//     order: "鍋燒意麵",
//     price: 80
//   },
//   {
//     name: "小明",
//     order: "牛肉麵",
//     price: 120
//   },
//   {
//     name: "漂亮阿姨",
//     order: "滷味切盤",
//     price: 40
//   },
//   {
//     name: "Ray",
//     order: "大麻醬乾麵",
//     price: 60
//   }
// ];

// console.log("before");
// console.log(people);

// var newOrders = [];
// people.forEach(function(obj, index){
//     newOrders[index] = obj;

//     newOrders[index] = {
//         name: obj.name,
//         order: obj.order,
//         price: obj.price,
//         newPrice: obj.price * 0.8
//     };

//     newOrders[index] = {
//         ...obj,
//         newPrice: obj.price * 0.8
//     };
// });

// console.log("newOrder");
// console.log(newOrders);


// console.log("after");
// console.log(people);





// var testObjA = Object.assign({}, people[0]);
// var testObjB = Object.assign({anotherProperty: 123}, people[0]);