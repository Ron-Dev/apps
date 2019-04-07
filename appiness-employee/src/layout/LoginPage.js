import React, { Component } from 'react';
import history from '../utils/History';
import staticData from '../staticdata/StaticData';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName:'',
      password:''
    };
  }

  handleLogin=(e) =>{
    e.preventDefault();
  if(!this.state.password || !this.state.userName){
      alert("Please enter username/password")
  }	
  if(this.state.userName&&this.state.password){
   var loginData= staticData.getLoginData();
   var enteredData={userName:this.state.userName.toLowerCase(),password:this.state.password};
   if(JSON.stringify(loginData) === JSON.stringify(enteredData) ){
        history.push('/home')
   }else{
    alert("Invalid username/password!")
   }
    }
}
  render() {
    return (
      <div className="login-page">
      <div className="login-header-container">
         <div className="header-title">
            Welcome to appiness world
         </div>
      </div>
      <div className="view-container-parent">
         <div className="view-container">
            <form onSubmit={ e =>
               this.handleLogin(e) }>
               <div className="user-detail">
                  <div className="input-text-field">
                     <input 
                        type={"email"}
                        ref={"userName"}
                        tabIndex="1"  
                        value={this.state.userName}
                        placeholder={"User Name"}
                        onChange={(e)=>this.setState({userName:e.target.value})}
                     className="username-field text-field" 
                     />  
                  </div>
               </div>
               <div className="user-detail">
                  <div className="input-text-field">
                     <input 
                        type={"password"}
                        ref={"password"}
                        tabIndex="2"  
                        value={this.state.password}
                        placeholder={"Password"}
                        onChange={(e)=>this.setState({password:e.target.value})}
                     className={"password-field text-field"}
                     />            
                  </div>
               </div>
               <div className="login-section">
                  <div className="row">
                     <div className="col-sm-12" style={{textAlign:"center"}}>
                        <button  tabIndex="3"  
                           type="submit"
                           className="submit-button"
                           >LOGIN
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

export default LoginPage;
