import React, { Component } from 'react';
import { connect } from "react-redux";
import userRepoListAction from "../redux/actions/UserRepoList";
import { bindActionCreators } from 'redux'
 import moment from 'moment';
class UserRepoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
 
  }
  componentWillMount(){
	
  }
  componentDidMount(){
		var me=this;
		var userName=this.props.location.state?this.props.location.state["userName"]:undefined;
			me.props.userRepoListAction(userName);
  }
  componentWillUnmount(){
  
  }
getRow=(object,keyUnique)=>{ var me=this;
	var cells=[];
	Object.keys(object).forEach((key,index)=> {
		let value = object[key];
		if(allowColumn(key)){
			if(key=="created_at")
			 value=moment(new Date(value)).format('LT');
			cells.push(getCell(value,keyUnique+"_cell_"+index));
		}
	});
	return <div key={keyUnique+"row"} className="row">{cells}</div>;
}
				
  render() {
		var me=this;
		var userRepoObj=this.props.userRepoList&&this.props.userRepoList.data?this.props.userRepoList.data:undefined;
		var userRepoList=userRepoObj&&userRepoObj.responseData?userRepoObj.responseData:[];
			var tableHeader=[];
		var tableRows=[];
		var keyUnique=0;
		var emptyMsg;
		if(userRepoList&&userRepoList.length>0){
			userRepoList.forEach(element => {
				tableRows.push(this.getRow(element,keyUnique));
				keyUnique++;
			});
			for (const key in userRepoList[0]) {
				if(allowColumn(key)){
					tableHeader.push(getCell(key,keyUnique+"header"));
					keyUnique++
				}
			}
		}else if(userRepoObj&&userRepoObj.isEmpty){
			emptyMsg	=<div className="empty-msg">No repo found for this user</div>
		}
    return (
      <div className="home-page">
					<div className="table">
					{emptyMsg?emptyMsg:""}
						<div className="row header user-repo-header">
						{tableHeader}
						</div>
					   {tableRows}
					</div>
			</div>
    );
  }
}
const mapStateToProps = redux => ({
	userRepoList:redux.userRepoList
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { userRepoListAction:userRepoListAction}, 
    dispatch 
  );

};
export default connect(mapStateToProps, mapDispatchToProps)(UserRepoList) ;


function  getCell(data,index){
	return  <div key={index} className="cell">
					{data}
				</div>
}
function  allowColumn(key){
	return (key=="name"||key=="description"||key=="language"||key=="created_at");
}


