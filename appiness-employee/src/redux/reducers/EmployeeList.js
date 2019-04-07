  export default (state, action) => {
    switch (action.type) {
      case "employeeList":
        return {
            type:action.type,
            data:action.payload
        };
      default:
        return state!=null?state:null;
    }
  };