export default {
  adminServer:{
    tabWebsite:"网站",
    tabSubscribe:"订阅",
    tabPayment:"支付",
    tabEmail:"邮件",
    tabSecurity:"安全",
    tabNotice:"通知",
    tabMigration:"数据迁移",
    tabFinance:"财务",
    emailTesting:"邮件测试",
    emailCodeTip:"邮件验证码内容，支持HTML，`emailcode`为验证码字段，不可删除！",
    migrationTip:"迁移之前请做好数据备份。由于面板之间数据不兼容，迁移仅保留用户最基本的账号email和uuid数据，并将用户密码初始为123456，请引导用户及时修改密码",
    migrationTip2:"请做好数据备份，并填写正确的数据库信息，是否继续?",
    RequestMinute:"请求/分钟",
    addPay:"新增支付",
    modifyPay:"编辑支付",
    Server:{
      id:"id",
      created_at: "创建时间",
      updated_at: "更新时间",
      //website
      current_version:"当前版本",
      latest_version:"最新版本",
      starting_upgrade:"开始升级",
      is_latest:"当前已是最新版本",
      upgrade_warning:"升级有风险，请做好数据备份!",

      enable_register: "启用注册",
      enable_email_code: "启用注册验证码",
      enable_login_email_code: "启用登录验证码",
      acceptable_email_suffixes: "合法邮箱后缀",
      is_multipoint: "开启多点登陆",
      backend_url: "后端地址",
      frontend_url: "前端地址",
      api_prefix: "管理员api前缀",
      sub_name: "订阅名称",
      tek: "通信密钥",
      sub_prefix_msg:"订阅前缀，一行一个",
      enabled_clock_in: "启用打卡",
      // email
      email_from: "发件人",
      email_from_alias: "发件人别名",
      email_secret: "密钥",
      email_host: "服务器地址",
      email_port:"端口",
      email_is_ssl: "是否SSL",
      email_nickname: "昵称",
      email_subject: "邮件主题",
      email_content: "邮件内容",
      // security captcha
      key_long:"key_long",
      img_width:"img_width",
      img_height:"img_height",
      open_captcha:"open_captcha",
      open_captcha_time_out:"open_captcha_time_out",
      // security jwt
      signing_key: "jwt签名",
      expires_time: "过期时间",
      buffer_time: "缓冲时间",
      issuer: "签发者",
      // security RateLimitParams
      ip_role_param:"ip限流",
      visit_param:"用户限流",
      // notice
      push_method:"推送方式",
      trigger_condition:"触发条件",
      enable_tg_bot:"启用TG Bot",
      enable_email:"启用Email",
      enable_web_mail:"启用站内信",
      bot_token: "tg bot token",
      admin_id: "管理员 id",
      admin_id_msg:"管理员的账户ID, 每行一个",
      tg_socks5 :"tg socks5代理",
      when_user_registered: "用户注册时",
      when_user_purchased: "用户购买时",
      when_node_offline: "节点离线时",
      when_new_ticket:"新工单时",
      //finance
      enable_invitation_commission:'邀请佣金',
      commission_rate:'佣金率',
      withdraw_threshold:'提现阈值',
      enable_lottery:'抽奖',
      jackpot:"奖池",
      prize:"奖金",
      weight:"权重",
    },
    Migration:{
      panel_type:"面板类型",
      db_address:"数据库地址",
      db_port:"数据库端口",
      db_name:"数据库名",
      db_username:"数据库用户",
      db_password:"数据库密码",
    },
  }
};