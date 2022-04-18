<template>
	<view class="ud-list">
		<!-- 列表 -->
		<scroll-view class="list" scroll-y="true">
			<slot />
		</scroll-view>
	</view>
</template>

<script>
export default {
	name: 'ud-list',
	props: {
		list: {
			type: Array,
			default: () => ([])
		}
	},
	data() {
		return {
			
		};
	},
	methods: {
		onSearch(e) {
			this.searchText = e.detail.value;
		},
	}
};
</script>

<style lang="scss" scoped>
.ud-list {
	display: flex;
	height: 100vh;
	flex-direction: column;
	overflow: hidden;
	.list{
		flex: 1;
		padding: 0 32rpx 200rpx 32rpx;
		box-sizing: border-box;
		overflow: hidden;
	}
}
</style>
