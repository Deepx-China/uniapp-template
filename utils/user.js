import Api from '../server/api.js'
import {
	getHost
} from './request.js'

let userinfo = false;

export const setUser = function (_userinfo) {
	userinfo = _userinfo
	return true
}

export const clearUser = function() {
	userinfo = false
	return true
}

export const getUser = async function() {
	if (userinfo) {
		return userinfo
	}
	let code = await _getAuthCode()
	if (!code) {
		uni.showModal({
			title: '登录失败',
			content: '请联系管理员400',
			showCancel: false,
		});
		return false;
	}
	userinfo = await _getUserinfo(code)
	if (!userinfo) {
		uni.showModal({
			title: '登录失败',
			content: '请联系管理员401',
			showCancel: false,
		})
		return false;
	}
	return userinfo
}

function _getAuthCode() {
	return new Promise((r, j) => {
		dd.getAuthCode({
			success: function(res) {
				r(res.authCode)
			},
			fail: function(err) {
				uni.showModal({
					title: '登录失败',
					content: '请联系管理员400',
					showCancel: false,
				});
				r(false)
			}
		});
	})
}

function _getUserinfo(code) {
	return new Promise((r, j) => {
		let origin = getHost()
		dd.httpRequest({
			url: origin + Api.Auth,
			data: {
				code: code
			},
			method: 'GET',
			success(res) {
				if (res.status != 200 || !res.data || res.data.status != 200) {
					uni.showModal({
						title: '登录失败',
						content: '请联系管理员402',
						showCancel: false,
					});
					r(false)
					return;
				}
				uni.getSystemInfo({
					success: sysinfo => {
						res.data.token = res.data.token
						res.data.platform = sysinfo.platform
						r(res.data)
					}
				})
			},
			fail(err) {
				console.log(err)
				r(false)
			}
		})
	})
}
