import Ajax from "../../utils/Ajax";

  const userRepoListActionDispatch = (response) => {
    return {
      type: "userRepoList",
      payload:response
    }
  }


   const userRepoListAction = (userName) => {
    return function action(dispatch) {
      dispatch(userRepoListActionDispatch({}));
      if(userName)
      Ajax.request({url:"https://api.github.com/users/"+userName+"/repos"}).then(function(res){
        var responseData=res.data;
        if(responseData&&responseData.length>0)
        dispatch(userRepoListActionDispatch({responseData:responseData}));
        else
        dispatch(userRepoListActionDispatch({isEmpty:true}));
    }).catch(function(msg){
      dispatch(userRepoListActionDispatch({isEmpty:true}));
  })
  }
}
  export  default userRepoListAction;
  