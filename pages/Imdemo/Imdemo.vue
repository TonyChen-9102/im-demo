<template>
	<view class="im-demo">
		<view class="top im-background-color">
		</view>
		<im-area class="im-area" :param="imParam" :config="imConfig"></im-area>
	</view>
</template>

<script>
	import imArea from "../../thirdSdk/im-sdk/components/im-area/im-area.vue"

	export default {
		components: {
			"im-area": imArea,
		},
		data() {
			return {
				imParam:{
					account:"ck8399013322"
				},
				imConfig:{
					showInput:true,
					historyType:"im"
				}
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.im-demo {
		display: flex;
		flex-direction: column;
		width: 100%;
		
		.top{
			height: 100rpx;
			width: 100%;
			overflow: hidden;
		}
		.im-area {
			position: absolute;
			top: 100rpx;
			width: 100%;
			bottom: 0;
		}
	}
</style>
