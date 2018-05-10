import axios from 'axios';

// export const requestLogin = params => { return axios.post(`/Login`, params).then(res => res.data); };
/*export const requestLogin = params => { return axios({
                                                method: 'post',
                                                baseURL:'/api',
                                                url: '/Login',
                                                data: params}).then(res => res) };*/

export const api = {
	postApi(u, postParams){
		console.log(u, postParams)
		return axios({
			method: 'post',
			baseURL:'/api',
			url: u,
			data: postParams
		}).then(res => res)
	},
	getApi(u, getParams){
		console.log(u, getParams)
		return axios({
			method: 'get',
			baseURL:'/api',
			url: u,
			params: getParams
		}).then(res => res)
	},
}
export default api
