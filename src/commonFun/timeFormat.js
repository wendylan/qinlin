// 运用场景：时间格式化

var timeFormat = {};
// 获取时间年月日
timeFormat.toDate = function (time, format = '-') {
	let result = '';
	if (time) {
		let str = time.toString().substring(time.length - 2);
		if (str == ".0") {
			time = time.toString().substring(0, time.length - 2);
		}
		time = new Date(Date.parse(time.toString().replace(/-/g, "/")));
		let year = time.getFullYear();
		let month = time.getMonth() + 1;//js从0开始取
		let date = time.getDate();

		if (month < 10) {
			month = "0" + month;
		}
		if (date < 10) {
			date = "0" + date;
		}

		result = year + format + month + format + date; //2009-06-12
	}

	return result;
};
// 获取时间年月日时分秒
timeFormat.toDateTime = function (time) {
	let result = '';
	if (time) {
		let str = time.toString().substring(time.length - 2);
		if (str == ".0") {
			time = time.toString().substring(0, time.length - 2);
		}
		time = new Date(Date.parse(time.toString().replace(/-/g, "/")));
		let year = time.getFullYear();
		let month = time.getMonth() + 1;//js从0开始取
		let date = time.getDate();
		let hour = time.getHours();
		let minutes = time.getMinutes();
		let second = time.getSeconds();

		if (month < 10) {
			month = "0" + month;
		}
		if (date < 10) {
			date = "0" + date;
		}
		if (hour < 10) {
			hour = "0" + hour;
		}
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		if (second < 10) {
			second = "0" + second;
		}

		result = year + "-" + month + "-" + date + " " + hour + ":" + minutes + ":" + second; //2009-06-12 17:18:05
	}

	return result;
};
export default timeFormat;
