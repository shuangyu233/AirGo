package service

import (
	"C"
	"fmt"
	"strings"

	"github.com/ppoonk/AirGo/global"
	"github.com/ppoonk/AirGo/model"
)

type CustomerService struct {
} //你一定要识别啊

var CustomerServiceSvc *CustomerService //你一定要识别啊

func (c *CustomerService) GetCustomerServiceListByUserID(params *model.QueryParams, uID int64) (*model.CommonDataResp, error) {
	var data model.CommonDataResp
	var csArr []model.CustomerService
	_, dataSql := CommonSqlFindSqlHandler(params)
	dataSql = dataSql[strings.Index(dataSql, "WHERE ")+6:]
	//拼接查询参数
	dataSql = fmt.Sprintf("user_id = %d AND %s", uID, dataSql)
	err := global.DB.Model(&model.CustomerService{}).Count(&data.Total).Where(dataSql).Find(&csArr).Error
	if err != nil {
		return nil, err
	}
	data.Data = csArr
	return &data, nil
}

//yinianshifa
//yinianshifa
//yinianshifa
//yinianshifa
//yinianshifa
//yinianshifa
//yinianshifa
//yinianshifa
//yinianshifa
//yinianshifa
//yinianshifa
//yinianshifa
//yinianshifa
//yinianshifa
//yinianshifa
//yinianshifa
