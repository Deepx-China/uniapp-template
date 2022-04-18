
export const getFormate = function(ds, dt) {
	let d = ''
	if (typeof ds == 'object') {
		d = ds
	} else {
		d = this.Str2Date(ds);
	}
	dt = dt ? dt : "y-m-d h:i:s"
	dt = dt.replace(/y|Y/g, d.getFullYear().toString());
	dt = dt.replace(/m|M/g, this.Number2Fix(d.getMonth() + 1));
	dt = dt.replace(/d|D/g, this.Number2Fix(d.getDate()));
	dt = dt.replace(/h|H/g, this.Number2Fix(d.getHours()));
	dt = dt.replace(/i|I/g, this.Number2Fix(d.getMinutes()));
	dt = dt.replace(/s|S/g, this.Number2Fix(d.getSeconds()));
	return dt;
}
/**
 * Str2Date: 时间字符串转换为时间对象
 * @param {string} str 
 */
export const Str2Date = function(str) {
	if (str) {
		return new Date(str.replace(/\-/g,"/"));
	}else{
		return new Date();
	}
}

    /**
     * Date2Str: 时间对象转换为时间字符串
     * @param {object} date 
     */
export const Date2Str = function(date, delimiter) {
	if (!date) {
		date = new Date()
	}
	delimiter = delimiter ? delimiter : '-';
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	month = month < 10 ? '0' + month : month;
	day = day < 10 ? '0' + day : day;
	return [year, month, day].join(delimiter)
}

/**
 * GetDays: 根据时间对象获取当月天数
 * @param {object} date 
 */
export const GetDays = function(date) {
	let curMonth = date.getMonth();
	let curDate = date.getDate();
	date.setMonth(curMonth + 1);
	date.setDate(0);
	let alldays = date.getDate();
	date.setMonth(curMonth);
	date.setDate(curDate);
	return alldays;
}

/**
 * DateReduce: 日期做减法，返回时间戳
 * @param {string} d1 
 * @param {string} d2 
 */
export const DateReduce = function(d1, d2) {
	d1 = Str2Date(d1);
	d2 = Str2Date(d2);
	return Date.parse(d1) - Date.parse(d2);
}

/**
 * Number2Fix: 不足两位数的数字补零
 * @param n 
 */
export const Number2Fix = function(n) {
	let rs = n < 10 ? "0" + n : n;
	return rs.toString();
}

/**
 * GetDate: 获取某个月日期对象
 * @param {Object} date
 */
export const GetNumberOfMonth = function(date, num) {
	num = num ? num : 0
	let year = parseInt(date.getFullYear())
	let month = parseInt(date.getMonth()) + num
	let day = 1
	if (month < 0) {
		year -= 1
		month += 12
	}
	if (month > 12) {
		year += 1
		month -= 12
	}
	return new Date(
		year,
		month,
		day
	)
}