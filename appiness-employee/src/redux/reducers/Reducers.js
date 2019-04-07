import {  combineReducers } from 'redux'; 
import EmployeeList from './EmployeeList'; 



const reducers = combineReducers({   
    employeeList:EmployeeList
 })  
export default reducers;