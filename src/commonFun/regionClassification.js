//作用： 
// 使用方法：callback为一个函数,str为rid,它为空的时候返回所有的区域,否则返回相对应的区域
import axios from 'axios';
// var areaToText = {};
// areaToText.province = function(callback, str=''){
// 	if(str){
// 		console.log(str);
// 		str = str.toString().substr(0, 2);
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
// export default areaToText;

var region = {};
var result = {};
region.province = function(callback, str){
	if(!str){
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
			// console.log(arr);
			result.province = arr;
			typeof callback === 'function' && callback.call(window, result);
			return result;
		}).catch(err => {
			console.log(err);
		});
	}else{
		let area = [];
		str = str.toString().substr(0, 2);
		str = str+'0000';
		axios({
			method: 'get',
			url: '/ShowRegion',
			// baseURL: '/api',
			params: {
				rid: str
			} 
		}).then((res) =>{
			// console.log('province', this.province());
			let citys = res.data;
			let provinceData = result.province;
			console.log(citys);
			citys.push({rID: 440302, rName: "南城区", rRank: 3, rSort: 1, pinYin: "SG"});
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
}

// region.cityArea = function(callback, str, provinceData){
// region.cityArea = function( str, provinceData){
// 	// var pro = this.province();
// 	// console.log(pro);
// 	var result = {};
// 	let area = [];
// 	str = str.toString().substr(0, 2);
// 	str = str+'0000';
// 	axios({
// 		method: 'get',
// 		url: '/ShowRegion',
//         // baseURL: '/api',
// 		params: {
// 			rid: str
// 		} 
// 	}).then((res) =>{
// 		// console.log('province', this.province());
// 		let citys = res.data;
// 		console.log(citys);
// 		citys.push({rID: 440302, rName: "南城区", rRank: 3, rSort: 1, pinYin: "SG"});
// 		for(let province of provinceData){
// 			if(province.value == str){
// 				province.children = [];
// 				for(let city of citys){
// 					let obj = { label: '', value:'' };
// 					obj.label = city.rName;
// 					obj.value = city.rID;
// 					if(city.rID.toString().substring(4, 6) == '00' ){
// 						province.children.push(obj);
// 					}else{
// 						area.push(obj);
// 					}
// 				}
// 			}
// 		}
// 		result.city = provinceData;
// 		result.area = area;
// 		// typeof callback === 'function' && callback.call(window, result);
// 		return result;
// 	}).catch(err => {
// 		console.log(err);
// 	});
// }
export default region;