import axios from "axios";
export default class Ajax {
      static request = (cfgObj) => {
		return axios.get(cfgObj.url);;
	}
}