import LocalStorage from  '../utils/LocalStorage';


const cartItemHandler={
 deleteCartItem:deleteCartItem,
 getTotalCount:getTotalCount,
 updateDataBasedOnKey:updateDataBasedOnKey
}
export default cartItemHandler;

function  updateDataBasedOnKey(id,key,value,callBack){
  var array=LocalStorage.getDataByKey("cartItemList");
  array=array?array:[]
	var index = array.map(function(obj) {
		return(obj["id"])
	  }).indexOf(id);
    array[index][key]=value;
    LocalStorage.setDataByKey("cartItemList",array);
  if(callBack)
     callBack()
}
function  getTotalCount(){
  var array=LocalStorage.getDataByKey("cartItemList");
  array=array?array:[]
  var totalCount=0;
  array.forEach((element,index) => {
    totalCount=totalCount+element.price*element.quantity;
  }); return totalCount;
}
function  deleteCartItem(object,callBack){
  var array=LocalStorage.getDataByKey("cartItemList");
  array=array?array:[]
	var index = array.map(function(obj) {
		return(obj["id"])
	  }).indexOf(object.id);
    array.splice(index,1);
    LocalStorage.setDataByKey("cartItemList",array)
  if(callBack)
     callBack()
}


