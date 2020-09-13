<template>
	<view>
		<view class="im-item">
			<view class="msgs-view" v-for="(msg,index) in msgs" :key="index">
				<view class="time-area" v-if="isTimeShow(msgs,index)">
					<text class="time">{{msg.time | timeFrom('yyyy-mm-dd hh:MM')}}</text>
				</view>
				<im-item-text :msgs="msgs" :position="index"></im-item-text>
			</view>
		</view>
	</view>
</template>

<script>
	import imItemText from "./im-item-text.vue"
	export default {
		components: {
			"im-item-text": imItemText
		},
		props: {
			msgs: {
				type: Array,
				default () {
					return [];
				}
			}
		},
		methods: {
			isTimeShow(datas, postion) {
				if (postion == 0) {
					return true;
				} else if (datas && datas instanceof Array && datas.length > 1) {
					let curMsg = datas[postion];
					let preMsg = datas[postion - 1];
					if (!preMsg.time) {
						return true;
					} else if (curMsg.time) {
						let djff = curMsg.time - preMsg.time;
						return djff > 5 * 60 * 1000;
					} else {
						return false;
					}
				} else {
					return false;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.im-item {
		display: flex;
		flex-direction: column;
		padding: 30rpx 0;

		.msgs-view {
			display: flex;
			flex-direction: column;
		}

		.time-area {
			align-self: center;
			background-color: #cacdd6;
			border-radius: 1000rpx;
			padding: 5rpx 25rpx;
		}

		.time {
			color: #ffffff;
			font-size: 12px;
		}
	}
</style>
