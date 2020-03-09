define({ "api": [
  {
    "type": "post",
    "url": "/forgetAccount",
    "title": "忘记密码",
    "name": "忘记密码",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userAccount",
            "description": "<p>用户账号(邮箱)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>用户验证码</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/router/UserRouter.ts",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/reg",
    "title": "用户注册",
    "name": "用户注册",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pwd",
            "description": "<p>用户密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userAccount",
            "description": "<p>用户账号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "college",
            "description": "<p>学院</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "grade",
            "description": "<p>年级</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>参赛状态</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "skill",
            "description": "<p>技能</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>邮箱验证码</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/router/UserRouter.ts",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "用户登录",
    "name": "用户登录",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>(username/userAccount) 用户名/用户账号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pwd",
            "description": "<p>用户密码</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/router/UserRouter.ts",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/sendMail",
    "title": "用户获取验证码",
    "name": "获取验证码",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userAccount",
            "description": "<p>用户账号---邮箱</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/router/UserRouter.ts",
    "groupTitle": "User"
  }
] });
