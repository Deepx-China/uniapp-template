<template>
	<view class="ud-textarea-field">
		<view class="title">
			<text class="required" v-if="required">*</text>
			<text>{{ title }}</text>
			<text class="desc">{{ desc }}</text>
		</view>
		<textarea class="content" auto-height :value="value" placeholder-style="font-size:28rpx;color:#AEB8C0;" :placeholder="placeholder" @input="onInput" :disabled="disabled" />
	</view>
</template>

<script>
export default {
	name: 'ud-textarea-field',
	props: {
		title: '',
		desc: '',
		value: '',
		placeholder: '',
		disabled: {
			type: Boolean,
			default: () => false
		},
		required: {
			type: Boolean,
			default: () => false
		}
	},
	model: {
		props: 'value',
		event: 'input'
	},
	methods: {
		onInput(e) {
			this.$emit('update:value', e.detail.value);
		}
	}
};
</script>

<style lang="scss" scoped>
.ud-textarea-field {
	position: relative;
	padding: 0 32rpx 32rpx 32rpx;
	box-sizing: border-box;
	background-color: $white;
	overflow: hidden;
	&::before,
	&::after {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 1px;
		content: '';
		background-color: $pageBg;
	}
	&::after {
		top: auto;
		bottom: 0;
	}
	.title {
		height: 100rpx;
		line-height: 100rpx;
		font-size: 28rpx;
		.required {
			margin-right: 10rpx;
			color: #ef5e17;
			font-size: 36rpx;
		}
		.desc {
			color: #aeb8c0;
		}
	}
}
</style>
