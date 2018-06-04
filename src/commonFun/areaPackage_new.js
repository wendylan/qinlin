//作用： 
// 使用方法：返回两级联动框
import cityData from '../commonFun/region.json';
var region = {};
region.province = function(){
	var result = [];
	let arr = [];
	for(let province of cityData){
		let opt = {label:'', value:'', children:[]}
		opt.label = province.region;
		opt.value = province.code;
		// opt.children = province.regionEntitys;
		if(province.regionEntitys.length){
			for(let city of province.regionEntitys){
				let cityOpt = {label: '', value: ''};
				cityOpt.label = city.region;
				cityOpt.value = city.code;
				opt.children.push(cityOpt);
			}
		}
		arr.push(opt)
	}
	result = arr;
	console.log(result);
	return result;
}
export default region;