//作用： 
import cityData from '../commonFun/region.json';
var region = {};

// 使用方法：返回两级联动框
// 返回数据：省市
region.province = function () {
	var result = [];
	let arr = [];
	// 省
	for (let province of cityData) {
		let opt = { label: '', value: '', children: [] }
		opt.label = province.region;
		opt.value = province.code;
		if (province.regionEntitys.length) {
			// 市
			for (let city of province.regionEntitys) {
				let cityOpt = { label: '', value: '' };
				cityOpt.label = city.region;
				cityOpt.value = city.code;
				opt.children.push(cityOpt);
			}
		}
		arr.push(opt)
	}
	result = arr;
	// console.log(result);
	return result;
}


// 使用方法：返回三级联动框
// 返回数据：省市区

region.cityArea = function () {
	var result = [];
	let arr = [];
	// 省
	for (let province of cityData) {
		let opt = { label: '', value: '', children: [] }
		opt.label = province.region;
		opt.value = province.code;
		if (province.regionEntitys.length) {
			// 市
			for (let city of province.regionEntitys) {
				let cityOpt = { label: '', value: '', children: [] };
				cityOpt.label = city.region;
				cityOpt.value = city.code;
				if (city.regionEntitys.length) {
					// 区
					for (let area of city.regionEntitys) {
						let areaOpt = { label: '', value: '' };
						areaOpt.label = area.region;
						areaOpt.value = area.code;
						cityOpt.children.push(areaOpt);
					}
				}
				opt.children.push(cityOpt);
			}
		}
		arr.push(opt)
	}
	result = arr;
	// console.log(result);
	return result;
}


export default region;