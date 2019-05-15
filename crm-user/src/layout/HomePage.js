import React, { Component } from 'react';
import { connect } from "react-redux";
import userListAction from "../redux/actions/UserList";
import userHandler from '../handler/UserHandler';
import { bindActionCreators } from 'redux'
 import TopBar from '../core/TopBar';
 import history from '../utils/History';
 import LocalStorage from  '../utils/LocalStorage';
 import ajax from '../utils/Ajax';
 const uuid = require('uuid-with-v6');

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
 
  }
  componentWillMount(){
		this.props.userListAction(LocalStorage.getDataByKey("users"));
  }
  componentDidMount(){
	  var me=this;
    var input = document.getElementById("search-input");
    input.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
		event.preventDefault();
		var value=event.target.value;
		/* with api call */
		//me.setState({searchedText:value});
		// ajax.request({url:"https://api.github.com/search/users?q="+value}).then(function(res){
			///ajax.request({url:"https://api.github.com/users/"+value}).then(function(res){
		if(value&&value.trim()){
		//	var data=res.data.items?res.data.items:[];
		//	var regex = new RegExp(value, "i");
	//	data=data.filter((obj)=>{ return obj.userName===(value)})
	   value=value.trim()
			var data={userName:value,id:uuid.v6()}
			//res.data?[res.data]:[];
			var userList=LocalStorage.getDataByKey("users")?LocalStorage.getDataByKey("users"):[];
			var index = userList.map(function(obj) {
				return(obj["userName"].toLowerCase())
				}).indexOf(data.userName.toLowerCase());
				if(!(index>=0)){
					LocalStorage.setDataByKey("users",[...userList,...[data]])
					me.props.userListAction([...userList,...[data]]);
					event.target.value="";
				}else
				alert("User name already exist.")
		//})
	}
      }
	});
	
  }
  componentWillUnmount(){
    var input = document.getElementById("search-input");
    input.removeEventListener("keyup", function(event) {
    });
  }
getRow=(object,keyUnique)=>{ 
	var me=this;
	var cells=[];
	Object.keys(object).forEach((key,index)=> {
		let value = object[key];
		if(key=="userName")
		  cells.push(getCell(value,keyUnique+"_cell_"+index));
	});
	cells.push(getCell(
	    <div className="options">
			<span className="options-button button-margin" 
			onClick={(e)=>{
				e.stopPropagation();
				history.push("/addupdateuser",{id:object.id})}}>Edit</span>
				<span className="options-button" 
				onClick={(e)=>{
					e.stopPropagation();
					userHandler.deleteUser(object,function(){
					me.props.userListAction(LocalStorage.getDataByKey("users"));
				})}}>Delete</span>
	</div>,
	     keyUnique+"_cell_"+Object.keys(object).length));
	return <div key={keyUnique+"row"}
						onClick={(e)=>{
							e.stopPropagation();
							history.push("/userrepolist",{userName:object.userName})}} 
						className="row">{cells}</div>;
}
				
  render() {
	  var me=this;
		var userList=this.props.userList&&this.props.userList.data?this.props.userList.data:[];
		var tableHeader=[];
		var tableRows=[];
		var keyUnique=0;
		if(userList&&userList.length>0){
			userList.forEach(element => {
				tableRows.push(this.getRow(element,keyUnique));
				keyUnique++;
			});
			for (const key in userList[0]) {
				if(key=="userName"){
					tableHeader.push(getCell(key,keyUnique+"header"));
					keyUnique++
				}
			}
			tableHeader.push(getCell("options",keyUnique+"header"));
			keyUnique++
		}
    return (
      <div className="home-page">
			<TopBar 
			searchFieldId={"search-input"}
			title={"Users"}
			/>
					<div className="table">
						<div className="row header">
						{tableHeader}
						</div>
					   {tableRows}
					</div>
			</div>
    );
  }
}
const mapStateToProps = redux => ({
 userList:redux.userList
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { userListAction:userListAction}, 
    dispatch 
  );

};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage) ;


function  getCell(data,index){
	return  <div key={index} className="cell">
					{data}
				</div>
}

