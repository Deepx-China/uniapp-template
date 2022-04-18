<template>
	<view class="ud-search">
		<!-- 条件筛选栏目 -->
		<view class="condition">
			<view class="search">
				<i class="iconfont">&#xe6d2;</i>
				<input type="search" @input="oninput" @confirm="onsearch" placeholder-class="search-tip" placeholder="搜索名称" />
			</view>
			<view :class="['other', conditionVisible ? 'active' : '']" @click="setCondition()">
				<text>筛选</text>
				<text class="iconfont">&#xe7b7;</text>
			</view>
		</view>
		<!-- 条件筛选详情 -->
		<view :class="['condition-detail', conditionVisible ? 'show' : '']">
			<scroll-view class="content">
				<view class="item" v-for="(item, i) in condition" :key="i">
					<view class="title">{{ item.title }}</view>
					<view class="tags">
						<view :class="['tag', data[item.field] === oitem.id ? 'active' : '']" v-for="oitem in item.tags" :key="oitem.id" @click="active(item, oitem)">
							{{ oitem.text }}
						</view>
					</view>
				</view>
				<view class="footer">
					<view class="btn reset" @click="reset">重置</view>
					<view class="btn confirm" @click="confirm">确定</view>
				</view>
			</scroll-view>
			<view class="overly"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"ud-input-search",
		props: {
			search: {
				type: "",
				default: () => (""),
			},
			condition: {
				type: Array,
				default: () => (new Array),
			},
		},
		model: {
			props: 'search',
			event: 'change',
		},
		data() {
			return {
				conditionVisible: false,
				data: {},
			};
		},
		methods: {
			reset() {
				this.data = {};
				this.$emit('update:search', {});
			},
			confirm() {
				this.$emit('update:search', this.search);
				this.$emit('search', this.search);
				this.conditionVisible = false;
			},
			setCondition() {
				this.conditionVisible = !this.conditionVisible;
			},
			active(row, oitem) {
				this.search[row.field] = oitem.id; 
				this.$set(this.data, row.field, oitem.id);
				this.$emit('update:search', this.search);
			},
			oninput(e) {
				this.$emit('update:search', e.detail.value);
			},
			onsearch() {
				this.$emit('search', this.search);
			},
		},
	}
</script>

<style lang="scss" scoped>
.ud-search{
	.condition {
		@include flex-bt;
		margin-top: 1px;
		padding: 20rpx 32rpx;
		box-sizing: border-box;
		overflow: hidden;
		background-color: $white;
		.search {
			position: relative;
			flex: 1;
			border-radius: 70rpx;
			overflow: hidden;
			.iconfont {
				position: absolute;
				top: 0;
				left: 20rpx;
				line-height: 70rpx;
				font-size: 40rpx;
				color: $black9;
				z-index: 10;
			}
			input {
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
				font-size: 24rpx;
				padding-left: 70rpx;
				color: $black9;
				box-sizing: border-box;
				background-color: #f5f9fc;
			}
		}
		.other {
			position: relative;
			padding: 0 64rpx 0 32rpx;
			margin-left: 14rpx;
			height: 70rpx;
			line-height: 70rpx;
			color: $blue;
			text-align: center;
			border-radius: 70rpx;
			font-size: 26rpx;
			background-color: #f5f9fc;
			border: 1px solid $blue;
			overflow: hidden;
			&.active {
				color: $white;
				background-color: $blue;
				.iconfont{
					transform: rotate(180deg);
				}
			}
			.iconfont {
				transition: all 0.3s ease;
				position: absolute;
				top: 2rpx;
				right: 30rpx;
				transform: rotate(0);
			}
		}
	}
	.condition-detail {
		visibility: hidden;
		position: fixed;
		top: 170rpx;
		left: 0;
		width: 100%;
		height: calc(100vh - 170rpx);
		overflow: hidden;
		transition: all 0.3s ease;
		background-color: rgba($color: #000000, $alpha: 0);
		z-index: 999;
		&.show {
			visibility: visible;
			background-color: rgba($color: #000000, $alpha: 0.8);
			.content {
				transform: translateY(0);
			}
		}
		.content {
			transition: all 0.5s ease;
			transform: translateY(-100vh);
			background-color: $white;
			box-sizing: border-box;
			overflow: hidden;
			.item {
				padding: 30rpx 0;
				border-top: 1px solid $pageBg;
				.title {
					padding: 0 32rpx;
					font-size: 30rpx;
					font-weight: bold;
					box-sizing: border-box;
					overflow: hidden;
				}
				.tags {
					display: flex;
					flex-wrap: wrap;
					.tag {
						transition: all 0.3s ease;
						margin-top: 30rpx;
						margin-left: 20rpx;
						padding: 22rpx 30rpx;
						font-size: 26rpx;
						box-sizing: border-box;
						border-radius: 70rpx;
						color: $black5;
						overflow: hidden;
						border: 1px solid #f5f9fc;
						background-color: #f5f9fc;
						&.active {
							color: $blue;
							border: 1px solid $blue;
						}
					}
				}
			}
			.footer{
				@include flex-bt;
				margin-top: 50rpx;
				padding: 30rpx 32rpx;
				box-sizing: border-box;
				border-top: 1px solid $pageBg;
				overflow: hidden;
				.btn{
					flex: 1;
					height: 90rpx;
					line-height: 90rpx;
					text-align: center;
					font-size: 28rpx;
					border-radius: 90rpx;
					border: 1px solid #ACBCD2;
					&:last-child{
						margin-left: 14rpx;
					}
					&.confirm{
						color: $white;
						border: 1px solid $blue;
						background-color: $blue;
					}
				}
			}
		}
	}
}
</style>
