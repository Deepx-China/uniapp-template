var districts = require('./districts');
var showDect = {} 
var total = {}

var special = ['重庆市', '上海市','北京市','天津市','台湾省','香港特别行政区','澳门特别行政区']


function onMessage(msg, cb) {
  switch(msg.theme) {
    case 'getcity':
      cb({
        theme: 'getcity', 
        data: get(msg.data)
      })
      break
    case 'findcity':
      cb({
        theme: 'findcity', 
        data: find(msg.data)
      })
      break
    case 'findcitycode':
      cb({
        theme: 'findcitycode', 
        data: findcode(msg.data)
      })
      break
    case 'detailcity':
      cb({
        theme: 'detailcity',
        data: detail(msg.data)
      })
      break
  }
}

function get(data) {
  let height = 0
  let itemHeight = Math.ceil(56 / 414 * data.driveWidth)
  let matchData = {}
  Object.keys(districts).forEach(capK => {
    let cap = districts[capK]
    let isAdd = false
    height += itemHeight
    Object.keys(cap).forEach(adcodeK => {
      //匹配城市信息
      if (data.code * 1 === cap[adcodeK].adcode * 1) {
        matchData = cap[adcodeK]
      }
      //组装城市列表
      if (cap[adcodeK].level != 'district') {
        showDect[capK] = showDect[capK] ? showDect[capK] : {}
        showDect[capK][adcodeK] = showDect[capK][adcodeK] ? showDect[capK][adcodeK] : {}
        showDect[capK][adcodeK] = cap[adcodeK]
        height += itemHeight
        isAdd = true
      }
    })
    if (isAdd) {
      total[capK] = height
    }
  })
  return {
    list: showDect,
    total: total,
    matchData: matchData
  }
}

function find(name) {
  let match = []
  Object.keys(districts).forEach(capK => {
    let cap = districts[capK]
    Object.keys(cap).forEach(adcodeK => {
      if (cap[adcodeK].name.indexOf(name) !== -1) {
        match.push(cap[adcodeK])
      }
    })
  })
  return match
}

function findcode(code) {
  let match = {}
  Object.keys(districts).forEach(capK => {
    let cap = districts[capK]
    Object.keys(cap).forEach(adcodeK => {
      if (cap[adcodeK].adcode *1 === code * 1) {
        match = cap[adcodeK]
      }
    })
  })
  return match
}


function detail(res) {
  let code = res.code
  let pcode = res.pCode
  let match = {}
  try{
    Object.keys(districts).forEach(capK => {
      let cap = districts[capK]
      Object.keys(cap).forEach(adcodeK => {
        if (adcodeK == code) {
          match = cap[adcodeK]
          throw('找到了')
        } 
      })
    })
  } catch(err){}
  if (!match.center) {
    try{
      Object.keys(districts).forEach(capK => {
        let cap = districts[capK]
        Object.keys(cap).forEach(adcodeK => {
          if (adcodeK == pcode) {
            match = cap[adcodeK]
            code = pcode
            throw('找到了')
          } 
        })
      })
    } catch(err){}
  }
  let center = match.center.split(',')
  if (!match.center) {
    return false
  }
  return {
    lat: center[1] * 1,
    lng: center[0] * 1,
    region: makeDetial(match),
    name: match.name,
    code: code,
    detail: match
  }
}


function makeDetial(resouce, region=['','','']) {
	if (resouce.level == 'district') {
		region[2] = resouce.name
	} else if(resouce.level == 'city') {
		region[1] = resouce.name
	} else if(resouce.level == 'province'){
		region[0] = resouce.name
	if (special.includes(resouce.name)) {
		region[1] = resouce.name
	}
	}
	if (resouce.parent.name) {
		makeDetial(resouce.parent, region)
	}
	return region
}

module.exports = {
  get,
  find,
  detail,
  findcode,
  onMessage
}