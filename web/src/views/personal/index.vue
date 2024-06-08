<template>
  <div class="personal layout-pd ">
      <!-- 个人信息 -->
        
        <center>
          <div style="margin-top: 4em;" class="card">
    <div class="imgBx">
      <img :src="userInfos.avatar">
    </div>
    <div class="content">
      <div class="details">
        <h2 class="h2">{{ currentTime }}<br><span>{{ userInfos.nick_name }}</span></h2><br>
        <div class="data">
          <br><br><br>
        </div>
        <div class="actionBtn">
          <br><br>
        </div>
      </div>
    </div>
  </div>        </center>
  <div>
    <el-divider border-style="dotted"/>

  <el-row :gutter="30">
    <el-col :xs="24" :sm="12">
        <div class=" border-radius" style="margin-top: 3em;margin-left: 1em;margin-right: 1em;"><!--min-height: 25em;-->
          
           <h3 style="color: var(--el-text-color-primary);"><i class="ri-chat-settings-line"></i> {{$t('message.personal.message_setting')}}</h3>

          <!--<el-divider content-position="left"><span>{{ $t("message.personal.push_setting") }}</span>
          </el-divider>-->
          <!--<el-text class="mx-1">{{ $t("message.adminServer.Server.push_method") }} :</el-text>-->
          <el-collapse style="margin-top: 1em;" v-model="activeNames">

          <el-collapse-item name="1">
            <template #title>
              <h4><i class="ri-telegram-fill"></i> Telegram提醒</h4>
            </template>
          <el-form :model="userInfos" label-width="100px"
                   label-position="left">
            <el-form-item :label="$t('message.adminServer.Server.enable_tg_bot')" class="label">
              <el-switch v-model="userInfos.enable_tg_bot" inline-prompt
                         :active-text="$t('message.common.enable')"
                         :inactive-text="$t('message.common.disable')"
                         style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"></el-switch>
            </el-form-item>
            <el-form-item :label="$t('message.adminUser.SysUser.tg_id')" class="label">
              <el-input v-model.number="userInfos.tg_id" placeholder="请输入您的数字id"/>
            </el-form-item>
            <el-divider content-position="left"><span>{{ $t("message.adminServer.Server.trigger_condition") }}</span>
            </el-divider>
            <el-form-item :label="$t('message.adminUser.SysUser.when_service_almost_expired')" class="label">
              <el-switch v-model="userInfos.when_service_almost_expired" inline-prompt
                         :active-text="$t('message.common.enable')"
                         :inactive-text="$t('message.common.disable')"
                         style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"></el-switch>
            </el-form-item>
            <el-form-item :label="$t('message.adminUser.SysUser.when_purchased')" class="label">
              <el-switch v-model="userInfos.when_purchased" inline-prompt
                         :active-text="$t('message.common.enable')"
                         :inactive-text="$t('message.common.disable')"
                         style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"></el-switch>
            </el-form-item>
            <el-form-item :label="$t('message.adminUser.SysUser.when_balance_changed')" class="label">
              <el-switch v-model="userInfos.when_balance_changed" inline-prompt
                         :active-text="$t('message.common.enable')"
                         :inactive-text="$t('message.common.disable')"
                         style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"></el-switch>
            </el-form-item>
            <el-form-item style="margin-top: 20px">
              <el-button @click="onSubmitForNotice()" type="primary" style="margin-left: auto">{{ $t("message.common.button_confirm") }}
              </el-button>
            </el-form-item>

          </el-form>
          </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12">
        <div class="personal-edit border-radius" style="margin-top: 3em;margin-left: 1em;margin-right: 1em;"> <!--min-height: 25em;-->
          <h3 style="color: var(--el-text-color-primary);"><i class="ri-account-box-line"></i> {{$t('message.personal.account_setting')}}</h3>
          <el-button style="margin-top: 1.2em;" type="primary" :disabled="!publicStoreData.publicSetting.value.enable_lottery" @click="lottery">{{ $t("message.personal.lottery") }}</el-button>
          <h4 style="margin-top: 1.2em;color: var(--el-text-color-primary);">绑定邮箱 : {{ userInfos.nick_name }}</h4>
          <h4 style="margin-top: 1em;color: var(--el-text-color-primary);">{{$t('message.personal.login_password')}} :                 <el-button type="primary" @click="state.isShowChangePasswordDialog = true">{{$t('message.common.modify')}}</el-button>
          </h4>
          <h4 style="margin-top: 1em;color: var(--el-text-color-primary);">修改头像 : <el-button type="primary" @click="state.isShowChangeAvatarDialog = true">修改头像</el-button></h4>
          <!--<i style="font-size: 20em;position: relative;" class="ri-account-circle-line"></i>-->
        </div>
      </el-col>
  </el-row>
