<template>
	<view class="step">
		<view :class="['step-item', (current-1)==i?'active':'']" v-for="(item, i) in descriptions" :key="i">
			<view class="title">
				<view class="title">
					<view class="iconfont">{{ i==(descriptions.length-1)?'&#xe60b;':(i+1) }}</view>
				</view>
			</view>
			<view class="desc">{{ item }}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['descriptions', 'current'],
	name: 'Step',
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
$defaultColor: #acbcd2;
.step {
	padding: 46rpx 0 44rpx;
	display: flex;
	justify-content: space-between;
	.step-item {
		flex: 1;
		.title {
			position: relative;
			z-index: 0;
			&::after {
				position: absolute;
				left: calc(50% + 40rpx);
				top: 50%;
				content: '';
				width: calc(100% - 80rpx);
				height: 2px;
				z-index: -1;
				background-color: #ccd7e9;
			}
			.iconfont{
				margin: 0 auto;
				width: 48rpx;
				height: 48rpx;
				line-height: 48rpx;
				border-radius: 50%;
				overflow: hidden;
				text-align: center;
				color: $white;
				background-color: $defaultColor;
			}
		}
		.desc {
			margin-top: 20rpx;
			text-align: center;
			font-size: 24rpx;
			color: $defaultColor;
		}
		
		&.active{
			.title {
				.iconfont{
					background-color: $blue;
				}
			}
			.desc{
				color: $blue;
			}
		}
		
		&:last-child{
			.title {
				&::after {
					width: 0;
				}
			}
		}
	}
}
</style>
