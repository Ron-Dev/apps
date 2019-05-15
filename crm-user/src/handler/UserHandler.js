import LocalStorage from  '../utils/LocalStorage';

const uuid = require('uuid-with-v6');

const userHandler={
  addUpdateUser:addUpdateUser,
    deleteUser:deleteUser,
    getUser:getUser
}
export default userHandler;



function  deleteUser(object,callBack){
  var array=LocalStorage.getDataByKey("users");
  array=array?array:[]
	var index = array.map(function(obj) {
		return(obj["id"])
	  }).indexOf(object.id);
    array.splice(index,1);
    LocalStorage.setDataByKey("users",array)
  if(callBack)
     callBack()
}


function  addUpdateUser(object,userId, callBack){
  var array=LocalStorage.getDataByKey("users");
  array=array?array:[];
  var userNameindex = array.map(function(obj) {
    return(obj["userName"].toLowerCase())
    }).indexOf(object.userName.toLowerCase());
    
      if(userId){
        if(!(userNameindex>=1)){
        var index = array.map(function(obj) {
          return(obj["id"])
          }).indexOf(userId);
        array[index]={...array[index],...object};
        LocalStorage.setDataByKey("users",array)
        if(callBack)
           callBack()
        }else
        alert("User name already exist")
      }else{
        if(!(userNameindex>=0)){
        object={...{...{id:uuid.v6()}},...object}
        array.push(object);
        LocalStorage.setDataByKey("users",array)
        if(callBack){
          callBack()
        }
        }else
        alert("User name already exist")
      }
   
    
  
}

function  getUser(id,callBack){
  var array=LocalStorage.getDataByKey("users");
  array=array?array:[]
  var index = array.map(function(obj) {
		return(obj["id"])
    }).indexOf(id);
    return array[index];
}