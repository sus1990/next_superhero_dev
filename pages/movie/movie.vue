<template>
	<view class="page">
		
		<!-- 预告片播放器 start -->
		<view class="player">
			<video 
				:src="MovieInfo.trailer" 
				:poster="MovieInfo.poster" 
				class="movie"
				controls></video>
		</view>
		<!-- 预告片播放器 end -->

		<!-- 影片信息 start -->
		<view class="movie-info">
			<image :src="MovieInfo.cover" class="poster">				
			</image>
			
			<view class="movie-desc">
				<view class="basic-title">{{MovieInfo.name}}</view>
				<view class="basic-info">{{MovieInfo.basicInfo}}</view>
				<view class="basic-info">{{MovieInfo.originalName}}</view>
				<view class="basic-info">{{MovieInfo.totalTime}}</view>
				<view class="basic-info">{{MovieInfo.releaseDate}}</view>

				
				<view class="movie-score">
					<!-- 评分左半 start -->
					<view class="big-score">
						<view class="score-words">综合评分：</view>
						<view class="score-num">{{MovieInfo.score}}</view>
					</view>
					<!-- 评分左半 end -->
					
					<!-- 评分右半 start -->
					<view class="score-stars">
						<block v-if="MovieInfo.score >=0">
							<movieStar :innerScore="MovieInfo.score" showNum="0"></movieStar>
						</block>
						<view class="praised-counts">
							{{MovieInfo.prisedCounts}} 人点赞
						</view>

					</view>
					<!-- 评分右半 end -->
				</view>
			</view>
		</view>
		<!-- 影片信息 end *  --> 
		
		<view class="line-wapper">
			<view class="line"></view>
		</view>
		
		
		<!-- 剧情介绍 start *  --> 
		<view class="plots-block">
			<view class="plots-title">剧情介绍</view>
			<view class="plots-desc">{{MovieInfo.plotDesc}}</view>
		</view>
		
		<!-- 剧情介绍 end *  --> 
		
		<!-- 演职人员 start -->
		<view class="scroll-block">
			<view class="plots-title">演职人员</view>
			<scroll-view scroll-x class="scroll-list">
				<view class="actor-wapper" v-for="item in  directArray">
					<image 
					:src="item.photo" 
					mode="aspectFill"
					class="actor-img"></image>
					<view class="actor-name">{{item.name}}</view>
					<view class="actor-role">{{item.actName}}</view>
				</view>

				<view class="actor-wapper" v-for="item in actorArray">
					<image 
					:src="item.photo" 
					mode="aspectFill"
					class="actor-img"></image>
					<view class="actor-name">{{item.name}}</view>
					<view class="actor-role">{{item.actName}}</view>
				</view>				
			
			</scroll-view>
		</view>
		<!-- 演职人员 end -->
		
		<!-- 剧照 start -->
		<view class="scroll-block">
			<view class="plots-title">剧照</view>
			<scroll-view scroll-x class="scroll-list">
				<image 
				v-for="item in plotPicArray" 
				:src="item" 
				mode="aspectFill"
				class="plot-img"></image>
			</scroll-view>
		</view>
		<!-- 剧照 end -->

	</view>
</template>

<script>
	import movieStar from "../../components/movieStar.vue"
	export default {
		data() {
			return {
				params: {},
				MovieInfo: {},
				plotPicArray: [],
				directArray: [],
				actorArray:[]
			}
		},
		
		onLoad(params) {
			var me = this;
			var serverUrl = me.serverUrl;
			me.params = params;
			// 获取电影详情
			uni.request({
				url: serverUrl + '/search/trailer/' + params.trailerID + '?qq=649252367', 
				method:"POST",			
				success: (res) => {				
					// 判断status是否为200
					if (res.data.status==200) {
						var MovieInfo = res.data.data;
						me.MovieInfo = MovieInfo;
						
						// 转换剧照字符串为json
						var plotPicArray = JSON.parse(MovieInfo.plotPics)
						me.plotPicArray = plotPicArray;
						console.log(plotPicArray)
					}
				}
			});
			
			// 获取导演详情
			uni.request({
				url: serverUrl + '/search/staff/' + params.trailerID + '/1?qq=649252367', 
				method:"POST",			
				success: (res) => {				
					// 判断status是否为200
					if (res.data.status==200) {
						var info = res.data.data;
						me.directArray = info;
					}
				}
			});

			// 获取主演详情
			uni.request({
				url: serverUrl + '/search/staff/' + params.trailerID + '/2?qq=649252367', 
				method:"POST",			
				success: (res) => {				
					// 判断status是否为200
					if (res.data.status==200) {
						var info = res.data.data;
						me.actorArray = info;
					}
				}
			});					
			
		},
		
		methods: {
		},
		components:{
			movieStar
		}
	}
</script>

<style>
@import url("movie.css");
</style>
