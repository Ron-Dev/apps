import React, { Component } from 'react';
import userHandler from '../handler/UserHandler';
import history from '../utils/History';

class AddUpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount(){
    var userId=this.props.location.state?this.props.location.state["id"]:undefined;
    if(userId!=undefined){
      var updatedObject=userHandler.getUser(userId)
      const data = new FormData(this.form);
      for (let name of data.keys()) {
        const input = this.form.elements[name];
        input["value"]=updatedObject[name];
         }
         this.setState({userId:userId});
        }
    }
      handleSubmit=(event)=> {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        var dataObject={};
        var isInvalidValue=false;
        for (let name of data.keys()) {
          const input = form.elements[name];
          const value = input.value;
          value=value.trim()
            dataObject[name]=value;
            if(!value)
               isInvalidValue=true;
        }
        if(isInvalidValue)
        alert("Please enter User name.")
        else
        userHandler.addUpdateUser(dataObject,this.state.userId,function() {
          history.push("/home")
          });
      }
  render() {
    return (
               <div className="add-update-page">
               <div className="add-update-header-container">
                  <div className="header-title">
                     {this.state.userId?"Update user detail":"Add user detail"}
                  </div>
               </div>
               <div className="view-container-parent">
                  <div className="view-container">
                     <form ref={(e)=>this.form=e}
                        onSubmit={this.handleSubmit}>
                        <div className="user-detail">
                           <div className="input-text-field">
                              <input 
                                 id="username"
                                 name="userName"
                                 placeholder="User Name"
                                 type="text"
                                 data-parse="uppercase"
                                 className="username-field text-field" 
                              />  
                           </div>
                        </div>
                        <div className="add-update-section">
                           <div className="row">
                              <div className="col-sm-12" style={{textAlign:"center"}}>
                                 <button  tabIndex="3"  
                                    type="submit"
                                    className="submit-button"
                                    >
                                    {this.state.userId?"Update User":"Add User"}
                                 </button>
                              </div>
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
               </div>
    );
  }
}

export default AddUpdateUser ;
