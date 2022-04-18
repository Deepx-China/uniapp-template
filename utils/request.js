import cache from './cache.js'
import {
	getUser,
	clearUser
} from './user.js'

let host = 'http://app.zhifeishengwu.com:1122'
// let host = 'http://192.168.11.2:8082'
let token = ''
let errTimes = 0;

export const setToken = function(_token) {
	token = _token
	cache.set('token', token)
}

export const getHost = function() {
	return host
}

export const post = async function(url, data, options, internal) {
	if (internal) {
		errTimes++;
	} else {
		errTimes = 0;
	}
	// 设置请求主机名
	let hostcache = cache.get('hostcache')
	if (hostcache && hostcache.url) {
		host = hostcache.url
	}
	let userinfo = await getUser();
	let header = {}
	if (options && options.header) {
		header = options.header
	}
	header['token'] = userinfo.token;
	return new Promise((r, j) => {
		dd.httpRequest({
			url: host + url,
			method: 'POST',
			data: JSON.stringify(data),
			headers: {
				...header,
				"Content-Type": "application/json",
			},
			dataType: 'json',
			success: async function(res) {
				if (res.status != 200) {
					uni.showModal({
						title: '请求失败',
						content: '请求失败，错误码：' + res.status,
						showCancel: false
					})
				} else if (options && options.ignore) {
					r(res.data)
					return
				} else if (res.data.status == 408) {
					if (errTimes < 2) {
						clearUser();
						userinfo = await getUser();
						if (userinfo && userinfo.statusCode) {
							post(url, data, options, true).then(_r => {
								r(_r);
							});
							return;
						}
					}
					r(false)
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

export const get = async function(url, options, internal) {
	if (internal) {
		errTimes++;
	} else {
		errTimes = 0;
	}
	let data = options ? (options.params ? options.params : {}) : {}
	let header = {}
	let dataType = options ? (options.dataType ? options.dataType : 'json') : 'json'
	if (options && options.header) {
		header = options.header
	}
	let userinfo = await getUser()
	header['token'] = userinfo.token;
	return new Promise((r, j) => {
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
			success: async function(res) {
				if (res.statusCode != 200) {
					uni.showModal({
						title: '请求失败',
						content: '请求失败，错误码：' + res.statusCode,
						showCancel: false
					})
					r(false)
					return
				}
				if (options && options.ignore) {
					r(res.data)
					return
				}
				if (res.data.status == 408) {
					if (errTimes < 2) {
						clearUser();
						userinfo = await getUser();
						if (userinfo && userinfo.statusCode) {
							get(url, options, true).then(_r => {
								r(_r);
							});
							return;
						}
					}
					r(false)
					return
				}
				if (res.data.status != 200) {
					uni.showModal({
						title: '请求失败',
						content: res.data.msg,
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
	// 设置请求主机名
	let hostcache = cache.get('hostcache')
	if (hostcache && hostcache.url) {
		host = hostcache.url
	}
	return new Promise((r, j) => {
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


const getsysinfo = function() {
	return new Promise((r, j) => {
		uni.getSystemInfo({
			success: res => {
				r(res);
			}
		})
	});
}
