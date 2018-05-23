//作用： 
// 使用方法：callback为一个函数,str为rid,它为空的时候返回所有的区域,否则返回相对应的区域
import axios from 'axios';
var region = {};
region.province = function(callback){
	var result = {};
	axios({
		method: 'get',
		url: '/ShowRegion',
		// baseURL: '/api',
	}).then((res) => {
		let tmp = res.data;
		let arr = [];
		for(let i=0; i<tmp.length; i++){
			let opt = {label:'', value:'', children:[]}
			opt.label = tmp[i].rName
			opt.value = tmp[i].rID
			arr.push(opt)
		}
		result.province = arr;
		typeof callback === 'function' && callback.call(window, result);
		return result;
	}).catch(err => {
		console.log(err);
	});
}

region.cityArea = function(callback, str, provinceData){
	var result = {};
	let area = [];
	str = str.toString().substring(0, 2)+'0000';
	axios({
		method: 'get',
		url: '/ShowRegion',
        // baseURL: '/api',
		params: {
			rid: str
		} 
	}).then((res) =>{
		let citys = res.data;
		for(let province of provinceData){
			if(province.value == str){
				province.children = [];
				for(let city of citys){
					let obj = { label: '', value:'' };
					obj.label = city.rName;
					obj.value = city.rID;
					if(city.rID.toString().substring(4, 6) == '00' ){
						province.children.push(obj);
					}else{
						area.push(obj);
					}
				}
			}
		}
		result.city = provinceData;
		result.area = area;
		typeof callback === 'function' && callback.call(window, result);
		return result;
	}).catch(err => {
		console.log(err);
	});
}
export default region;