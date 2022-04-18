<template>
	<view class="ud-input-field">
		<view class="cell">
			<view class="required" v-if="required">*</view>
			<view class="cell-label">{{ title }}</view>
			<view class="cell-content">
				<input
					class="cell-content-input form-contrl"
					:type="type == 'number' ? 'number' : type == 'text' ? 'text' : type == 'idcard' ? 'idcard' : ''"
					:value="value"
					@input="onInput"
					:placeholder="placeholder"
					placeholder-class="placeholder"
					v-if="!disabled"
				/>
				<view class="cell-content-input cell-readonly" v-if="disabled">{{ value }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'ud-input-field',
	props: {
		title: '',
		value: '',
		placeholder: '',
		required: {
			type: Boolean,
			default: () => false
		},
		type: {
			type: String,
			default: () => 'text'
		},
		disabled: {
			type: Boolean,
			default: () => false
		},
		arrow: {
			type: Boolean,
			default: () => false
		}
	},
	model: {
		props: 'value',
		event: 'change'
	},
	data() {
		return {};
	},
	methods: {
		onInput(e) {
			this.$emit('update:value', e.detail.value);
			this.$emit('input', e);
		}
	}
};
</script>

<style lang="scss" scoped>
.ud-input-field {
	border-bottom: 1px solid $pageBg;
	.cell {
		display: flex;
		justify-content: space-between;
		background-color: #ffffff;
		margin-top: 1px;
		padding: 30rpx 32rpx;
		box-sizing: border-box;
		.required {
			margin-right: 10rpx;
			color: #ef5e17;
		}
		.cell-label {
			width: 300rpx;
			font-size: 28rpx;
			color: $black;
		}
		.cell-content {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			overflow: hidden;
			.cell-content-input {
				width: 100%;
				color: $black;
				font-size: 30rpx;
				// font-weight: bold;
				text-align: right;
				&.form-contrl {
					margin-top: -4px;
					height: 40rpx;
					line-height: 40rpx;
				}
				&.cell-readonly {
					color: #aeb8c0;
				}
				&.fee {
					color: #ef5e17;
				}
				&.wrap {
					@include textoverflow;
				}
			}
			.placeholder {
				font-size: 28rpx;
				color: #aeb8c0;
				white-space: nowrap;
			}
		}
	}
}
</style>
