<template>
	<view class="page">
		<swiper :indicator-dots="true" :autoplay="true" class="heros">
			<swiper-item>
				<image src="../../static/img/heros/swiper1.jpg" class="heros"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/img/heros/swiper2.jpg" class="heros"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

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
