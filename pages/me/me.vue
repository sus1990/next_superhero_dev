<template>
	<view class="page page-fill">
		<view class="header">
			
			<!-- 用户头像 -->
			<view v-if="isLogin">
				<image src="/static/icos/108x108.png" class="face"></image>
			</view>
			<view v-else>
				<image src="http://122.152.205.72:88/group1/M00/00/05/CpoxxFw_-5-AFyVyAABLIH8xBTw233.png" class="face"></image>
			</view>

			<!-- 用户昵称 -->
			<view class="info-wapper" v-if="isLogin">
				<view class="nickname">
					NEXT 学院
				</view>
				<view class="nav-info">ID: 123456asdfa</view>
			</view>
			<view class="info-wapper"  v-else>
				<navigator url="../registLogin/registLogin">
					<view class="nickname regist-login">
						注册/登录
					</view>
				</navigator>			
			</view>
			
			<!-- 用户设置 -->
			<view class="set-wapper" v-if="isLogin">
				<image src="/static/icos/settings.png" class="settings"></image>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin: false
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	@import url("me.css");
</style>
