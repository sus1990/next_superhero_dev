<template>
	<view class="black">
		
		<!-- src="http://122.152.205.72:88/group1/M00/00/04/CpoxxFw9hHaAPrzeAAGSYIU5LMY971.png" -->

		<image 
			:src="coverLink"
			mode="widthFix"
			class="cover"
			@longpress="oper"
		></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				coverLink: ""
			}
		},
		
		onLoad(params) {
			var coverLink = params.coverLink;
			this.coverLink = coverLink.replace("http://122.152.205.72:88","https://www.itzixi.com:99/");
		},
		
		methods: {
			oper() {
				var me = this;
				uni.showActionSheet({
					itemList:["下载图片","分享到朋友圈"],
					success: (res) => {
						// 下载功能
						if (res.tapIndex == 0) {
							uni.showLoading({
								title:"图片保存中...."
							})
							
							// 转换合法域名
							
							var url = me.coverLink
							// 下载到本地临时路径
							uni.downloadFile({
								url: url,
								success: (result) => {
									var temFilePath = result.tempFilePath;
									// 保存到本地正式路径中，一般为相册中
									uni.saveImageToPhotosAlbum({
										filePath:temFilePath,
										success: ()=> {
											uni.showToast({
												title: '保存成功',
												duration: 2000
											});
										},
										complete: ()=> {
											uni.hideLoading()
										}
									})
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
.black{
	background-color: #000000;
	width: 100%;
	height: 100%;
	
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: fixed;
}
.cover{
	align-self: center;
}
</style>
