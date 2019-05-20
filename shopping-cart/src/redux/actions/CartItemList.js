
const cartItemListAction = (response,dispatch) => {
    return {
      type: "cartItemList",
      payload:response
    }
  }

  export default cartItemListAction;