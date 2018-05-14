// 运用场景：过滤去重，主要使用在table表头需要过滤筛选功能

var filterData = function(dataArr, key){
	let arr = [];
	let door = 1;
	for(let data of dataArr){
		for(let item of arr){
			if(data[key] == item.value){
				door = 0;
			}
		}
		if(door) {
			arr.push({text: data[key], value: data[key]});
		}
		console.log(arr);
		return arr;
	}
}
export default filterData;