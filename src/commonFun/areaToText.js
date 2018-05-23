// 使用方法：callback为一个函数,str为rid,它为空的时候返回所有的区域,否则返回相对应的区域
import axios from 'axios';
var areaToText = {};
// areaToText.province = function(callback, str=''){
// 	if(str){
// 		console.log(str);
// 		str = str.toString().substring(0, 2);
// 		str = str+'0000';
// 	}
// 	var result = '';
// 	axios({
// 		method: 'get',
// 		url: '/ShowRegion',
// 		// baseURL: '/api',
// 		params: {
// 			rid: str
// 		} 
// 	}).then(function(res) {
// 		result = res.data;
// 		typeof callback === 'function' && callback.call(window, result);
// 		return result;
// 	}).catch(err => {
// 		console.log(err);
// 	});
// }

areaToText.toText = function(callback, str){
	var result = {
		province: '',
		city: '',
		area: ''
	};
	axios({
		method: 'get',
		url: '/ShowRegion',
		// baseURL: '/api',
	}).then((res) => {
		let arr = res.data;
		let cityStr = str.toString().substring(0, 2);
		for(let data of arr){
			let dataStr = data.rID.toString().substring(0, 2);
			if(dataStr == cityStr){
				result.province = data.rName;
				break;
			}
		}
		axios({
			method: 'get',
			url: '/ShowRegion',
			// baseURL: '/api',
			params: {
				rid: cityStr+'0000'
			}
		}).then(res => {
			let cityArr = res.data;
			result.city = cityArr[0].rName;
			for(let city of cityArr){
				if((city.rID == str) && (str.toString().substring(4, 6)!='00')){
					result.area = city.rName;
					break;
				}
			}
			typeof callback === 'function' && callback.call(window, result);
			return result;

		});
	}).catch(err => {
		console.log(err);
	});
}
export default areaToText;