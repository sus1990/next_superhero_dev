<template>
	<view class="body">
		
		<!-- form 表单 start -->
		<form @submit="formSubmit">
			
			<!-- 头像 -->
			<view class="face-wapper">
				<image src="../../static/icos/default-face.png" class="face"></image>
			</view>
			
			<!-- 账号 -->
			<view class="info-wapper">
				<label class="words-lbl">账号</label>
				<input name="username" type="text" value="" class="input" placeholder="请输入用户名" placeholder-class="graywords"/>
			</view>
			
			<!-- 密码 -->
			<view class="info-wapper" style="margin-top: 40upx;">
				<label class="words-lbl">密码</label>
				<input name="password" type="text" value="" password="true" class="input" placeholder="请输入密码" placeholder-class="graywords"/>
			</view>
			
			<!-- 提交按钮 -->
			<button type="primary" form-type="submit" style="margin-top: 60upx;width: 90%;">注册/登录</button>
		<!-- form 表单 end -->

		</form>
		
		
		<!-- 第三方登录H5不支持，所以隐藏掉 -->
		<!-- #ifndef H5 -->
			<view class="third-wapper">
				
				<view class="third-line">
					<view class="single-line">
						<view class="line"></view>
					</view>
					
					<view class="third-words">第三方账号登录</view>
					
					<view class="single-line">
						<view class="line"></view>
					</view>
				</view>
				
				<view class="third-icos-wapper">
					<!-- 5+app 用qq/微信/微博 登录 小程序用微信小程序登录 h5不支持 -->
					<!-- #ifdef APP-PLUS -->
						<image src="../../static/icos/weixin.png" data-logintype="weixin" @click="appOAuthLogin" class="third-ico"></image>
						<image src="../../static/icos/QQ.png" data-logintype="qq" @click="appOAuthLogin" class="third-ico" style="margin-left: 80upx;"></image>
						<image src="../../static/icos/weibo.png" data-logintype="sinaweibo" @click="appOAuthLogin" class="third-ico" style="margin-left: 80upx;"></image>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
						<button open-type='getUserInfo' @getuserinfo="wxLogin" class="third-btn-ico">
						</button>
					<!-- #endif -->
				</view>
			</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			formSubmit(e) {
				var me = this;
				var username = e.detail.value.username;
				var password = e.detail.value.password;
				
				uni.request({
					url:me.serverUrl + '/user/registOrLogin',
					method:"POST",	
					data: {
						"userBO": {
							"password": username,
							"username": password,
						},					
						"qq": "649252367"
					},
					success: (res) => {
						if (res.data.status == 200) {
							console.log(res)
						}

					},
					complete: (res) => {
						console.log(res)
					}
				});
			}
		}
	}
</script>

<style>
	@import url("registLogin.css");
</style>
