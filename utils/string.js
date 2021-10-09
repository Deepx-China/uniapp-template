/**
 * Number2Fix: 不足两位数的数字补零
 * @param n 
 */
export const Number2Fix = function(n) {
	let rs = n < 10 ? "0" + n : n;
	return rs.toString();
}