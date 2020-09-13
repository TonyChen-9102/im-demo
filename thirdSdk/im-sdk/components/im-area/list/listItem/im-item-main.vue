<template>
	<view>
		<view class="im-item">
			<view v-for="(msg,index) in msgs" :key="index">
				<im-item-text class="im-item-text" :msg="msg"></im-item-text>
			</view>
		</view>
	</view>
</template>

<script>
	import imItemText from "./im-item-text.vue"
	export default {
		components:{
			"im-item-text":imItemText
		},
		props: {
			msgs: {
				type: Array,
				default () {
					return [];
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.im-item {
		display: flex;
		flex-direction: column;
		.im-item-text{
			width: 100%;
		}
	}
</style>
