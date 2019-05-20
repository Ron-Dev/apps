import React, { Component } from 'react';
import { connect } from "react-redux";
import cartItemListAction from "../redux/actions/CartItemList";
import { bindActionCreators } from 'redux'
 import TopBar from '../core/TopBar';
 import LocalStorage from  '../utils/LocalStorage';
 import staticData from '../staticdata/StaticData';
 import Dropdown from '../core/Dropdown';
 
 import cartItemHandler from '../handler/CartItemHandler';
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCount:5000
    };
 
  }
  componentWillMount(){
		// if(!LocalStorage.getDataByKey("cartItemList"))
		    LocalStorage.setDataByKey("cartItemList",staticData.getCartItemList());
		this.props.cartItemListAction(LocalStorage.getDataByKey("cartItemList"));
  }
  componentDidMount(){
  }
  componentWillUnmount(){
	}
	  getDropdownCell=(key,data,id,index)=>{
			var me=this;
			return(<div key={index} className="cell">
			{<Dropdown 
			data={staticData.getDropDataList(key)}
			value={data}
			onChange={value => {
				cartItemHandler.updateDataBasedOnKey(id,key,value,function(){
					me.props.cartItemListAction(LocalStorage.getDataByKey("cartItemList"));
				});
			}}
			/>}
		</div>)
		}
		
getRow=(object,keyUnique)=>{ 
	var me=this;
	var cells=[];
	Object.keys(object).forEach((key,index)=> {
		let value = object[key];
		if(key!="id")
		if(isDropdownRequired(key))
			cells.push(getCell(value,keyUnique+"_cell_"+index));
			else
			cells.push(this.getDropdownCell(key,value,object.id,keyUnique+"_cell_"+index));
	});
	cells.push(getCell(
	    <div className="options">
				<span className="options-button" 
				onClick={(e)=>{
					e.stopPropagation();
					cartItemHandler.deleteCartItem(object,function(){
					me.props.cartItemListAction(LocalStorage.getDataByKey("cartItemList"));
				})}}>Delete</span>
	</div>,
	     keyUnique+"_cell_"+Object.keys(object).length));
	return <div key={keyUnique+"row"}
						className="row">{cells}</div>;
}
				
  render() {
		var cartItemList=this.props.cartItemList&&this.props.cartItemList.data?this.props.cartItemList.data:[];
		var tableHeader=[];
		var tableRows=[];
		var keyUnique=0;
		if(cartItemList&&cartItemList.length>0){
			cartItemList.forEach(element => {
				tableRows.push(this.getRow(element,keyUnique));
				keyUnique++;
			});
			for (const key in cartItemList[0]) {
				if(key!="id"){
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
			title={"Shopping Cart"}
			totalPrice={cartItemHandler.getTotalCount()}
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
	cartItemList:redux.cartItemList
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { cartItemListAction:cartItemListAction}, 
    dispatch 
  );

};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage) ;


function  getCell(data,index){
	return  <div key={index} className="cell">
					{data}
				</div>
}


function isDropdownRequired(key){
	return !(key=="size"||key=="color"||key=="quantity");
}
