<template>
	<view class="im-list">
		<im-mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback"
		 :fixed="false" :down="downOption" :up="upOption">
			<im-item-main :msgs="dataList"></im-item-main>
		</im-mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from "../../mescroll-uni/mescroll-mixins.js";
	import imItemMain from "./listItem/im-item-main.vue"
	import {
		mapActions,
		mapGetters,
		mapState
	} from "vuex";

	export default {
		mixins: [MescrollMixin],
		components: {
			"im-item-main": imItemMain
		},
		props:{
			param:{
				type:Object,
				required: true,
				default:function(){
					return {
						account,
						startTime,
						buzId,
						buzType,
						profile
					};
				}
			},
			config:{
				type:Object,
				default:function(){
					return {
						historyType:"im"
					};
				}
			}
		},
		mounted() {
		},
		data() {
			return {
				//mescroll-uni-下拉刷新参数
				downOption:{
					autoShowLoading:true
				},
				//mescroll-uni -- 加载更多参数
				upOption:{
					use:false,
					toTop:{
						//取消回顶部按钮
						src:""
					},
					empty:{
						tip:"暂无数据"
					}
				},
				imMsgEndTime:undefined,
				//消息数据
				dataList: [],
			}
		},
		methods: {
			...mapActions("imMain", [
				"imGetHistoryMsgs",
			]),
			//mescroll-uni-下拉刷新回调
			downCallback() {
				this.getHistory();
			},
			//获取聊天记录
			async getHistory() {
				let mParam = {
					to: this.param.account,
					endTime:this.imMsgEndTime,
				};
				
				try {
					let msgObj = await this.imGetHistoryMsgs(mParam);
					if (msgObj && msgObj.msgs instanceof Array && msgObj.msgs.length > 0){
						this.imMsgEndTime = msgObj.msgs[0].time;
						this.dataList = msgObj.msgs.concat(this.dataList);
						this.mescroll.endSuccess();
					}else{
						if (this.dataList.length == 0){
							this.mescroll.endSuccess();
							this.mescroll.showEmpty();
						}else {
							this.mescroll.endSuccess();
							this.mescroll.lockDownScroll(true);
						}
					}
				}catch(e){
					this.mescroll.endErr();
					console.log("im-list;getHistory;endErr=" + e);
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.im-list {
		display: flex;
		flex-direction: column;
	}
</style>
