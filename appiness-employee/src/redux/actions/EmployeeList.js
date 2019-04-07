
const employeeListAction = (response,dispatch) => {
    return {
      type: "employeeList",
      payload:response
    }
  }

  export default employeeListAction;