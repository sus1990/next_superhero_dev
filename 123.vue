<template>
	<view class="movie-oper" @click="praiseMe">
		<image src="/static/icos/praise.png" class="praise-icon"></image>
		<view class="praise-me">
			点赞
		</view>
		<view :animation="animationData" class="praise-me animation-opacity">
			+1
		</view>
	</view>	
</template>

<script>
	export default {
		data() {
			return {
				animationData : {}
			}
		},		
		onUnload() {
			//页面卸载的时候，清除动画数据
			this.animationData = {};
		},
		onLoad() {
			var me = this;			
			this.animation = uni.createAnimation() ;			
		},
		methods: {
			// 点赞实现动画效果
			praiseMe(){
				// 构建动画数据，并且通过step来表示这组动画的完成
				this.animation.translateY(-60).opacity(1).step({
					duration: 300
				});
				//导出动画数据到view组件
				this.animationData = this.animation.export();
				
				// 还原动画
				setTimeout(function(){
					this.animation.translateY(0).opacity(0).step({
					duration: 0
				});
				this.animationData = this.animation.export();

				}.bind(this),500)
			}
		},		
		components:{
			helloComp,
			movieStar			
		}
	}

</script>

<style>
</style>
