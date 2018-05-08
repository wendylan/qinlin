var timeFormat = {};
// 获取时间年月日
timeFormat.date = function(time){
	return  time.substr(0, 10);
}
// 获取时间年月日时分秒
timeFormat.dateTime = function(time){
	return  time.substr(0, 19);
}
export default timeFormat;