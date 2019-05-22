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
			<navigator :url="'/pages/cover/cover?coverLink=' + MovieInfo.cover">
				<image 
					:src="MovieInfo.cover" 
					class="poster">				
				</image>								
			</navigator>

			
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
				<view class="actor-wapper" v-for="(item,directIndex) in  directArray">
					<image 
					:src="item.photo" 
					mode="aspectFill"
					class="actor-img"
					@click="lookStaff"
					:data-staffIndex="directIndex"
					></image>
					<view class="actor-name">{{item.name}}</view>
					<view class="actor-role">{{item.actName}}</view>
				</view>

				<view class="actor-wapper" v-for="(item,actorIndex) in actorArray">
					<image 
					:src="item.photo" 
					mode="aspectFill"
					class="actor-img"
					@click="lookStaff"
					:data-staffIndex="actorIndex + directArray.length"					
					></image>
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
				v-for="(img, imgIndex) in plotPicArray" 
				:src="img" 
				mode="aspectFill"
				class="plot-img"
				@click="lookMe"
				:data-imgIndex="imgIndex"
				></image>
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
			
			// 修改导航栏属性
			uni.setNavigationBarColor({
				frontColor:"#ffffff",
				backgroundColor:"#000000"
			})
			
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
		
		onShareAppMessage() {
			var me = this;
			return {
				title: me.MovieInfo.name,
				path: "/pages/movie/movie?trailerID" + me.params.trailerID
			}
		},
		
		// 监听导航栏的按钮事件
		onNavigationBarButtonTap(e) {
			var me = this;
			var index = e.index;
			
			var MovieInfo = me.MovieInfo;

			var name = MovieInfo.name
			var cover = MovieInfo.cover
			var poster = MovieInfo.poster
			var trailerID = me.params.trailerID
			
			console.log(MovieInfo)
			// debugger;
			if (index == 0) {
				// uni.share({
				// 	provider: "weixin",
				// 	scene: "WXSenceTimeline",
				// 	type: 0,
				// 	path: "/pages/movie/movie?trailerID=" + trailerID,
				// 	title: "超英",
				// 	summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				// 	imageUrl: cover,
				// 	success: function (res) {
				// 		console.log("success:" + JSON.stringify(res));
				// 	}
				// });		
				uni.share({
					provider: "weixin",
					scene: "WXSenceTimeline",
					type: 0,
					href: "http://uniapp.dcloud.io/",
					title: "uni-app分享",
					summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
					imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			}
		},
		
		methods: {
			lookMe(e) {
				var me = this;
				var imgIndex = e.currentTarget.dataset.imgindex;
				uni.previewImage({
					current: me.plotPicArray[imgIndex],
					urls: me.plotPicArray
				})
			},
			lookStaff(e) {
				var me = this;
				var staffIndex = e.currentTarget.dataset.staffindex;
				var staffArray = [].concat(me.directArray).concat(me.actorArray)
				var url = [];
				// url 为所有照片链接字符串组成的数组
				for (var i = 0; i < staffArray.length; i++) {
					url.push(staffArray[i].photo)
				}
				console.log(url)
				uni.previewImage({
					current: url[staffIndex],
					urls: url
				})
			}			
		},
		
		components:{
			movieStar
		}
	}
</script>

<style>
@import url("movie.css");
</style>
