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
            console.log(orderList);
            renderOrders();
        })
        .catch(function (error) {
            console.log(error);
            // console.log(error.response.data.message);
        });
}
getOrders();

/* 處理品項字串 */
function showProductTitle(cartArray) {
    let str = "";
    cartArray.forEach(function (item, index) {
        str += `<p>${index + 1}. ${item.title}</p>`;
    });
    return str;
}
/* 轉換日期格式 */
function transformData(inputTime){
    const date=new Date(inputTime*1000);
    const year=date.getFullYear();
    const month=date.getMonth();
    const day=date.getDate();

    return`${year}/${month}/${day}`;
}

/* 選染取得的訂單列表 */
const orderPageTable = document.querySelector(".orderPage-table tbody");
function renderOrders() {
    let orderListHtml = "";
    orderList.forEach(function (ordersItem) {
        let productStr = showProductTitle(ordersItem.products);
        let orderAt=transformData(ordersItem.createdAt);
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
                    <input type="button" class="delSingleOrder-Btn" value="刪除">
                </td>
            </tr>
            `
    })
    orderPageTable.innerHTML = orderListHtml;
}