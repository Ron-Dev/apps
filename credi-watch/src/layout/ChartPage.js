import React, { Component } from 'react';
import { connect } from "react-redux";
import searchedListAction from "../redux/actions/SearchedList";
import { bindActionCreators } from 'redux'
 import TopBar from '../core/TopBar';
 import staticData from  '../staticdata/StaticData';
 import History from  '../utils/History';
 import CanvasJSReact from '../module/canvasjs.react';
 const CanvasJSChart = CanvasJSReact.CanvasJSChart;
 class ChartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
 
  }
  componentWillMount(){
  }
  componentDidMount(){
  }
  componentWillUnmount(){
  }
  render() {
    var searchedList=this.props.searchedList&&this.props.searchedList.data?this.props.searchedList.data:{};
      const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", 
        title:{
          text: "Year - 2011/12",
          fontSize: 26
        },
        axisX: {
          title: "Lost",
          logarithmic: true
        },
        axisY: {
          title: "Won"
        },
        data: [{
          type: "bubble",
          indexLabel: "{label}",
          toolTipContent: "<b>{label} Team</b><br>Lost : {x} Matches<br>Won : {y} Matches<br>Total Goals : {z}",
          dataPoints: staticData.getChartData(searchedList)
        }]
      }
    return (
      <div className="home-page">
			<TopBar 
      title={"English Premier League 2011/12"}
      onButtonClick={()=>{History.push("/homepage")}}
      buttonLabel="Table View"
			/>
    <CanvasJSChart options = {options} 
			/>
			</div>
    );
  }
}
const mapStateToProps = redux => ({
	searchedList:redux.searchedList
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { searchedListAction:searchedListAction}, 
    dispatch 
  );

};
export default connect(mapStateToProps, mapDispatchToProps)(ChartPage) ;
