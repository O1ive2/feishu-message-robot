# feishu message robot

本服务提供飞书机器人给用户/群组发送消息的相关接口

## 获取用户信息

```
get http://192.168.10.89:7001/userDetail?phone=137xxxxxxx
```

目前仅支持使用手机号码获取用户的飞书信息，其中比较重要的字段是 `openid`, 在调用发送消息接口时需要传入。

## 对指定用户发送消息

```
post http://192.168.10.89:7001/sendMessage

body: {
    "openid": "ou_8f4f3acc3f7dc4261c7ff858ab66a50e",
    "content": "{\"text\":\"一条测试消息\"}",
    "msgType": "text"
}
```

其中 msgType 字段和 content 字段的内容参考 [飞书文档](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/im-v1/message/create_json) 中的描述。
