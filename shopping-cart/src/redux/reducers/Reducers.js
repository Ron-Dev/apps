import {  combineReducers } from 'redux'; 
import CartItemList from './CartItemList'; 



const reducers = combineReducers({   
    cartItemList:CartItemList
 })  
export default reducers;