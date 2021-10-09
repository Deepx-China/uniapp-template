<template>
	<view class="cell">
		<view class="cell-title">{{title}}</view>
		<view :class="['cell-text',disable?'cell-dtext':'',reason?'cell-Rtext':'']">{{text}}</view>
	</view>
</template>

<script>
	export default {
		props: ['title', 'text', 'disable', 'reason'],
		name: "Cell",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.cell {
		margin-top: 30rpx;
		display: flex;
		justify-content: flex-start;

		.cell-title {
			margin-top: 2rpx;
			font-size: 26rpx;
			color: #AEB8C0;
			white-space: nowrap;
			margin-right: 20rpx;
		}

		.cell-text {
			flex: 1;
			font-size: 26rpx;
			color: #283036;

			&.cell-dtext {
				flex: 1;
				font-size: 26rpx;
				color: #AEB8C0;
			}
			&.cell-Rtext{
				flex: 1;
				font-size: 26rpx;
				color: #5292FF;
			}
		}
	}
</style>
