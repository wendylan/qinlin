import axios from 'axios';
var areaToText = {};
areaToText.province = function(str=''){
	if(str){
		str = str.substr(0, 4);
		str = str+'00';
	}
	var result = '';
	axios({
		method: 'get',
		url: '/ShowRegion',
		params: {
			rid: str
		} 
	}).then(function(res) {
		console.log('res', res);
		result = res;
        // console.log(result);
		return result;
	}).catch(err => {
		console.log(err);
	});
}
// console.log(areaToText.province(''));
export default areaToText;