
const userListAction = (response,dispatch) => {
    return {
      type: "userList",
      payload:response
    }
  }

  export default userListAction;