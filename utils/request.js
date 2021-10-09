import cache from './cache.js'
import mock from '../mock/index.js'
// import { getUser } from './user.js'

// const host = 'https://cloud.cn2030.com/sc'
const host = 'http://192.168.11.213:8080';
let token = ''

export const setToken = function () {
	cache.set('token', token)
}

export const getHost = function () {
	return host
}

export const post = function(url, data, options) {
	let userinfo = cache.get('userinfo')
	let header = {
		// "Authorization": "Bearer field"
		"Authorization": "Bearer office"
	}
	if (userinfo && userinfo.platform == 'ios') {
		header['cookie'] = 'ASP.NET_SessionId=' + userinfo.authcode
	}
	return new Promise((r, j) => 
	{
		uni.request({
			url: host + url,
			method: 'POST',
			data: JSON.stringify(data),
			header: {
				...header,
				"content-type": "application/json",
			},
			success(res) {
				if (res.statusCode == 401) {
					uni.showModal({
						title: '登录过期',
						content: '请重新进入小程序',
						showCancel: false,
						success: async() => {
							// await getUser();
							post(url, data, options).then(_r => {
								r(_r);
							});
						}
					})
					return
				}
				if (options && options.ignore) {
					r(res.data)
					return
				}
				if (res.statusCode != 200) {
					uni.showModal({
						title: '请求失败',
						content: res.errMsg,
						showCancel: false
					})
					return
				}
				r(res.data)
			},
			fail(err) {
				console.error(err)
				uni.showModal({
					title: '请求失败',
					content: typeof err == 'object' ? JSON.stringify(err) : err,
					showCancel: false,
					success: () => {
						r(false)
					}
				})
			},
			complete() {
				uni.hideLoading()
			}
		})
	})
}

export const get = function (url, options) {
	let data = options ? (options.params ? options.params : {}) : {}
	let header = {
		// "Authorization": "Bearer field"
		"Authorization": "Bearer office"
	}
	let dataType = options ? (options.dataType ? options.dataType : 'json') : 'json'
	if (options && options.header) {
		header = options.header
	}
	let userinfo = cache.get('userinfo')
	if (userinfo && userinfo.platform == 'ios') {
		header['cookie'] = 'ASP.NET_SessionId=' + userinfo.authcode
	}
	return new Promise((r, j) =>
	{
		// if (options.mock) {
		// 	r(mock[url].call(options.params));
		// 	return;
		// }
		
		if (!options || options.loading !== false) {
			uni.showLoading({
				title: '请求中...'
			})
		}
		uni.request({
			url: host + url,
			method: 'GET',
			data: data,
			dataType: dataType,
			header: {
				...header,
			},
			success(res) {
				if (res.statusCode == 401) {
					uni.showModal({
						title: '登录过期',
						content: '请重新进入小程序',
						showCancel: false,
						success: async() => {
							// await getUser();
							get(url, options).then(_r => {
								r(_r);
							});
						}
					})
					return
				}
				if (options && options.ignore) {
					r(res.data)
					return
				}
				if (res.statusCode != 200) {
					uni.showModal({
						title: '请求失败',
						content: res.errMsg,
						showCancel: false
					})
					r(false)
					return
				}
				r(res.data)
			},
			fail(err) {
				r(false)
			},
			complete() {
				if (!options || options.loading !== false) {
					uni.hideLoading()
				}
			}
		})
	})
}

export const upload = function(url, options) {
	return new Promise((r, j) => 
	{
		uni.uploadFile({
			url: host + url,
			...options,
			success(res) {
				if (res.statusCode != 200) {
					uni.showModal({
						title: '请求失败',
						content: '请求失败，错误码：' + res.statusCode,
						showCancel: false
					})
				} else if (options && options.ignore) {
					r(res.data)
					return
				} else if (res.data.status != 200) {
					uni.showModal({
						title: '请求失败',
						content: res.data.msg,
						showCancel: false
					})
					return
				}
				r(res.data)
			},
			fail(err) {
				r(false)
			},
			complete() {
				uni.hideLoading()
			},
		})
	})
}