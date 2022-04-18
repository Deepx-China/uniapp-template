<template>
	<view class="root">
		<view class="ud-list-card" v-if="!isLoop" @click="onClick">
			<view class="head">
				<view class="title">{{data[struct.title] || '未选择产品名称'}}</view>
				<view class="status" :style="{color: statusStyle[status]}" v-if="struct.status">{{status}}</view>
			</view>
			<view class="content">
				<view class="row" v-for="(item, i) in struct.content" :key="i" v-if="data[item]">
					<text class="label">{{i}}</text>
					<text class="text">{{data[item]}}</text>
				</view>
			</view>
		</view>
		
		<scroll-view class="ud-list" scroll-y v-if="isLoop">
			<view class="ud-list-card" v-for="(itemData, i) in data" :key="i" @click="onClick">
				<view class="head">
					<view class="title">{{itemData[struct.title] || '未选择产品名称'}}</view>
					<view class="status" :style="{color: statusStyle[status]}" v-if="struct.status">{{status}}</view>
				</view>
				<view class="content">
					<view class="row" v-for="(item, i) in struct.content" :key="i" v-if="itemData[item]">
						<text class="label">{{i}}</text>
						<text class="text">{{itemData[item]}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	name: 'ud-list-card',
	props: {
		isLoop: {
			type: Boolean,
			default: () => (false),
		},
		data: new Object,
		struct: {
			type: Object,
			default: () => (new Object),
		},
		statusStyle: {
			type: Object,
			default: () => (new Object),
		},
	},
	computed: {
		status() {
			return this.data[this.struct.status];
		},
	},
	methods: {
		onClick(e) {
			this.$emit('click', e)
		}
	}
};
</script>

<style lang="scss" scoped>
.ud-list {
	flex: 1;
	overflow: auto;
}
.ud-list-card{
	padding: 30rpx 32rpx;
	border-radius: 6rpx;
	background-color: $white;
	overflow: hidden;
	.head{
		@include flex-bt;
		.title{
			padding-bottom: 30rpx;
			flex: 1;
			font-size: 30rpx;
			font-weight: bold;
			@include textoverflow;
			border-bottom: 1px solid $pageBg;
		}
		.status{
			width: 100rpx;
			font-size: 26rpx;
			text-align: right;
		}
	}
	.content{
		.row{
			margin-top: 30rpx;
			font-size: 26rpx;
			.label{
				color: #AEB8C0;
			}
		}
	}
}
</style>
