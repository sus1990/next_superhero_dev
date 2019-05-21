<template name="movieStar">
	<view class="movie-score-wapper">
		<!-- 根据分数分配黄色和灰色星星的数量 -->
		<image v-for="x in yellowScore"
			src="/static/icos/star-yellow.png" class="star-icon"></image>
		<image 
			v-for="y in grayScore"
			src="/static/icos/star-gray.png" class="star-icon"></image>			
		<view class="movie-score" v-if="showNum == 1">
			{{innerScore}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "movieStar",
		data() {
			return {
				yellowScore: 0,
				grayScore: 5
			};
		},
		
		props:{
			innerScore: 0 , // 定义外部传入的分数
			showNum: 0 // 是否需要显示具体的分数 1：显示 0：不显示
		},
		
		// 生命周期，组件完成后调用
		created() {
			// console.log(innerScore)
			var tempScore = 0;
			if(this.innerScore != null && this.innerScore != undefined && this.innerScore != ''){
				tempScore = this.innerScore
			};
			var yellowScore = parseInt(tempScore / 2);
			var grayScore = 5 - yellowScore;
			
			this.yellowScore = yellowScore;
			this.grayScore = grayScore;
		}
	}
</script>

<style>
	.movie-score-wapper{
		display: flex;
		flex-direction: row;
	}

	.star-icon{
		width: 20upx;
		height: 20upx;
		margin-top: 6upx;
	}

	.movie-score{
		font-size: 12px;
		color: gray;
		margin-left: 8upx;
	}
</style>
