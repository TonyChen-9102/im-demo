<template>
	<view class="im-area">
		<im-list class="im-list" :param="param" :config="config"></im-list>
		<im-input class="im-input"></im-input>
	</view>
</template>

<script>
	import imList from "./list/im-list.vue"
	import imInput from "./input/im-input.vue"

	export default {
		props:{
			param:{
				type:Object,
				required: true,
				default:function(){
					return {
						//对方账号
						account,
						//订单开始时间
						startTime,
						//业务id
						buzId,
						//业务类型
						buzType,
						//拓展字段网络类型
						profile
					};
				}
			},
			config:{
				type:Object,
				default:function(){
					return {
						//是否显示输入框
						showInput:true, 
						//历史消息获取方式，im服务器：“im”/自己服务器：“self”
						historyType:"im"
					};
				}
			}
		},
		components: {
			"im-list": imList,
			"im-input": imInput,
		},
		data() {
			return {

			};
		},
		computed: {

		}
	}
</script>

<style lang="scss" scoped>
	.im-area {
		display: flex;
		flex-direction: column;
		
		.im-list {
			width: 100%;
			flex: 1;
			overflow: auto;
		}
		
		.im-input {
			width: 100%;
			height: 100rpx;
		}
	}
</style>
