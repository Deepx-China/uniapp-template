<template>
	<view class="container">
		<scroll-view class="content" :scroll-y="true">
			<view :class="['cell',isCheckbox ? 'showchecked' : '']" v-for="(item,i) in range" :key="item.pid"
				@click="isCheckbox ? MultipleCheck(item) : SingleCheck(item)">
				<view class="personinfo">
					<view class="baseinfo">
						<view class="name">{{item.name}}</view>
						<view class="job">{{item.position}}</view>
					</view>
					<view class="num">{{item.no}}</view>
				</view>
				<view class="address">{{item.address}}</view>
				<view :class="['check-icon', 'iconfont']" v-if="isCheckbox">
					{{ checked.includes(item.pid) !== false ? '&#xe678;' : '&#xe6c1;' }}
				</view>
			</view>
		</scroll-view>
		<view class="confirm" v-if="isCheckbox">
			<view class="choosebox">
				<view class="iconfont choose" @click="SelectAll">{{isSelectAll ? '&#xe678;' : '&#xe6c1;'}}</view>
				<view class="text"  @click="checkedBoxVisible = true">
					已选择({{followList?followList.length:''}})
					<view class="tip">(点击查看)</view>
				</view>
			</view>
			<view class="btn" @click="confirm">确定</view>
		</view>
		
		<!-- 已选择人员 -->
		<view :class="['checked-box',checkedBoxVisible? 'show' : '']">
			<view class="header">
				<view class="clearall" @click="clearall">清空</view>
				<view class="title">已选择同行人员</view>
				<view class="icon-close" @click="checkedBoxVisible = false"></view>
			</view>
			<scroll-view class="checked" :scroll-y="true">
				<view class="cell" v-for="(item, i) in followList" :key="item.Id">
					<view class="cell-title">{{ item.name }}</view>
					<view class="icon-del" @click="bindCheck(item)"></view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	// [{name: '张三', no: '213123', address: '23123', position: '经理'}]
	export default {
		name: "PersonList",
		props: {
			isCheckbox: {
				default: false,
			},
			range: {
				default: [],
			},
			rangeKey: {
				default: 'id'
			},
		},
		data() {
			return {
				checked: [],
				isSelectAll: false,
				followList: [],
				checkedBoxVisible: false,
			};
		},
		methods: {
			SingleCheck(row) {
				this.$emit('SingleCheck', row)
			},
			MultipleCheck(row) {
				let value = row.pid
				const checked = this.checked || [];
				if (checked.indexOf(value) === -1) {
					checked.push(value);
				} else if (checked.indexOf(value) !== -1) {
					checked.splice(checked.indexOf(value), 1);
				}
				this.checked = checked;
				//是否全选
				if (this.checked.length == this.range.length) {
					this.isSelectAll = true;
				} else {
					this.isSelectAll = false;
				}
				let range = this.range
				let list = []
				this.checked.forEach(i => {
					Object.keys(range).forEach(j => {
						if(i == range[j].pid){
							list.push(range[j])
						}
					})
				})
				this.followList = list
				this.$emit('followList', this.followList)
			},
			SelectAll(){
				if (this.checked) {
					if (this.checked.length != this.range.length) {
						this.isSelectAll = true;
						const checked = []
						this.range.forEach(item => {
							checked.push(item.pid);
						})
						this.checked = checked;
					}else{
						this.checked = []
						this.isSelectAll = false;
					}
				} else {
					this.isSelectAll = false;
					this.checked = [];
				}
				let range = this.range
				let list = []
				this.checked.forEach(i => {
					Object.keys(range).forEach(j => {
						if(i == range[j].pid){
							list.push(range[j])
						}
					})
				})
				this.followList = list
				this.$emit('followList', this.followList)
			},
			confirm(){
				this.$emit('confirm')
			},
			clearall() {
				this.cache.del('followList');
				this.checked = [];
				this.followList = [];
				this.isSelectAll = false;
			},
			bindCheck(row) {
				if (this.checked.includes(row.pid) === false) {
					this.checked.push(row.pid);
					this.followList.push(row);
					// 计算是否达到全选
					this.selectAll();
				} else {
					this.isSelectAll = false;
					let checked = [];
					this.followList = this.followList.filter(item => {
						if (item.pid != row.pid) {
							checked.push(item.pid);
							return true;
						}
						return false;
					});
					this.checked = checked;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		height: 88vh;

		.content {
			flex: 1;
			overflow: hidden;

			.cell {
				position: relative;
				margin-bottom: 1px;
				padding: 30rpx 32rpx;
				background-color: #FFFFFF;
				margin-bottom: 12rpx;


				&.showchecked {
					width: 610rpx;
				}

				&:last-child {
					margin-bottom: 150rpx;
				}

				&:first-child {
					margin-top: 18rpx;
				}

				.personinfo {
					display: flex;
					justify-content: space-between;

					.baseinfo {
						display: flex;
						justify-content: flex-start;

						.name {
							font-size: 28rpx;
							color: #283036;
							white-space: nowrap;
							margin-right: 16rpx;
						}

						.job {
							font-size: 20rpx;
							color: #5591F0;
							line-height: 36rpx;
							padding: 0 12rpx;
							background-color: #FFFFFF;
							border: 1px solid #5591F0;
							border-radius: 4rpx;
						}
					}

					.num {
						font-size: 26rpx;
						color: #283036;
					}
				}

				.address {
					margin-top: 20rpx;
					font-size: 26rpx;
					color: #ACBCD2;
				}

				.check-icon {
					position: absolute;
					right: -50rpx;
					top: 80rpx;
					color: $blue;
				}
			}
		}

		.confirm {
			height: 140rpx;
			display: flex;
			justify-content: space-between;
			padding: 30rpx 32rpx;
			box-sizing: border-box;
			background-color: #FFFFFF;
			border-top: 1px solid $pageBg;

			.choosebox {
				flex: 1;
				color: $blue;
				display: flex;
				justify-content: flex-start;

				.choose {
					margin-top: 24rpx;
					margin-right: 10rpx;
				}

				.text {
					flex: 1;
					position: relative;
					color: $blue;
					line-height: 80rpx;
					margin-left: 10rpx;

					.tip {
						position: absolute;
						top: 30rpx;
						left: 0rpx;
						font-size: 20rpx;
						color: #ACBCD2;
					}
				}
			}
			.btn{
				height: 88rpx;
				line-height: 88rpx;
				font-size: 28rpx;
				border-radius: 15rpx;
				padding: 0 130rpx;
				background-color: $blue;
				color: $white;
				text-align: center;
				transition: opacity 0.3s ease;
			}
		}
		.checked-box{
			display: flex;
			flex-direction: column;
			position: fixed;
			top: 80rpx;
			left: 0;
			width: 100%;
			height: 100vh;
			visibility: hidden;
			overflow: hidden;
			background-color: $white;
			&.show{
				visibility: visible;
			}
			.header{
				position: relative;
				display: flex;
				height: 88rpx;
				line-height: 44rpx;
				border-bottom: 1px solid $pageBg;
				.clearall {
					position: absolute;
					left: 32rpx;
					top: 0;
					line-height: 88rpx;
					color: $red;
				}
				.title {
					width: 100%;
					text-align: center;
				}
				.icon-close{
					position: absolute;
					right: 32rpx;
					top: 28rpx;
					width: 30rpx;
					height: 30rpx;
					background-color: $black9;
				}
			}
			.checked {
				flex: 1;
				overflow: hidden;
				padding-bottom: 200rpx;
				box-sizing: border-box;
				.cell{
					position: relative;
					display: flex;
					justify-content: space-between;
					padding: 20rpx 30rpx;
					&::after {
						position: absolute;
						bottom: 0;
						left: 0;
						width: 100%;
						height: 1px;
						background-color: $pageBg;
						content: '';
					}
					.cell-title{
						align-items: center;
						font-size: 30rpx;
						color: $black5;
					}
					.icon-del{
						margin-top: 10rpx;
						width: 20rpx;
						height: 20rpx;
						background-color: $black9;
					}
				}
			}
		}
	}
</style>
