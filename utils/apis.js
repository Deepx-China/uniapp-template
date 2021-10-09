module.exports = {
  getConferenceService: "/api/services/v1/conferenceService/Get",     //获取首页会议名称列表
  getTrips: "/api/services/v1/tripService/GetTrips",                  //获取少字段会议列表
  getTrip: "/api/services/v1/tripService/GetTrip",                    //获取多字段会议列表，详细信息
  getcustomerService: "/api/services/v1/customerService/Get",         //获取客户列表
  getstaffService: "/api/services/v1/staffService/GetCodeOrName",     //获取人员列表
  getTripByType: "/api/services/v1/tripService/GetTripByType",        //获取tab-2的数据列表
  CreateOrUpdate: "/api/services/v1/tripService/CreateOrUpdate",      //新增
  Permit: "/api/services/v1/tripService/Permit",                      //审批
  WithDraw: "/api/services/v1/tripService/WithDraw",                  //撤销
  Destroy: "/api/services/v1/tripService/Destroy",                    //取消参会
  Change: "/api/services/v1/tripService/Change",                      //变更
 }