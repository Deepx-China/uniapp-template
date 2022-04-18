<template>
	<view :class="['button', ghost?'ghost':'', link?'link':'', shadow?'boxshadow':'', disabled?'disabled':'']" 
		:style="{
			color: ((ghost || link) && color && !disabled) ? color : '',
			backgroundColor: (!ghost && !link && color && !disabled) ? backgroundColor : '',
			borderColor: (ghost && !disabled) ? borderColor : '',
		}" @click="onClick">
		<slot />
	</view>
</template>

<script>
	export default {
		name: "ud-button",
		props: {
			ghost: {
				type: Boolean,
				default: () => (false)
			},
			link: {
				type: Boolean,
				default: () => (false)
			},
			disabled: {
				type: Boolean,
				default: () => (false)
			},
			rateLimit: {
				type: Boolean,
				default: () => (false)
			},
			shadow: {
				type: Boolean,
				default: () => (false)
			},
			color: {
				type: String,
				default: () => ("#ffffff")
			},
			backgroundColor: {
				type: String,
				default: () => ("#5192ff")
			},
			borderColor: {
				type: String,
				default: () => ("#5192ff")
			},
		},
		data() {
			return {
				clickRateLimit: false,
			};
		},
		methods: {
			onClick(e) {
				if (this.rateLimit) {
					if (this.clickRateLimit) {
						return;
					}
					this.clickRateLimit = setTimeout(()=>{
						clearTimeout(this.clickRateLimit);
						this.clickRateLimit = false;
					}, 3000);
				}
				this.$emit('click', e);
			}
		}
	}
</script>

<style lang="scss" scoped>
.button{
	width: 100%;
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
