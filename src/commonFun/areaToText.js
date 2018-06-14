// 使用方法：callback为一个函数,str为rid,它为空的时候返回所有的区域,否则返回相对应的区域
import axios from 'axios';
var areaToText = {};
// 省市区返回数据格式为：{province: '广东省', city: '广州市', area: '越秀区'}
areaToText.toText = function (callback, str) {
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
		for (let data of arr) {
			let dataStr = data.rID.toString().substring(0, 2);
			if (dataStr == cityStr) {
				result.province = data.rName;
				break;
			}
		}
		axios({
			method: 'get',
			url: '/ShowRegion',
			// baseURL: '/api',
			params: {
				rid: cityStr + '0000'
			}
		}).then(res => {
			let cityArr = res.data;
			if (str.toString().substring(2, 6) == '0000') {
				result.city = cityArr[0].rName;
			} else {
				for (let city of cityArr) {
					if (city.rID.toString().substring(0, 4) == str.toString().substring(0, 4)) {
						console.log('所在城市', city.rID);
						result.city = city.rName;
						break;
					}
				}
				for (let city of cityArr) {
					if ((city.rID == str) && (str.toString().substring(4, 6) != '00')) {
						console.log('所在区域', city.rID);
						result.area = city.rName;
						break;
					}
				}
			}
			typeof callback === 'function' && callback.call(window, result);
			return result;

		});
	}).catch(err => {
		console.log(err);
	});
}
// 市区返回数据格式： {city: '广州市', area: '越秀区'}
areaToText.toTextCityArea = function (callback, str) {
	let result = { city: '', area: '' };
	let cityStr = str.toString().substring(0, 2);
	axios({
		method: 'get',
		url: '/ShowRegion',
		// baseURL: '/api',
		params: {
			rid: cityStr + '0000'
		}
	}).then(res => {
		let cityArr = res.data;
		if (str.toString().substring(2, 6) == '0000') {
			result.city = cityArr[0].rName;
		} else {
			for (let city of cityArr) {
				if (city.rID.toString().substring(0, 4) == str.toString().substring(0, 4)) {
					console.log('所在城市', city.rID);
					result.city = city.rName;
					break;
				}
			}
			for (let city of cityArr) {
				if ((city.rID == str) && (str.toString().substring(4, 6) != '00')) {
					console.log('所在区域', city.rID);
					result.area = city.rName;
					break;
				}
			}
		}
		typeof callback === 'function' && callback.call(window, result);
		return result;
	});
}

// 市 返回数据格式: city: '广州市'
areaToText.toTextCity = function (callback, str) {
	let result = '';
	let cityStr = str.toString().substring(0, 2);
	axios({
		method: 'get',
		url: '/ShowRegion',
		// baseURL: '/api',
		params: {
			rid: cityStr + '0000'
		}
	}).then(res => {
		let cityArr = res.data;
		if (str.toString().substring(2, 6) == '0000') {
			result = cityArr[0].rName;
		} else {
			for (let i = 0; i < cityArr.length; i++) {
				if (cityArr[i].rID.toString().substring(0, 4) == str.toString().substring(0, 4)) {
					console.log('所在城市', cityArr[i].rID);
					result = cityArr[i].rName
					break
				}
			}
		}
		typeof callback === 'function' && callback.call(window, result);
		return result;
	});
}
export default areaToText;
