<template>
	<view class="im-item-text" v-if="isShow">
		<!-- <text class="time">2020-09-19 18:43</text> -->
		<view :class="[isOut?'view-out':'view-in']">
			<u-image width="100rpx" height="100rpx" :src="iconPath"></u-image>
			<text>{{msg.custom}}</text>
		</view>
	</view>
</template>

<script>
	import ImMsgTypeDic from "../../../../dictionary/ImMsgTypeDic.js"
	export default{
		props:{
			msg:{
				type:Object,
				required:true,
				default:function(){
					return {
						id,
						flow,
						from,
						fromNick,
						to,
						time,
						type: ImMsgTypeDic.TEXT,
						custom,//消息内容
						extra//拓展字段内容
					}
				}
			}
		},
		computed:{
			isShow:function(){
				return this.msg && this.msg.type === ImMsgTypeDic.TEXT;
			},
			isOut:function(){
				return this.msg && this.msg.flow === "out";
			},
			isDoc:function(){
				// return this.msg  && this.msg.extra && this.mgs.extra.fromUserType === "doc"
				return this.isOut;
			},
			iconPath:function(){
				if (this.isDoc){
					return "/static/im/img/im_avatar_def_doc.png";
				}else{
					return "/static/im/img/im_avatar_def_patient.png";
				}
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.im-item-text {
		display: flex;
		flex-direction: column;
		
		.time{
			align-self:center
		}
		.view-in{
			width: 100%;
			display: flex;
			flex-direction: row;
		}
		.view-out{
			width: 100%;
			display: flex;
			flex-direction: row-reverse;
		}
	}
</style>
