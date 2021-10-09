let CurrentPath = '/pages/index/index'

export const getCurrentPath = function() {
	return CurrentPath
}

export const setCurrentPath = function(url) {
	CurrentPath = url
}

export const jump = function(url, isReplace) {
	CurrentPath = url
	if (isReplace) {
		uni.redirectTo({
		    url: url
		});
	} else {
		uni.navigateTo({
		    url: url
		});
	}
}


export const jumpTab = function(url) {
	uni.switchTab({
	    url: url
	});
}