<template>
  <div class="personal layout-pd">
    <h2 style="margin-left: 0.2em;margin-bottom: 0.7em; color: var(--el-text-color-primary);">{{$t('message.home.overview')}}</h2>

    <el-card style="border-radius: 10px;margin-left: 0.2em;margin-right: 0.2em;word-break: break-all;">

          <el-col :span="80" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <h3 style="font-size: large;margin-left: 0.2em;margin-right: 0.2em;margin-bottom: 0.5em;margin-top: 0.5em;"> {{ currentTime }} , {{ userInfos.nick_name }}：</h3>
            <el-row :gutter="15" align="top">

            <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">

            <el-card style="margin-top: 1em; border-radius: 10px;height: 6.5em;">
              <i class="ri-group-3-line" style="font-size: 20px;"></i>
              <el-text size="large" style="margin-left: 10px;">{{$t('message.home.my_invited')}} : {{ financeStoreData.commissionSummary.value.total_invitation }}          
                 <el-button  style="margin: 0.5em;font-size: 1em;width: auto;height: auto;"icon="CopyDocument"  round @click="copyText(state_invite.text);">{{$t('message.home.invite_url')}}</el-button>
               </el-text>
            </el-card>
            </el-col>
            <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">

            <el-card style="margin-top: 1em;margin-bottom: 1em; border-radius: 10px;height: 6.5em;">
              <i class="ri-list-unordered" style="font-size: 20px;"></i>
              <el-text size="large" style="margin-left: 10px;height: 100%;">{{ $t("message.ticket.total_ticket") }} : {{ ticketStoreData.userTicketList.value.total }}
                <el-button style="margin: 0.5em;font-size: 1em;width: auto;height: auto;"icon="Service"  round @click="reject_ticket"> 前往工单中心</el-button>
              </el-text>
            </el-card>
            </el-col>
            </el-row>
            <h2 style="margin:0.2em ;">欢迎使用風嶼Link‍(=・ω・=)～ <br>使用前请先查看 <a href="/#/documents" class="ri-article-line"> 使用文档</a><a class="ri-telegram-fill" style="margin-left: 1em;" href="https://t.me/FYLink_Group"> 加入tg群组</a></h2>
            <!--
            <el-text size="large" style="margin-left:0.2em ;">自定义内容自定义内容自定义内容自定义内容自定义内容自定义内容自定义内容</el-text>-->
          </el-col>

    </el-card>

    <el-divider />

    <h2 style="margin-left: 0.2em;margin-bottom: 0.7em;color: var(--el-text-color-primary);">{{$t('message.home.my_subscribe')}}</h2>
    <el-card style="border-radius: 10px;margin: 0.2em" v-if="customerServiceStoreData.customerServiceList.value.length === 0">
        <el-skeleton :rows="2" animated />
        <h2>{{$t('message.home.no_data')}}        <el-button style="margin: 0.5em;font-size: 0.8em;width: auto;height: auto;"icon="Link"  round @click="gotostore">{{$t('message.home.button_gotostore')}}</el-button>
