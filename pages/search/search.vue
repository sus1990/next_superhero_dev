<template>
	<view class="page">
		<!-- 搜索框 start -->
		<view class="search-block">
			
			<view class="search-icon-wapper">
				<image src="/static/icos/search.png" class="search-icon" ></image>
			</view>		
				
			<input 
				placeholder="搜索预告片" maxlength="10" 
				class="search-txt"
				confirm-type="search"
				@confirm="searchMe"
			/>

		</view>
		<!-- 搜索框 end -->
		
		<!-- 电影列表 start -->
		<view class="movie-list page-block">
			<view class="movie-wapper"  v-for="item in movieList" >
				<image 
					:src="item.cover" 
					:data-trailerID="item.id"
					@click="showTrailer"
					class="poster" 
					></image>
			</view>		
								
		</view>
		<!-- 电影列表 end -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				movieList: [],
				keywords: "",  //搜索关键字
				page: 1,  //当前第几页
				totalPages:1   //总页数
			}
		},
		onLoad() {
			this.getMovieList()						
		},
		onReachBottom() {
			var me = this;
			var page = me.page + 1;
			var keywords = me.keywords;
			var totalPages = me.totalPages;
			// debugger;
			// 数量太少不分页
			if (page > totalPages) {
				return;
			}
			me.pagedMovieList(keywords, page , 15)
		},
		
		methods: {
			getMovieList(){
				var me = this;
				var serverUrl = me.serverUrl;
				uni.showLoading({
					mask: true ,//获取数据时，禁用其他动作
					title:"请稍后..."
				})									
				uni.request({
					url: serverUrl+'/search/list?qq=649252367&keywords=&page=2&pageSize=10', //仅为示例，并非真实接口地址。
					method:"POST",			
					success: (res) => {
						// console.log(res.data);					
						// 判断status是否为200
						if (res.data.status==200) {
							var movieList = res.data.data.rows;
							me.movieList = movieList;
						}
						this.text = 'request success';
					},
					complete: () => {
						uni.stopPullDownRefresh();
						uni.hideLoading();
					}
				});				
			},
			
			pagedMovieList(keywords, page, pageSize){
				var me = this;
				var serverUrl = me.serverUrl;
				uni.showLoading({
					mask: true ,//获取数据时，禁用其他动作
					title:"请稍后..."
				})	
				uni.request({
					url: serverUrl+'/search/list?qq=649252367&keywords=' + keywords
															+'&page=' + page
															+'&pageSize=' + pageSize,
					method:"POST",			
					success: (res) => {
						// console.log(res.data);					
						// 判断status是否为200
						if (res.data.status==200) {
							var tempMovieList = res.data.data.rows;
							me.page = page;
							me.totalPages = res.data.data.total;
							me.movieList = me.movieList.concat(tempMovieList);
						}
					},
					complete: () => {
						uni.stopPullDownRefresh();
						uni.hideLoading();
					}
				});	
			},
			
			searchMe(e){
				var me = this;
				//获取搜索内容
				var val = e.detail.value;
				me.keywords = val;
				me.movieList = [];
				me.pagedMovieList(val,1,15)
			  
			},
			
			showTrailer(e) {
				var trailerID = e.currentTarget.dataset.trailerid;
				uni.navigateTo({
					url: "/pages/movie/movie?trailerID=" + trailerID 
				})
				// uni.switchTab({
				// 	url: "/pages/me/me"  
				// })				
			}
		}
	}
</script>

<style>
	@import url("search.css");
</style>
