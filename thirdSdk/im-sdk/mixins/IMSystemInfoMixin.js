const ScreenMixin ={
	created(){
		uni.getSystemInfo({
			success: (info) => {
				this.imWindowHeight = info.windowHeight;
			}
		});
	},
	data(){
		return{
			imWindowHeight:0,
		}
	},
	computed:{
		imStyleWindowHeight:function(){
			return this.imWindowHeight+"px";
		}
	}
	
}

export default ScreenMixin;