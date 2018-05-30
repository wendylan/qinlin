// 运用场景：过滤去重，主要使用在table表头需要过滤筛选功能
var filterData = function(dataArr, key){
	let dataList = [];
	for(let item of dataArr){
		let Obj = {
			text: item[key],
			value: item[key],
		}
		if(item[key]){
			// 去重
			if(JSON.stringify(dataList).indexOf(JSON.stringify(Obj)) === -1){
				dataList.push(Obj);
			}
		}
	}
	console.log(dataList);
	return dataList;
}
export default filterData;