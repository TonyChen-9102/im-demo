## sdk引用
main.js
store
App.vue
uni.scss
static/im


##常用对象说明
### 用户信息
```
{
		"account": "",
		"name": "",
		"avatar": "",
		"sex": "",
		"birth": "",
		"tel": ""
	}
```

### 消息对象
```
{
		"id": "439670718436",
		"flow": "out",
		"from": "ck8399013322",
		"fromNick": "haha",
		"to": "p_93640717727557801",
		"time": 1598860042442,
		"type": "text",
		“custom”：“”//消息内容
		"extra":""//拓展字段内容
	}
	
	拓展字段：
	{
			"buzId": "439670718436",
			"buzType": "out",
			"fromUserName": "ck8399013322",
			"fromNick": "haha",
			"toUserName": "p_93640717727557801",
			"fromUserType": patient,
			"toUser": "text",
			“profile”：“”
		}
```

消息过滤规则
拓展字段中的revistId
未定义的消息不展示(展示的时候不显示)
消息内容中不需要展示的不展示（展示的时候不显示）


im-area 入参：
para
{
						account:"",
						startTime:null,
						buzId:"",
						buzType:"",
						profile:""
}
config
{
						//是否显示输入框
						showInput:true,
						//历史消息获取方式，im服务器：“im”/自己服务器：“self”
						historyType:"im"
}

