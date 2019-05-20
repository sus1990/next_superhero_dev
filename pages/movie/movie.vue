<template>
	<view>
		详情页面{{params.trailerID}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: []
			}
		},
		
		onLoad(params) {
			var me = this;
			me.params = params
		},
		
		methods: {
			
		}
	}
</script>

<style>

</style>
