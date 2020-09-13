<template>
	<view class="im-item-text" v-if="isShow">
		<view :class="[isOut?'view-out':'view-in']">
			<u-image width="60rpx" height="60rpx" :src="iconPath" shape="circle"></u-image>
			<view :class="[isOut?'text-area-out':'text-area-in','text-area']">
				<text :class="[isOut?'text-out':'text-in','text']">{{msg.custom}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import ImMsgTypeDic from "../../../../dictionary/ImMsgTypeDic.js"
	export default {
		props: {
			msgs: {
				type: Array,
				default () {
					return [];
				}
			},
			position: {
				type: Number,
				default: 0,
			},
		},
		computed: {
			msg: function() {
				if (this.msgs && this.msgs instanceof Array && this.msgs.length > 0) {
					return this.msgs[this.position];
				} else {
					return {};
				}
			},
			isShow: function() {
				return this.msg && this.msg.type === ImMsgTypeDic.TEXT;
			},
			isOut: function() {
				return this.msg && this.msg.flow === "out";
			},
			isDoc: function() {
				// return this.msg  && this.msg.extra && this.mgs.extra.fromUserType === "doc"
				return this.isOut;
			},
			iconPath: function() {
				if (this.isDoc) {
					return "/static/im/img/im_avatar_def_doc.png";
				} else {
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
		width: 100%;

		.view-in {
			width: 100%;
			display: flex;
			flex-direction: row;
			padding: 15rpx;
		}

		.view-out {
			width: 100%;
			display: flex;
			flex-direction: row-reverse;
			padding: 15rpx;
		}

		.text-area {
			margin: 0rpx 15rpx;
			max-width: 70%;
			border-radius: 15rpx;
			padding: 15rpx;
		}

		.text-area-in {
			background-color: #FFFFFF;
		}

		.text-area-out {
			background-color: #56b3ff;
		}

		.text {
			word-break: break-all;
			font-size: 14px;
		}

		.text-in {
			color: #000000;
		}

		.text-out {
			color: #FFFFFF;
		}
	}
</style>
