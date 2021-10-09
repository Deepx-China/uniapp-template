import { Number2Fix } from './string.js'

/**
 * Date2Str: 时间对象转换为时间字符串
 * @param {object} ds 
 * @param {string} dt 
 */
export const Date2Str = function(ds, dt) {
	dt = dt ? dt : "y-m-d h:i:s"
	dt = dt.replace(/y|Y/g, ds.getFullYear().toString());
	dt = dt.replace(/m|M/g, this.Number2Fix(ds.getMonth() + 1));
	dt = dt.replace(/d|D/g, this.Number2Fix(ds.getDate()));
	dt = dt.replace(/h|H/g, this.Number2Fix(ds.getHours()));
	dt = dt.replace(/i|I/g, this.Number2Fix(ds.getMinutes()));
	dt = dt.replace(/s|S/g, this.Number2Fix(ds.getSeconds()));
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
 * GetDate: 根据时间对象获取当月天数
 * @param {object} date 
 */
export const GetDate = function(date) {
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
 * DatestrReduce: 日期做减法，返回时间戳
 * @param {string} d1 
 * @param {string} d2 
 */
export const DatestrReduce = function(d1, d2) {
	d1 = Str2Date(d1);
	d2 = Str2Date(d2);
	return Date.parse(d1) - Date.parse(d2);
}

/**
 * DatestrReduce: 日期做减法，返回时间戳
 * @param {object} d1 
 * @param {object} d2 
 */
export const DateReduce = function(d1, d2) {
	return Date.parse(d1) - Date.parse(d2);
}

/**
 * DateAferDays: 日期加上天数，返回日期对象
 * @param {object} date
 * @param {number} num
 */
export const DateAferDays = function(date, num) {
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
module.exports = {
  Date2Str,
  Str2Date,
  GetDate,
  DatestrReduce,
  DateReduce,
  DateAferDays
}