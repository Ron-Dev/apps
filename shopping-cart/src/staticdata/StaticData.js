
const staticData={
    getCartItemList:getCartItemList,
    getDropDataList:getDropDataList
}
export default staticData;
function  getDropDataList(value){
    var data=[];
    switch (value) {
        case "color":
        data=[...["Red","Black","Blue"]]
        break;
        case "size":
        data=[...[4,5,6,7]]
        break;
        case "quantity":
        data=[...[1,2,3,4]]
        break;
        default:
            break;
    }
    return data;
}
function  getCartItemList(){
    return([{
        "id":1,
        "name":"Nike",
        "size":5,
        "color":"Black",
        "quantity":2,
        "price":250
        },
        {
        "id" : 2,
        "name":"Adidas",
        "size":4,
        "color":"Blue",
        "quantity":2,
        "price":800
        },
        {
        "id":3,
        "name":"Jordan",
        "size":6,
        "color":"Black",
        "quantity":1,
        "price":350
        },
        {
        "id":4,
        "name":"Reebok",
        "size":7,
        "color":"Red",
        "quantity":3,
        "price":600
        }
        ])
}

