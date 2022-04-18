import { getUser, clearUser } from './user.js'
import { warn } from './debug.js'
import { post, get, setToken, getHost, upload } from './request.js'
import { jump, jumpTab, getCurrentPath, setCurrentPath } from './router.js'
import {
	getFormate,
	Str2Date,
	Date2Str,
	GetDays,
	DateReduce,
	Number2Fix,
	GetNumberOfMonth,
} from './date.js'

import cache from './cache.js'


module.exports = { 
	getUser,
	clearUser,
	warn,
	jump,
	jumpTab,
	getFormate,
	Str2Date,
	Date2Str,
	GetDays,
	DateReduce,
	Number2Fix,
	GetNumberOfMonth,
	getCurrentPath, 
	setCurrentPath,
	post,
	get,
	setToken,
	getHost,
	upload,
	cache,
}