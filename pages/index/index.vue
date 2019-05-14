<template>
	<view class="page">
		<swiper :indicator-dots="true" :autoplay="true" class="heros">
<!-- 			<swiper-item>
				<image src="../../static/img/heros/swiper1.jpg" class="heros"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/img/heros/swiper2.jpg" class="heros"></image>
			</swiper-item> -->
			
			<swiper-item v-for="item in heroList">
				<image :src="item.image" class="heros"></image>
			</swiper-item>			
		</swiper>
		<p>{{serverUrl}}</p>
	</view>
</template>

<script>
	// import common from "../../common/commn.js"
	export default {
		data() {
			return {
				heroList: []
			}
		},
		onLoad() {
			var me = this;
			// 通过挂载到main.js中变量值
			var serverUrl = me.serverUrl
			uni.request({
				url: serverUrl+'/index/carousel/list?qq=1207827194', //仅为示例，并非真实接口地址。
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
		},
		methods: {

		}
	}
</script>

<style>
	@import url("index.css");
/* 	.heros{
		width: 100%;
		height:440upx ;
	}
	 */
</style>