</h2>

    </el-card>
    <el-row :gutter="8.5">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"
              v-for="(v, k) in customerServiceStoreData.customerServiceList.value" :key="k">
         <el-card style="margin-left: 0.2em;margin-right: 0.2em;margin-bottom: 1.15em;border-radius: 10px;">
            <div style="text-align: right;color: #9b9da1;font-size: 10px">
              <span>ID: </span><span>{{v.id}}</span>
            </div>
            <div style="margin-bottom: 10px;font-size: 20px;font-weight: bolder">{{ v.subject }}</div>
            <el-descriptions
              :column="4"
              border
              size="small"
              direction="vertical"
            >
              <el-descriptions-item :label="$t('message.home.des_start')"><span style="font-size: 10px">{{ DateStrToTime(v.service_start_at) }}</span></el-descriptions-item>
              <el-descriptions-item :label="$t('message.home.des_end')"><span style="font-size: 10px">{{ DateStrToTime(v.service_end_at) }}</span></el-descriptions-item>
              <el-descriptions-item :label="$t('message.home.des_SubStatus')">
                <el-icon v-if="v.sub_status" color="green" size="large">
                  <SuccessFilled />
                </el-icon>
                <el-icon v-else color="red" size="large">
                  <CircleCloseFilled />
                </el-icon>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('message.home.des_renewAmount')">{{ v.renewal_amount }}</el-descriptions-item>
              <el-descriptions-item :label="$t('message.home.des_trafficResetDay')">{{ v.traffic_reset_day }}</el-descriptions-item>
              <el-descriptions-item :label="$t('message.home.des_used')">
                <span style="font-size: 10px">{{ ((v.used_up + v.used_down) / 1024 / 1024 / 1024).toFixed(2) }}GB / {{ (v.total_bandwidth / 1024 / 1024 / 1024).toFixed(2)
                  }}GB</span>
              </el-descriptions-item>
              <el-descriptions-item :label="$t('message.home.des_usageRate')">
                <el-progress
                  :color="customColors"
                   striped
                   striped-flow
                  :text-inside="true" :stroke-width="16"
                  :percentage="Number((((v.used_up + v.used_down)/v.total_bandwidth)*100).toFixed(2)) ">
                </el-progress>
              </el-descriptions-item>
            </el-descriptions>
          <div style="margin-top: 15px;display: flex">
            <el-button size="small" type="primary" @click="openSubDialog(v.sub_uuid)" round>{{$t('message.home.button_openOneClickImport')}}</el-button>
            <el-button size="small" type="success" @click="renew(v)" round>{{$t('message.home.button_renew')}}</el-button>
            <el-dropdown style="margin-left: auto">
              <span class="el-dropdown-link">
                <el-button size="small" round>{{$t('message.home.button_more')}}<el-icon class="el-icon--right"><arrow-down /></el-icon></el-button>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="openDialogCustomerServiceDetails(v.id)">
                    {{$t('message.home.button_details')}}
                  </el-dropdown-item>
                  <el-dropdown-item @click="openPushDialog(v)">
                  {{$t('message.home.button_push')}}
                  </el-dropdown-item>
                  <el-dropdown-item @click="resetSubscribeUUID(v)">
                    {{$t('message.home.button_resetSub')}}
                  </el-dropdown-item>
                  <el-dropdown-item @click="deleteCustomerService(v)">
                    {{ $t('message.common.delete') }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>

        </el-card>
      </el-col>
    </el-row>
    <!--    复制订阅弹窗-->
    <el-dialog v-model="state.isShowSubDialog" destroy-on-close width="600px" >
      <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">{{$t('message.home.button_openOneClickImport')}}</h4>
      </div>
    </template>
    <el-row class="image">
        <el-col v-for="(v,k) in state.subClient" :key="k" class="block"
                :xs="8" :sm="8" :md="4" :lg="4" :xl="4"
                @click="insert(v.name)"
        >
          <el-image style="width: 50px; height: 50px" :src="v.logo" fit="fill" />
          <span class="name">{{ v.name }}</span>
        </el-col>
      </el-row>
      <div class="mb10" style="margin-top: 1em;">
        <el-button size="large" color="var(--el-color-primary)" style="width: 100%" @click="copyText(getSubUrl())">
          <el-icon><Link /></el-icon>{{$t('message.home.subscription')}}
        </el-button>
      </div>
      <div>
        <el-button class="mb10" size="large" color="var(--el-color-primary)" style="width: 100%" @click="showQR()">
          <el-icon><FullScreen /></el-icon>
          {{$t('message.home.scan_qr_subscription')}}
        </el-button>
      </div>
      <h4 style="text-align: end;text-decoration: underline;" @click="openSelectSubURL"><i class="ri-question-line"></i> {{$t('message.home.import_questions1')}}</h4>
      <el-dialog v-model="state.isShowSelectSubURL" destroy-on-close width="400px">
        <template #header="{ close, titleId, titleClass }">
          <div class="my-header">
            <h4 :id="titleId" :class="titleClass"><i class="ri-question-line"></i> {{$t('message.home.import_questions1')}}</h4>
           </div>
         </template>
         <h4 class="mb20">使用前请先查看 <a href="/#/documents" class="ri-article-line"> 使用文档</a></h4>
         <h4>如提示网络错误，请尝试更改订阅地址：</h4>
         <h5>*更改完毕后，请点击右上角关闭按钮后并重试导入</h5>
         <el-select v-model="state.currentSubUrlPre" style="margin-top: 0.5em;margin-bottom: 1em;">
          <el-option
            v-for="item in state.subUrlPre"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <h4 style="margin-top: 1.2em;">还有其它问题？   请  <a class="ri-customer-service-2-line" href="/#/ticket">上报工单</a>  或 前往  <a class="ri-telegram-fill" href="https://t.me/FYLink_Group">群组</a></h4>

      </el-dialog>
    </el-dialog>
    <!-- 二维码弹窗 -->
    <el-dialog v-model="state.isShowQRDialog" destroy-on-close align-center :show-close="false" width="340px">
        <div id="qrcode" class="qrcode" ref="qrcodeRef"></div>
    </el-dialog>
    <!--    push弹窗-->
    <el-dialog v-model="state.isShowPushDialog" destroy-on-close align-center width="400px">
      <template #header>
        <h3>Push</h3>
    </template>
      <div>
        <el-form :model="customerServiceStoreData.pushCustomerServiceRequest.value" label-position="top">
          <h4>{{$t('message.home.target_username')}}:</h4>
          <h5 style="margin-bottom: 0.5em;">*您可以通过此操作将您的套餐Push到其它的用户中</h5>
          <el-form-item>
            <el-input v-model="customerServiceStoreData.pushCustomerServiceRequest.value.to_user_name" disabled placeholder="正在开发完善中...敬请期待！"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closePushDialog">{{$t('message.common.button_cancel')}}</el-button>
          <el-button type="primary" @click="toPush" disabled id="push_button">{{$t('message.common.button_confirm')}}</el-button>
        </div>
      </template>

    </el-dialog>
    <!--    续费弹窗-->
    <Purchase ref="PurchaseRef"></Purchase>
    <!--    详情弹窗-->
    <DialogCustomerServiceDetails ref="DialogCustomerServiceDetailsRef"></DialogCustomerServiceDetails>
<!--    默认弹窗-->
    <DefaultDialog ref="DefaultDialogRef"></DefaultDialog>
  </div>

</template>

<script setup lang="ts">
import { onMounted, reactive, ref, defineAsyncComponent,computed } from "vue";
import { useApiStore } from "/@/stores/apiStore";
import { DateStrToTime } from "/@/utils/formatTime";
import commonFunction from "/@/utils/commonFunction";
import { usePublicStore } from "/@/stores/publicStore";
import { storeToRefs } from "pinia";
import QRCode from "qrcodejs2-fixes";
import { useCustomerServiceStore } from "/@/stores/user_logic/customerServiceStore";
import { ElMessage, ElMessageBox } from "element-plus";
import { v4 as uuid } from 'uuid';
import { useShopStore } from "/@/stores/user_logic/shopStore";
import { useConstantStore } from "/@/stores/constantStore";
import { useI18n } from "vue-i18n";
import { useArticleStore } from "/@/stores/user_logic/articleStore";
import { formatAxis } from "/@/utils/formatTime";
import { useUserStore } from "/@/stores/user_logic/userStore";
import { useFinanceStore } from "/@/stores/user_logic/financeStore";
import { getCurrentAddress } from "/@/utils/request";
import {useTicketStore} from "/@/stores/user_logic/ticketStore";
import logo_shadowrocket from "/@/assets/img/logo-shadowrocket.jpeg"
import logo_clash_meta from "/@/assets/img/logo-clash-meta.png"
import logo_clash_verge from "/@/assets/img/logo-clash-verge.png"
import logo_clashx from "/@/assets/img/logo-clashx.png"
import logo_surge from "/@/assets/img/logo-surge.png"
import logo_nekobox from "/@/assets/img/logo-nekobox.jpeg"

const articleStore = useArticleStore()
const constantStore = useConstantStore()
const shopStore = useShopStore()
const shopStoreData = storeToRefs(shopStore)
const apiStore = useApiStore();
const publicStore = usePublicStore();
const publicStoreData = storeToRefs(publicStore);
const customerServiceStore = useCustomerServiceStore();
const customerServiceStoreData = storeToRefs(customerServiceStore);
const ticketStore = useTicketStore()
const ticketStoreData = storeToRefs(ticketStore)
const userStore = useUserStore();
const { userInfos, } = storeToRefs(userStore);
const financeStore = useFinanceStore()
const financeStoreData = storeToRefs(financeStore)
const { copyText } = commonFunction();
const {t} = useI18n()
const qrcodeRef = ref();

//组件
const DialogCustomerServiceDetails = defineAsyncComponent(() => import("/@/views/home/dialog_customer_service_details.vue"));
const DialogCustomerServiceDetailsRef = ref();
const Purchase = defineAsyncComponent(() => import("/@/views/shop/purchase.vue"));
const PurchaseRef = ref();
const DefaultDialog = defineAsyncComponent( () => import('/@/views/default/defaultDialog.vue'));
const DefaultDialogRef = ref();

const state = reactive({
  isShowOneClickImport:false,
  isShowSubDialog: false,
  isShowSelectSubURL: false,
  isShowPushDialog: false,
  isShowQRDialog: false,
  subType: ["NekoBox", "v2rayNG", "v2rayN", "Shadowrocket", "Clash", "Surge", "Quantumult", "V2rayU"],
  subClient: [
    {name:"Shadowrocket",logo:logo_shadowrocket},
    {name:"ClashX",logo:logo_clashx},
    {name:"Clash Verge Rev",logo:logo_clash_verge},
    {name:"Clash Meta For Android",logo:logo_clash_meta},
    {name:"Surge",logo:logo_surge},
    {name:"NekoBox",logo:logo_nekobox},
  ],
  currentSubUUID: "",
  QRcode: null,
  subUrlPre:[''],
  currentSubUrlPre:'',
  currentSubPath:'/api/public/sub/',
});
const state_invite = reactive({
  text: getCurrentAddress()+"/#/login?aff="+userInfos.value.invitation_code,
  tabName: "1",
  queryParams: {
    table_name: "balance_statement",
    pagination: {
      page_num: 1, page_size: 30, order_by: "id DESC"
    } as Pagination//分页参数
  } as QueryParams,
});


const state_ticket = reactive({
  isShowTicketDialog:false,
  queryParams:{
    table_name: 'ticket',
    field_params_list: [
      { field: 'id', field_chinese_name: '', field_type: '', condition: '<>', condition_value: '', operator: '', }
    ] as FieldParams[],
    pagination: { page_num: 1, page_size: 30, order_by: 'id DESC',
    } as Pagination,//分页参数
  },

})

const customColors = [
  { color: "#9af56c", percentage: 20 },
  { color: "#5cb87a", percentage: 40 },
  { color: "#f8c67e", percentage: 60 },
  { color: "#ff785a", percentage: 80 },
  { color: "#fa193b", percentage: 100 }
];
// 获取列表
const getCustomerServiceList = () => {
  customerServiceStore.getCustomerServiceList();
};
const getPublicSetting = () => {
  publicStore.getPublicSetting();
};
const currentTime = computed(() => {
  return formatAxis(new Date());
});

const getCommissionSummary=()=>{
  financeStore.getCommissionSummary()
}

const getUserTicketList = () => {
  ticketStore.getUserTicketList(state_ticket.queryParams)
}

const openSubDialog = (subUUID: string) => {
  state.isShowSubDialog = true;
  state.currentSubUUID = subUUID.replace(/-/g, "");
  state.subUrlPre = publicStoreData.publicSetting.value.backend_url.split('\n')
  state.currentSubUrlPre = state.subUrlPre[0] //设置默认的订阅前缀
};
const openSelectSubURL= (subUUID: string) => {
  state.isShowSelectSubURL = true,
  state.currentSubUrlPre = state.subUrlPre[0] //设置默认的订阅前缀

};

const openPushDialog = (cs: CustomerService) => {
  state.isShowPushDialog = true;
  customerServiceStoreData.pushCustomerServiceRequest.value.customer_service_id = cs.id;

}
const deleteCustomerService = (cs: CustomerService) => {
  ElMessageBox.confirm(t('message.common.message_confirm_delete'), t('message.common.tip'), {
    confirmButtonText: t('message.common.button_confirm'),
    cancelButtonText: t('message.common.button_cancel'),
    type: 'warning',
  })
      .then(() => {
        customerServiceStore.deleteCustomerService({id: cs.id} as CustomerService).then(() => {
          getCustomerServiceList();
        })
      })
      .catch(() => {
        ElMessage({
        type: 'info',
        message: 'Cancel 已取消',
      })
      });
}
const closePushDialog = () => {
  state.isShowPushDialog = false;
};
const toPush = () => {
  customerServiceStore.pushCustomerService().then((res) => {
    ElMessage.success(res.msg)
    getCustomerServiceList()
    closePushDialog();
  });
};
const renew=(cs:CustomerService)=>{
  //保存用户服务
  customerServiceStoreData.customerService.value = cs
  //构造订单数据。需要3个参数，user_id，order_type，customer_service_id。
  // user_id由后端自动填充，前端传customer_service_id，order_type
  shopStoreData.currentOrder.value = {
    order_type:constantStore.ORDER_TYPE_RENEW,
    customer_service_id:cs.id,
  } as Order

  PurchaseRef.value.openDialog(constantStore.ORDER_TYPE_RENEW);
}
const resetSubscribeUUID=(cs:CustomerService)=>{
  ElMessageBox.confirm(t('message.home.message_confirm_reset_sub'),t('message.common.tip'),
  {
    confirmButtonText: t('message.common.button_confirm'),
    cancelButtonText: t('message.common.button_cancel'),
    type: 'warning',

  })
    .then(() => {
      customerServiceStore.resetSubscribeUUID({id:cs.id,sub_uuid:uuid()} as CustomerService).then((res)=>{
        ElMessage.success(res.msg)
        getCustomerServiceList()
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Cancel 已取消',
      })
    });
}
const showQR = (subType?: string) => {
  state.isShowQRDialog = true
  setTimeout(()=>{
    //清除上一次二维码
    qrcodeRef.value.innerHTML = "";
    new QRCode(qrcodeRef.value, {
      text: getSubUrl(subType),
      width: 300,
      height: 300,
      colorDark: "#000000",
      colorLight: "#ffffff",
    });

  },500)

};
const getSubUrl=(subType?: string)=>{
  let url:string = state.currentSubUrlPre + state.currentSubPath + state.currentSubUUID+"/"
  url = url+ encodeURI(publicStoreData.publicSetting.value.sub_name || 'AirGo')
  if (subType){
    url = url+("?type=" + subType)
  }
  return url
}
const insert=(subType?: string)=>{
  switch (subType) {
    case "Shadowrocket":
      const subName = publicStoreData.publicSetting.value.sub_name || 'AirGo'
      window.location.href = "shadowrocket://add/sub://"+ window.btoa(getSubUrl())+"?remark="+encodeURI(subName)
      break
    case "NekoBox":
    case "ClashX":
    case "Clash Verge":
    case "Clash Meta":
      window.location.href = "clash://install-config?url=" + getSubUrl()
      break
    case "Surge":
      window.location.href = "surge://install-config?url=" + getSubUrl()
      break
  }
}
const openDialogCustomerServiceDetails = (customerServiceID:number) => {
  DialogCustomerServiceDetailsRef.value.openDialog(customerServiceID);
};
const defaultArticle=()=>{
  articleStore.getDefaultArticles().then(()=>{
    setTimeout(()=>{
      DefaultDialogRef.value.openDialog()
    },1000)
  })
}


onMounted(() => {
  getCustomerServiceList();
  getPublicSetting();
  defaultArticle()

  getCommissionSummary()
  getUserTicketList()
});

const gotostore = () =>{
  window.location.href = "/#/shop" 
}

const reject_ticket = () =>{
  window.location.href = "/#/ticket" 
}

</script>

<style scoped lang="scss">
.image {
  margin-top: 0.5em;
}
.image .block {
  margin-bottom: 7px;
  text-align: center;
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}
.image .name {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 12px;
}
.dialog {
:deep(.el-dialog) {
  box-shadow: 0 0px 0px rgb(0 0 0 / 0%);
  background: transparent;
}
}
</style>
<style>

</style>