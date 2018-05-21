//作用： 地区转换成中文
// 使用方法：callback为一个函数,str为rid,它为空的时候返回所有的区域,否则返回相对应的省份区域
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
		if(str) {
			// 获取指定地区数据
			result = res.data[0].rName;
		}else{
			// 获取所有地区数据
			result = res.data;
		}
		typeof callback === 'function' && callback.call(window, result);
		return result;
	}).catch(err => {
		console.log(err);
	});
}
export default areaToText;