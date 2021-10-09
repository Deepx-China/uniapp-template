<template>
	<label class="checkbox">
		<view class="">
			<radio class="iconfont" :value="value" :checked="checked" color="#5192ff" />
		</view>
		<view class="text">
			<slot />
		</view>
	</label>
</template>

<script>
	export default {
		name: "Radio",
		props: {
			checked: {
				default: false, 
			},
			value: {
				default: '',
			}, 
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.checkbox{
	display: inline-flex;
	align-items: center;
	font-size: 30rpx;
	line-height: 0;
	.iconfont{
		font-size: 28rpx;
		color: $blue;
		transform:scale(0.72);
		border-color: $blue;
	}
	.text{
		margin-left: 6rpx;
		color: $black5;
	}
}
</style>
