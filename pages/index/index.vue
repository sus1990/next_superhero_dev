<template>
	<view class="page">	
		<!-- 轮播图 start -->
		<swiper :indicator-dots="true" :autoplay="true" class="heros">		
			<swiper-item v-for="item in heroList">
				<image :src="item.image" class="heros"></image>
			</swiper-item>			
		</swiper>
		<!-- 轮播图 end -->
		
		<!-- 热门超英 start -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/icos/hot.png" 
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

	</view>
</template>

<script>
	// import common from "../../common/commn.js"
	import helloComp from "../../components/hello.vue"; // 引入组件
	import movieStar from "../../components/movieStar.vue"
	
	export default {
		data() {
			return {
				heroList: [],
				heroHotList:[]
			}
		},
		onLoad() {
			var me = this;
			// 通过挂载到main.js中变量值
			var serverUrl = me.serverUrl
			// 获取轮播图数据
			uni.request({
				url: serverUrl+'/index/carousel/list?qq=649252367', //仅为示例，并非真实接口地址。
				method:"POST",			
				success: (res) => {
					console.log(res.data);					
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
					console.log(res.data);					
					// 判断status是否为200
					if (res.data.status==200) {
						var heroHotList = res.data.data;
						me.heroHotList = heroHotList
					}
					this.text = 'request success';
				}
			});			
		},
		methods: {

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
