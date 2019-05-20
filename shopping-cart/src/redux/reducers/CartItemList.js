  export default (state, action) => {
    switch (action.type) {
      case "cartItemList":
        return {
            type:action.type,
            data:action.payload
        };
      default:
        return state!=null?state:null;
    }
  };