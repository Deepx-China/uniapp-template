<template>
	<view class="">
		<view :class="['button', ghost?'ghost':'', link?'link':'', boxshadow?'boxshadow':'', disabled?'disabled':'']"
			:style="{
				color: ((ghost || link) && color && !disabled) ? color : '',
				backgroundColor: (!ghost && !link && color && !disabled) ? color : '',
				borderColor: (color && ghost && !disabled) ? color : '',
			}" 
			@click="onClick">
			<slot />
		</view>
	</view>
</template>

<script>
	export default {
		props: ['ghost', 'link', 'boxshadow', 'color', 'disabled'],
		data() {
			return {
				
			};
		},
		methods: {
			onClick(e) {
				this.$emit('click', e);
			}
		}
	}
</script>

<style lang="scss" scoped>
.button{
	height: 88rpx;
	line-height: 88rpx;
	font-size: 28rpx;
	border-radius: 44rpx;
	background-color: $blue;
	color: $white;
	text-align: center;
	transition: opacity 0.3s ease;
	&:active{
		opacity: 0.8;
	}
	&.disabled{
		color: $white;
		background-color: $black9;
		&:active{
			opacity: 1;
		}
	}
	&.ghost{
		background: none;
		border: 1px solid $blue;
		color: $blue;
		&.disabled{
			color: $black9;
			border-color: $black9;
		}
	}
	&.link{
		background: none;
		color: $blue;
		&.disabled{
			color: $black9;
		}
	}
	&.boxshadow{
		box-shadow: 0px 6rpx 16rpx 0px rgba(15, 93, 225, 0.35);
	}
}
</style>
