<template name="helloComp">
	<view>
		{{msg}}
		<view class="">
			<input type="text" :value="myValue" class="txt" />
		</view>
	</view>
</template>

<script>
	export default {
		name: "helloComp",		
		data() {
			return {
				msg: "自定义组"
			};
		},
		props: {
			// 自定义一个变量，接受其他传来的参数值
			myValue: {
				type: String,
				
			}
		}
	}
</script>

<style>
	.txt{
		color: red;
	}

</style>
