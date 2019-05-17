<template>
	<view class="page">	
		<!-- ----------------------------------- -->
		<!-- 轮播图 start -->
		<swiper :indicator-dots="true" :autoplay="true" class="heros">		
			<swiper-item v-for="item in heroList">
				<image :src="item.image" class="heros"></image>
			</swiper-item>			
		</swiper>
		<!-- 轮播图 end -->
		<!-- ----------------------------------- -->		
		<!-- 热门超英 start -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="/static/icos/hot.png" 
				class="hot-icon"></image>
				<view class="hot-title">
					热门超英
				</view>
			</view>
		</view>
		
		<scroll-view scroll-x="true" class="page-block hot">
			<view class="single-poster" v-for="item in heroHotList">
				<view class="poster-wapper">
					<image :src="item.cover" 
					class="poster"></image>
					<view class="movie-name">
						{{item.name}}
					</view>
					<movieStar :innerScore="item.score" showNum="1"></movieStar>
				</view>
			</view>
		</scroll-view>
		<!-- 热门超英 end -->
		<!-- ----------------------------------- -->		
		<!-- 预告片 start -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="/static/icos/interest.png" 
				class="hot-icon"></image>
				<view class="hot-title">
					热门预告
				</view>
			</view>
		</view>		
		
		<view class="hot-trailer page-block">
			<video 
				v-for="item in heroTrailerList"
				:src="item.trailer" 
				:poster="item.poster" 
				class="hot-trailer-single"
				controls></video>
		</view>
		<!-- 预告片 end -->
		<!-- ----------------------------------- -->	
		<!-- 猜你喜欢 start -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="/static/icos/guess-u-like.png" 
				class="hot-icon"></image>
				<view class="hot-title">
					猜你喜欢
				</view>
			</view>
		</view>
		
		<view class="page-block guess-u-like">
			<!-- <view class="single-like">
				<image src="/static/poster/civilwar.jpg" class="like-poster"></image>
				
				<view class="movie-desc">
					<view class="movie-title">蝙蝠侠蝙蝠侠蝙蝠侠蝠蝠蝠</view>
					<movieStar :innerScore="9" showNum="0"></movieStar>
					<view class="movie-info">20169494 美国</view>
					<view class="movie-info">主演</view>

				</view>
				<view class="movie-oper" @click="praiseMe">
					<image src="/static/icos/praise.png" class="praise-icon"></image>
					<view class="praise-me">
						点赞
					</view>
					<view :animation="animationData" class="praise-me animation-opacity">
						+1
					</view>
				</view>
			</view> -->
			
			<view class="single-like"  v-for="(item,index) in guessULikeList">
				<image :src="item.cover" class="like-poster"></image>
				
				<view class="movie-desc">
					<view class="movie-title">{{item.name}}</view>
					<movieStar :innerScore="item.score" showNum="0"></movieStar>
					<view class="movie-info">{{item.basicInfo}}</view>
					<view class="movie-info">{{item.releaseDate}}</view>
			
				</view>
				<view class="movie-oper" :data-index="index" @click="praiseMe">
					<image src="/static/icos/praise.png" class="praise-icon"></image>
					<view class="praise-me">
						点赞
					</view>
					<view :animation="animationDataArray[index]" class="praise-me animation-opacity">
						+1
					</view>
				</view>
			</view>
		</view>
				
		<!-- 猜你喜欢 end -->
		<!-- ----------------------------------- -->			
	</view>
</template>

<script>

	import helloComp from "../../components/hello.vue"; // 引入组件
	import movieStar from "../../components/movieStar.vue"
	
	export default {
		data() {
			return {
				heroList: [],
				heroHotList:[],
				heroTrailerList: [],
				guessULikeList: [],
				animationDataArray: [
					{},{},{},{},{}
				],
				// 这里5个是因为API接口随机返回5条数据
				animationData : {}
			}
		},
		
		onUnload() {
			//页面卸载的时候，清除动画数据
			this.animationData = {};
		},
		onLoad() {
			var me = this;
			// 通过挂载到main.js中变量值
			var serverUrl = me.serverUrl
			
			// app+ 是ios、android ，mp-weixin 是微信小程序
			// #ifdef APP-PLUS || MP-WEIXIN
			this.animation = uni.createAnimation() ;
			// #endif
			
			// 获取轮播图数据
			uni.request({
				url: serverUrl+'/index/carousel/list?qq=649252367', //仅为示例，并非真实接口地址。
				method:"POST",			
				success: (res) => {			
					// 判断status是否为200
					if (res.data.status==200) {
						var heroList = res.data.data;
						me.heroList = heroList;
					}
					this.text = 'request success';
				}
			});
		
			// 获取热门超英数据
			uni.request({
				url: serverUrl+'/index/movie/hot?qq=649252367&type=superhero', //仅为示例，并非真实接口地址。
				method:"POST",			
				success: (res) => {				
					// 判断status是否为200
					if (res.data.status==200) {
						var heroHotList = res.data.data;
						me.heroHotList = heroHotList
					}
					this.text = 'request success';
				}
			});			

			// 获取预告片数据
			uni.request({
				url: serverUrl+'/index/movie/hot?qq=649252367&type=trailer', //仅为示例，并非真实接口地址。
				method:"POST",			
				success: (res) => {			
					// 判断status是否为200
					if (res.data.status==200) {
						var heroTrailerList = res.data.data;
						me.heroTrailerList = heroTrailerList
					}
					this.text = 'request success';
				}
			});		

			// 随机获取点赞清单
			uni.request({
				url: serverUrl+'/index/guessULike?qq=649252367', //仅为示例，并非真实接口地址。
				method:"POST",			
				success: (res) => {
					// console.log(res.data);					
					// 判断status是否为200
					if (res.data.status==200) {
						var guessULikeList = res.data.data;
						me.guessULikeList = guessULikeList
					}
					this.text = 'request success';
				}
			});					
		
		},
		methods: {
			// 点赞实现动画效果
			praiseMe(e){
				// #ifdef APP-PLUS || MP-WEIXIN

				var index = e.currentTarget.dataset.index;
				// console.log(index)
				// return;
				
				// 构建动画数据，并且通过step来表示这组动画的完成
				this.animation.translateY(-60).opacity(1).step({
					duration: 300
				});
				//导出动画数据到view组件
				// this.animationData = this.animation.export();
				this.animationData = this.animation;
				this.animationDataArray[index] = this.animationData.export();
				
				// 还原动画
				setTimeout(function(){
					this.animation.translateY(0).opacity(0).step({
					duration: 0
				});
				// this.animationData = this.animation.export();
				this.animationData = this.animation;
				this.animationDataArray[index] = this.animationData.export();


				}.bind(this),500)
				
			// #endif
			}

		},
		
		components:{
			helloComp,
			movieStar			
		}
	}

</script>

<style>
	@import url("index.css");
</style>
