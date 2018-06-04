// 使用方法：str为rid
import cityData from '../commonFun/region.json';
var areaToText = {};
// 省市区返回数据格式为：{province: '广东省', city: '广州市', area: '越秀区'}
areaToText.toText = function(str){
	var result = {
		province: '',
		city: '',
		area: ''
	};
	let arr = cityData;
    // province
	let provinceStr = str.toString().substring(0, 2);
	let cityStr = str.toString().substring(0, 4);
	for(let data of arr){
		let provinceCode = data.code.substring(0, 2);
		// console.log(provinceCode);
		if(provinceCode == provinceStr){
			result.province = data.region;
            // city
			for(let city of data.regionEntitys){
				let cityCode = city.code.substring(0, 4);
				if(cityStr == cityCode){
					result.city = city.region;
					// area
					for(let area of city.regionEntitys){
						if(str == area.code){
							result.area = area.region;
							break;
						}
					}
					break;
				}
			}
			break;
		}
	}
	console.log(result);
	return result;
}

export default areaToText;
