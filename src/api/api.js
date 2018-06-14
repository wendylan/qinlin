import axios from 'axios';

// export const requestLogin = params => { return axios.post(`/Login`, params).then(res => res.data); };
/*export const requestLogin = params => { return axios({
                                                method: 'post',
                                                baseURL:'/api',
                                                url: '/Login',
                                                data: params}).then(res => res) };*/

export const api = {
	postApi(u, postParams) {
		console.log(u, postParams)
		// let Url = 'https://beta.qinlinad.com/QADN/'
		return axios({
			method: 'post',
			// baseURL: Url,
			url: u,
			data: postParams,
			transformRequest: [function (data) {
				// Do whatever you want to transform the data
				let ret = '';
				for (let it in data) {
					ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
				}
				return ret
			}],
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(res => res).catch(err => {
			console.log(err);
		});
	},
	getApi(u, getParams) {
		//     console.log(u,getParams)
		// let Url = 'https://beta.qinlinad.com/QADN/'
		return axios({
			method: 'get',
			// baseURL: Url,
			// baseURL: '/api',
			url: u,
			params: getParams
		}).then(res => res).catch(err => {
			console.log(err);
		});
	},
}
export default api
