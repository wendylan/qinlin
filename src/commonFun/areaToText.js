// 使用方法：callback为一个函数,str为rid,它为空的时候返回所有的区域,否则返回相对应的区域
import axios from 'axios';
var areaToText = {};
areaToText.province = function(callback, str=''){
	if(str){
		console.log(str);
		str = str.toString().substr(0, 2);
		str = str+'0000';
	}
	var result = '';
	axios({
		method: 'get',
		url: '/ShowRegion',
		// baseURL: '/api',
		params: {
			rid: str
		} 
	}).then(function(res) {
		result = res.data;
		typeof callback === 'function' && callback.call(window, result);
		return result;
	}).catch(err => {
		console.log(err);
	});
}
export default areaToText;