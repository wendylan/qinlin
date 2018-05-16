// 获取行业中文信息，传入一个子类id: iID,返回出去的是父类/子类
var industry = {};
let arr = JSON.parse(sessionStorage.getItem('industry'));
industry.getText = function(iID){
	let str = '';
	let piid = '';
	for(let data of arr){
		if(iID == data.iID){
			str = data.iName;
			piid = data.piID;
			break;
		}
	}
	console.log(piid);
	console.log(str);
	for(let data of arr){
		if(piid == data.iID){
			str = data.iName +'-'+str;
			break;
		}
	}
	return str;
};
export default industry;