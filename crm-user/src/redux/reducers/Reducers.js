import {  combineReducers } from 'redux'; 
import userList from './UserList'; 
import userRepoList from './UserRepoList'; 



const reducers = combineReducers({   
    userList:userList,
    userRepoList:userRepoList
 })  
export default reducers;