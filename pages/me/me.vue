<template>
	<view class="page page-fill">
		<view class="header">
			
			<!-- 用户头像 -->
			<image :src="userInfo.faceImage" class="face"></image>
<!-- 			<view v-if="isLogin">
				<image src="/static/icos/108x108.png" class="face"></image>
			</view>
			<view v-else>
				
			</view> -->

			<!-- 用户昵称 -->
			<view class="info-wapper" v-if="isLogin">
				<view class="nickname">
					{{userInfo.nickname}}
				</view>
				<view class="nav-info">ID: {{userInfo.id}}</view>
			</view>
			<view class="info-wapper"  v-else>
				<navigator url="../registLogin/registLogin" hover-class="none">
					<view class="nickname regist-login">
						注册/登录
					</view>
				</navigator>			
			</view>
			
			<!-- 用户设置 -->
			<view class="set-wapper" v-if="isLogin">
				<navigator url="/pages/meInfo/meInfo">
					<image src="/static/icos/settings.png" class="settings" ></image>
				</navigator>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin: false,
				userInfo: {
					"id": "123456789",
					"nickname": "NEXT 学院",
					"faceImage": "http://122.152.205.72:88/group1/M00/00/05/CpoxxFw_-5-AFyVyAABLIH8xBTw233.png"
				}
			}
		},
		
		// 每次页面被打开的时候，从缓存中获取数据
		onShow() {
			var me = this;
			var userInfo = me.getGlobalUser("globalUser");
			
			if (userInfo != null ) {
				me.isLogin = true;
				me.userInfo = userInfo;
			}else{
				me.isLogin = false;		
			}
		},
	
		methods: {

		}
	}
</script>

<style>
	@import url("me.css");
</style>