</div>





    <el-dialog v-model="state.isShowChangePasswordDialog" :title="$t('message.personal.change_password')" width="500px" destroy-on-close>
      <el-form size="default" label-position="left">
        <el-form-item :label="$t('message.personal.new_password')">
          <el-input v-model="registerData.password":placeholder="$t('message.personal.please_enter_password')" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.personal.confirm_password')">
          <el-input v-model="registerData.re_password" :placeholder="$t('message.personal.please_enter_password')" clearable></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
				<span class="dialog-footer">
					<el-button @click="state.isShowChangePasswordDialog = false" size="default">{{$t('message.common.button_cancel')}}</el-button>
					<el-button type="primary" @click="changePassword" size="default">{{$t('message.common.button_confirm')}}</el-button>
				</span>
      </template>
    </el-dialog >
    <el-dialog v-model="state.isShowChangeAvatarDialog" :title="$t('message.personal.modify_avatar')" width="500px" destroy-on-close>
      <el-form size="default" label-position="left">
        <el-form-item :label="$t('message.personal.avatar_link')">
          <el-input v-model="userAvatar.avatar"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
				<span class="dialog-footer">
					<el-button @click="state.isShowChangeAvatarDialog = false" size="default">{{$t('message.common.button_cancel')}}</el-button>
					<el-button type="primary" v-preReClick @click="changeAvatar" size="default">{{$t('message.common.button_confirm')}}</el-button>
				</span>
      </template>
    </el-dialog>

    <div class="dialog">
      <el-dialog  v-model="state.isShowLotteryDialog" destroy-on-close width="350px">
        <LuckyWheel
          ref="myLuckyRef"
          width="300px"
          height="300px"
          :prizes="state.lotteryData.prizes"
          :blocks="state.lotteryData.blocks"
          :buttons="state.lotteryData.buttons"
          @start="startCallback"
          @end="endCallback"
        />
      </el-dialog>
    </div>


  </div>
</template>

<script setup lang="ts">
import { computed, reactive,ref } from "vue";
import { formatAxis } from "/@/utils/formatTime";
import { useUserStore } from "/@/stores/user_logic/userStore";
import { storeToRefs } from "pinia";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import { usePublicStore } from "/@/stores/publicStore";
import { useI18n } from "vue-i18n";
import giftIcon  from "/@/assets/icon/gift.svg"

const userStore = useUserStore();
const { userInfos, registerData, userAvatar } = storeToRefs(userStore);

const publicStore = usePublicStore();
const publicStoreData = storeToRefs(publicStore);
const myLuckyRef = ref()
const {t} = useI18n()



const state = reactive({
  isShowChangePasswordDialog: false,
  isShowChangeAvatarDialog: false,
  isShowLotteryDialog:false,
  lotteryData:{
    blocks: [{ padding: '13px', background: '#617df2' }],
    prizes: [
      { background: '#e9e8fe', imgs: [{ src: '', width: '20%', top: '40%' }], fonts:[{ text: '0000', top: '10%' }]}
    ],
    buttons: [{
      radius: '35%',
      background: '#8a9bf3',
      pointer: true,
      fonts: [{ text: 'Go', top: '-10px' }]
    }],
  },
  prizeImg:{
    src: giftIcon,
    width: '20%',
    top: '40%'
  },
});
//设置奖池
const setJackpot=()=>{
  state.lotteryData.prizes = []
  publicStoreData.publicSetting.value.jackpot.forEach((value: JackpotItem, index: number, array: JackpotItem[])=>{
    let background = '#e9e8fe'
    if(index%2 === 0){
      background = '#b8c5f2'
    }
    state.lotteryData.prizes.push({imgs: [state.prizeImg], fonts: [{ text: '+ '+value.balance.toString(), top: '10%' }],  background: background })
  })
}

