const prfix = "zfsw_";

export default {
	set: function(name, data, expire) {
		let ts = Date.parse(new Date())
		uni.setStorageSync(prfix + '_' + name, JSON.stringify({
			data: data,
			expire: expire ? (ts + expire * 1000) : 0
		}))
	},
	get: function(name) {
		let data = uni.getStorageSync(prfix + '_' + name)
		if (!data || !JSON.parse(data)) {
			return null
		}
		data = JSON.parse(data)
		let ts = Date.parse(new Date())
		if (data.expire == 0) {
			return data.data
		}
		if (data.expire <= ts) {
			uni.removeStorageSync(prfix + '_' + name)
			return null
		}
		return data.data
	},
	del: function(name) {
		uni.removeStorageSync(prfix + '_' + name)
		return true
	},
}