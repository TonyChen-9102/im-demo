<template>
	<view>
		<view class="login">
			<u-button class="login_button" type="success" size="medium" @click="login">
				登录
			</u-button>
			<u-button class="login_button" type="success" size="medium" @click="loginOut">
				登出
			</u-button>
		</view>
		<view>
			<u-button class="login_button" type="success" size="medium" @click="jumpToImDemo">聊天页面</u-button>
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters,
		mapState
	} from "vuex"
	import md5 from '../../utils/md5.js'
	import ImLoginState from "../../thirdSdk/im-sdk/dictionary/ImLoginState.js"

	export default {
		data() {
			return {
				account: "ck8399013321",
				password: "Ck334554",
			}
		},
		computed: {
			...mapState("imMain", [
				"imLoginState",
				"imMyInfo"
			])
		},
		methods: {
			...mapActions("imMain", [
				"imLogin",
				"imLogOut"
			]),
			login() {
				let loginInfo = {
					uid: this.account.toLowerCase(),
					sdkToken: md5(this.password),
				};
				this.imLogin(loginInfo).then(() => {
					//success
					console.log("ckd;login=" + this.imLoginState.state + ",account=" + JSON.stringify(this.imMyInfo));
				}, () => {
					//error
				});
			},
			loginOut() {
				this.imLogOut().then(() => {
					//success
					console.log("ckd;logout=" + this.imLoginState.state);
				},()=>{
					//error
				});
			},
			jumpToImDemo() {
				if (this.imLoginState.state === ImLoginState.LOGIN){
					uni.navigateTo({
						url: "../Imdemo/Imdemo"
					});
				}else {
					console.log("ckd;logout=" + this.imLoginState.msg);
				}
			}
		}
	}
</script>

<style>
	.login {
		display: flex;
		flex-direction: row;
	}

	.login_button {
		margin: 10rpx;
	}
</style>
