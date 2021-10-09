export const getAuthCode = function() {
	return new Promise((r, j) => {
		dd.getAuthCode({
			success: function(res){
				r(res.authCode)
			},
			fail: function(err){
				r(false)
			}
		})
	})
}

module.exports = {
	getAuthCode,
}