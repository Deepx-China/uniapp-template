<template>
	<view class="zfui-field">
		<picker mode="selector" :value="pickerValueIdx" :range="pickerRange" :range-key="pickerRangeKey" @change="pickerChange" :disabled="disabled" v-if="isPicker">
			<view class="cell">
				<view class="required" v-if="required">*</view>
				<view class="cell-label">{{ title }}</view>
				<view class="cell-content">
					<view :class="['cell-content-input', rowWrap?'':'wrap', disabled?'cell-readonly':'']" v-if="value !== ''">{{ pickerValueText }}</view>
					<view class="cell-content-input cell-readonly" v-if="value === ''">{{placeholder}}</view>
					<view class="cell-arrow iconfont" v-if="arrow && !disabled">&#xe714;</view>
				</view>
			</view>
		</picker>
		
		<view class="cell" v-if="!isPicker && !isTarget">
			<view class="required" v-if="required">*</view>
			<view class="cell-label">{{ title }}</view>
			<view class="cell-content">
				<input class="cell-content-input form-contrl" type="text" :value="value" @input="onInput" :placeholder="placeholder" v-if="!disabled" />
				<view class="cell-content-input cell-readonly" v-if="disabled">{{value}}</view>
				<view class="cell-arrow iconfont" v-if="arrow && !disabled">&#xe714;</view>
			</view>
		</view>
		
		<view class="cell" v-if="isTarget" @click="onClick">
			<view class="required" v-if="required">*</view>
			<view class="cell-label">{{ title }}</view>
			<view class="cell-content">
				<view :class="['cell-content-input', rowWrap?'':'wrap', disabled?'cell-readonly':'']" v-if="value !== ''">{{ value }}</view>
				<view class="cell-content-input cell-readonly" v-if="value === ''">{{placeholder}}</view>
				<view class="cell-arrow iconfont" v-if="arrow && !disabled">&#xe714;</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'zfui-field',
	props: {
		title: {
			type: String,
			default: () => (''),
		},
		type: {
			type: String,
			default: () => ('text'),
		}, 
		placeholder: {
			type: String,
			default: () => (''),
		},  
		value: {
			type: String,
			default: () => (''),
		},
		arrow: {
			type: Boolean,
			default: () => (false),
		},
		isTarget: {
			type: Boolean,
			default: () => (false),
		}, 
		isPicker: {
			type: Boolean,
			default: () => (false),
		}, 
		pickerValue: {
			type: Number,
			default: () => (0),
		},
		pickerRange: {
			type: Array,
			default: () => (new Array),
		},
		pickerRangeKey: {
			type: String,
			default: () => ('text'),
		},
		disabled: {
			type: Boolean,
			default: () => (false),
		},
		required: {
			type: Boolean,
			default: () => (false),
		},
		rowWrap: {
			type: Boolean,
			default: () => (false),
		},
	},
	model: {
		props: 'value',
		event: 'change'
	},
	data() {
		return {
			pickerValueIdx: '',
			pickerValueText: '',
		};
	},
	watch: {
		pickerRange() {
			if (/^[0-9]+$/.test(this.value)) {
				this.pickerRange.forEach((item, i) => {
					if (item.id == this.value) {
						this.pickerValueIdx = i;
					}
				});
				if (this.pickerValueIdx !== '') {
					this.pickerValueText = this.pickerRange[this.pickerValueIdx.toString()][this.pickerRangeKey];
				}
			}
		},
	},
	methods: {
		pickerChange(e) {
			this.$emit('update:value', this.pickerRange[e.detail.value].id.toString());
			this.pickerValueText = this.pickerRange[e.detail.value][this.pickerRangeKey];
			this.pickerValueIdx = e.detail.value;
		},
		onClick(e) {
			if (this.disabled) return;
			this.$emit('click', e);
		},
		onInput(e) {
			this.$emit('update:value', e.detail.value);
		},
	}
};
</script>

<style lang="scss" scoped>
.zfui-field {
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
				font-weight: bold;
				text-align: right;
				&.form-contrl{
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
				&.wrap{
					@include textoverflow;
				}
			}
			.cell-arrow,
			.cell-unit {
				margin-left: 20rpx;
			}
			.cell-arrow {
				color: #aeb8c0;
				font-size: 26rpx;
			}
			.cell-unit {
				font-size: 26rpx;
				color: $black;
				font-weight: 800;
			}
		}
	}
}
</style>
