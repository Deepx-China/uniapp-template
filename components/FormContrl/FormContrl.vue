<template>
	<view :class="['form-contrl', required ? 'required' : '', border ? 'border' : '']">
		<view class="icon-required" v-if="required">*</view>
		<label class="title">{{ label }}</label>
		<view class="content"><slot /></view>
		<view class="iconfont" v-if="arrow">&#xe6a3;</view>
	</view>
</template>

<script>
export default {
	props: ['label', 'required', 'border', 'arrow'],
	name: 'TextField',
	data() {
		return {};
	},
	methods:{
	}
};
</script>

<style lang="scss" scoped>

.form-contrl {
	position: relative;
	display: flex;
	justify-content: space-between;
	padding: 30rpx;
	box-sizing: border-box;
	overflow: hidden;
	&.required {
		.icon-required{
			@include horizontal-center;
			color: $red;
			font-size: 20rpx;
		}
		.title {
			margin-left: 20rpx;
		}
	}
	
	&.border {
		&::after {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 1px;
			content: '';
			background-color: $pageBg;
		}
	}
	.title {
		width: 220rpx;
		font-size: 28rpx;
	}
	.content {
		flex: 1;
		display: flex;
		justify-content: flex-end;
		overflow: hidden;
		margin-top: 10rpx;
	}
	.iconfont {
		@include horizontal-center;
		overflow: hidden;
		color: #acbcd2;
		font-size: 26rpx;
		margin-left: 20rpx;
	}
}
</style>
