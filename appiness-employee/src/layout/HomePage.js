import React, { Component } from 'react';
import { connect } from "react-redux";
import employeeListAction from "../redux/actions/EmployeeList.js";
import staticData from '../staticdata/StaticData';
import { bindActionCreators } from 'redux'
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
 
  }
  componentWillMount(){
				this.props.employeeListAction(staticData.getEmployeeList())
  }
  componentDidMount(){
			}
		
  render() {
		var employeeList=this.props.employeeList&&this.props.employeeList.data?this.props.employeeList.data:[];
		var tableHeader=[];
		var tableRows=[];
		var keyUnique=0;
		if(employeeList&&employeeList.length>0){
			employeeList.forEach(element => {
				tableRows.push(getRow(element,keyUnique));
				keyUnique++;
			});
			for (const key in employeeList[0]) {
				if(key!="id"){
					tableHeader.push(getCell(key,keyUnique+"header"));
					keyUnique++
				}
			}
		}
    return (
      <div className="home-page">
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
 employeeList:redux.employeeList
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { employeeListAction:employeeListAction}, 
    dispatch 
  );

};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage) ;


function  getCell(data,index){
	return  <div key={index} className="cell">
					{data}
				</div>
}
function getRow(object,keyUnique){
	var cells=[];
	Object.keys(object).forEach((key,index)=> {
		let value = object[key];
		if(key!="id")
		cells.push(getCell(value,keyUnique+"_cell_"+index));
	});
	return <div key={keyUnique+"row"} className="row">{cells}</div>;
}