//开始抽奖
const startCallback =() =>{
  // 调用抽奖组件的play方法开始游戏
  userStore.clockIn().then((res)=>{
    myLuckyRef.value.play()
    const index = res.data.data //res.data 格式： {"total":1,"data":1}
    myLuckyRef.value.stop(index)
    userStore.getUserInfo()
  }).then(()=>{

  })
}
// 抽奖结束会触发end回调
const endCallback =(prize:any)=> {
  state.isShowLotteryDialog = false
  ElMessageBox.alert(t('message.personal.balance')+prize.fonts[0].text, t('message.personal.congratulations'), {
    confirmButtonText: 'OK',
  })
}

// 当前时间提示语
const currentTime = computed(() => {
  return formatAxis(new Date());
});


const changePassword = () => {
  userStore.changePassword().then(() => {
  });
  state.isShowChangePasswordDialog = false;
};
const changeAvatar = () => {
  userStore.changeAvatar().then(() => {
    userStore.setUserNotice().then((res) => {
      ElNotification({
      title: '修改成功',
      message: (res.msg),
      type: 'success',
  })
    });
    userStore.getUserInfo();
  });
  state.isShowChangeAvatarDialog = false;
};

const lottery=()=>{
  state.isShowLotteryDialog = true
  setJackpot()
}
const onSubmitForNotice = () => {
  userStore.setUserNotice().then((res) => {
    ElNotification({
    title: '已保存您的设置',
    message: res.msg,
    type: 'success',
  })
  });
};

//const activeNames = ref(['1'])


</script>

<style scoped lang="scss">
@import '../../theme/mixins/index.scss';



.dialog {
  :deep(.el-dialog) {
    box-shadow: 0 0px 0px rgb(0 0 0 / 0%);
    background: transparent;
    //.el-dialog__body {
    //  padding: 0 !important;
    //}
    //.el-dialog__header {
    //  display: none !important;
    //}
  }
}

.user_avatar{
  height: 6.5em;
}

.user_avastar_card{
    .el-card__body {
    padding: 0px !important;
  }
  border-radius: 10px;
  margin-top: 1em;
  margin-bottom: 1em;
}

.card {
  position: relative;
  width: 350px;
  height: 190px;
  /* height: 450px; */
  background: var(--el-fill-color-blank);
  border-radius: 20px;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.15);
  transition: 0.5s;
}



.imgBx {
  position: absolute;
  left: 50%;
  top: -50px;
  transform: translateX(-50%);
  width: 150px;
  height: 150px;
  background: transparent;
  border-radius: 50%;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  transition: 0.5s;
}



.imgBx img{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card .content {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
}

.card .content .details {
  padding: 40px;
  text-align: center;
  width: 100%;
  transition: 0.5s;
  transform: translateY(150px);
}



.card .content .details h2 {
  font-size: 1.25em;
  font-weight: 600;
  color: #555;
  line-height: 1.2em;
}

.card .content .details h2 span {
  font-size: 0.75em;
  font-weight: 500;
  opacity: 0.5;
}

.card .content .details .data {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.card .content .details .data h3 {
  font-size: 1em;
  color: #555;
  line-height: 1.2em;
  font-weight: 600;
}

.card .content .details .data h3 span {
  font-size: 0.85em;
  font-weight: 400;
  opacity: 0.5;
}

.card .content .details .actionBtn {
  display: flex;
  justify-content: space-between;
}

.card .content .details .actionBtn button {
  padding: 10px 30px;
  border-radius: 5px;
  border: none;
  outline: none;
  font-size: 1em;
  font-weight: 500;
  background: #ff5f95;
  color: #fff;
  cursor: pointer;
}

.card .content .details .actionBtn button:nth-child(2) {
  border: 1px solid #999;
  color: #999;
  background: #fff;
}

.h2{
  color: var(--el-text-color-primary) !important;
}

.border-radius{
  border-radius: 0px;
}
element{
  .style{
    background-image: url("https://i2.mjj.rip/2024/03/24/b54166df9436fa7e076756f965427176.jpeg");

  }

}
</style>

