<template>
	<view class="checkbox" @click="check">
		<view class="iconfont" v-if="direction=='left'">{{ checked?'&#xe678;':'&#xe6c1;' }}</view>
		<view class="text">
			<slot />
		</view>
		<view class="iconfont right" v-if="direction=='right'">{{ checked?'&#xe678;':'&#xe6c1;' }}</view>
	</view>
</template>

<script>
	export default {
		props: {
			checked: {
				default: false, 
			},
			value: {
				default: '',
			}, 
			direction: {
				default: 'left',
			}
			
		},
		model: {
			props: 'checked',
			event: 'onChange'
		},
		data() {
			return {
				data: false,
			}
		},
		inject: {
			checkboxGroupContext: { default: undefined },
		},
		methods: {
			check(e) {
				e.target.checked = !this.checked;
				e.target.value = this.value;
				this.$emit('onChange', e);
				this.$emit('update:checked', e);
				if (this.checkboxGroupContext && this.checkboxGroupContext.onCheckboxChange) {
					this.checkboxGroupContext.onCheckboxChange(e);
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.checkbox{
	display: flex;
	align-items: center;
	font-size: 30rpx;
	.iconfont{
		font-size: 32rpx;
		color: $blue;
		margin-right: 20rpx;
		&.right{
			margin-right: auto;
			margin-left: 20rpx;
		}
	}
	.text{
		color: $black5;
	}
}
</style>
