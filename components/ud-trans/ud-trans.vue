<template>
	<view class="zfui-trans">
		<view class="trans-title">审批进程</view>
		<view :class="['trans-tree', i == trans.length - 1 ? 'active' : '']" v-for="(item, i) in trans" :key="i">
			<view class="trans-datetime">
				<view :class="['trans-time', i == trans.length - 1 ? 'trans-now' : '']">{{ item.D_TransactionBegin.split(' ')[0] }}</view>
				<view :class="['trans-time', i == trans.length - 1 ? 'trans-now' : '']">{{ item.D_TransactionBegin.split(' ')[1] }}</view>
			</view>
			<view class="trans-progress"></view>
			<view class="trans-info">
				<view :class="['trans-position', i == trans.length - 1 ? '' : 'old']">{{ item.C_QueueName }}</view>
				<view class="trans-info-content">
					<view class="trans-info-content--name">{{ item.blr || '' }}</view>
					<view v-if="i != 0" :class="['trans-info-content--status', item.action == '同意' ? 'info' : 'error']">{{ item.action }}</view>
				</view>
				<view class="trans-info-reason" v-show="item.C_TransactionComment">理由：{{ item.C_TransactionComment }}</view>
				<!-- <view class="trans-complete">
					已完成
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'zfui-trans',
	props: {
		trans: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
.zfui-trans {
	margin-top: 30rpx;
	padding: 28rpx 32rpx;
	box-sizing: border-box;
	background-color: #ffffff;
	.trans-title {
		font-size: 32rpx;
		color: #283036;
		font-weight: 800;
	}
	.trans-tree {
		display: flex;
		justify-content: space-between;
		margin-top: 30rpx;
		.trans-datetime {
			width: 150rpx;
			font-size: 24rpx;
			color: $black9;
			text-align: right;
			.trans-time {
				margin-top: 20rpx;
			}
			.trans-now {
				font-size: 26rpx;
				color: #5292ff;
			}
		}
		.trans-progress {
			width: 60rpx;
			position: relative;
			&::before {
				position: absolute;
				top: 10rpx;
				left: 50%;
				width: 10rpx;
				height: 10rpx;
				margin-left: -5rpx;
				border-radius: 50%;
				content: '';
				background-color: #cdd2de;
			}
			&::after {
				position: absolute;
				top: 20rpx;
				left: 50%;
				width: 1px;
				height: calc(100% + 20rpx);
				border-radius: 50%;
				content: '';
				background-color: #cdd2de;
			}
		}
		&:last-child {
			.trans-progress {
				&::after {
					height: 0;
				}
			}
		}
		&.active {
			.trans-progress {
				&::before {
					width: 16rpx;
					height: 16rpx;
					background-color: #5292ff;
					margin-left: -8rpx;
				}
			}
		}
		&.compelete {
			.trans-progress {
				&::before {
					width: 26rpx;
					height: 26rpx;
					background-color: #2ccab7;
					margin-left: -13rpx;
				}
			}
		}
		.trans-info {
			flex: 1;
			.trans-position {
				font-size: 24rpx;
				color: #5292ff;
				margin-bottom: 10rpx;
				&.old {
					color: $black5;
				}
			}
			.trans-info-content {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				.trans-info-content--name {
					font-size: 28rpx;
					color: #283036;
				}
				.trans-info-content--status {
					margin-left: 20rpx;
					padding: 4rpx 10rpx;
					border-radius: 8rpx;
					font-size: 24rpx;
					&.info {
						color: #5292ff;
						background-color: #edf4ff;
					}
					&.error {
						color: #fa6412;
						background-color: #fff3ed;
					}
				}
			}
			.trans-info-status {
				margin-top: 16rpx;
				font-size: 24rpx;
				color: #868891;
			}
			.trans-info-reason {
				margin-top: 24rpx;
				font-size: 20rpx;
				color: #999999;
			}
			.trans-complete {
				font-size: 24rpx;
				color: #2ccab7;
			}
		}
	}
}
</style>
