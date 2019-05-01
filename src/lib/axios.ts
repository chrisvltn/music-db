import Axios from "axios";

const axios = Axios.create()

axios.defaults.baseURL = 'https://theaudiodb.com/api/v1/json/195003/'
axios.defaults.paramsSerializer = (params = {}) =>
	Object.entries(params)
		.map(([key, value]) => [encodeURIComponent(key), encodeURIComponent((value || '').toString())].join('='))
		.join('&')

export default axios
