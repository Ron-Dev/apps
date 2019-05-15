  export default (state, action) => {
    switch (action.type) {
      case "userList":
        return {
            type:action.type,
            data:action.payload
        };
      default:
        return state!=null?state:null;
    }
  };