<template>
	<view class="tabs">
		<view :class="['tab', active===item.id?'active':'']" 
				v-for="(item,i) in tabTitles" 
				:key="i"
				@click="bindChange(item.id)">
			{{item.text}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "ud-tabs",
		props: {
			active: {
				type: Number,
				default: () => (0)
			},
			tabTitles: {
				type: Array,
				default: () => (new Array)
			},
		},
		model: {
			prop: 'active',
			event: 'change'
		},
		methods: {
			bindChange(e) {
				this.$emit('update:active', e)
				this.$emit('change', e)
			},
		}
	}
</script>

<style lang="scss" scoped>
.tabs{
	width: 100%;
	display: flex;
	justify-content: space-between;
	background-color: $white;
	.tab{
		position: relative;
		flex: 1;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		font-size: 28rpx;
		color: $black5;
		&.active{
			color: $black;
			font-weight: bold;
		}
		&.active::before{
			position: absolute;
			bottom: 0;
			left: 50%;
			width: 60rpx;
			height: 4rpx;
			content: '';
			transform: translate(-50%, 50%);
			background-color: $blue;
		}
	}
}
</style>
