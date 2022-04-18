<template>
	<view class="ud-upload">
		<view class="title">
			<text class="required" v-if="required">*</text>
			<text>{{ title }}</text>
		</view>
		<view class="tip">{{ tip }}</view>
		<view class="images">
			<view
				class="image-box"
				:style="{
					gridTemplateRows: `repeat(${(value.length + 1) % 4}, 140rpx)`
				}"
				v-for="(img, i) in value"
				:key="i"
			>
				<view class="close iconfont" @click="delImgList(i)" v-if="!disabled">&#xe715;</view>
				<view class="image" @click="previewImag(i)"><image style="width: 100%; height: 100%;" :src="img"></image></view>
			</view>
			<view class="btn iconfont" @click="chooseImage" v-if="!disabled">&#xe732;</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'ud-upload',
	props: {
		disabled: {
			type: Boolean,
			default: () => false
		},
		value: {
			type: Array,
			default: () => new Array()
		},
		required: {
			type: Boolean,
			default: () => false
		},
		title: {
			type: String,
			default: () => ''
		},
		tip: {
			type: String,
			default: () => ''
		}
	},
	model: {
		props: 'value',
		event: 'change'
	},
	methods: {
		chooseImage() {
			if (this.disabled) return;
			let value = JSON.parse(JSON.stringify(this.value));
			dd.chooseImage({
				count: 99,
				success: res => {
					dd.showLoading({
						content: '上传中...'
					});
					dd.compressImage({
						filePaths: res.filePaths,
						compressLevel: 2,
						success: async res => {
							for (let i = 0; i < res.filePaths.length; i++) {
								let cPath = await this.uploadFile(res.filePaths[i]);
								value.push(cPath);
							}
							this.$emit('change', value);
							this.$emit('update:value', value);
							dd.hideLoading();
						}
					});
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		async uploadFile(filepath) {
			return new Promise((rs, rj) => {
				dd.uploadFile({
					url: 'http://app.zhifeishengwu.com:1122/RpcCommon/?api=WebMobileApp.oa.HandlerOfficeExpensePay,WebMobileApp&act=FileUpLoad',
					fileType: 'image',
					fileName: 'file',
					filePath: filepath,
					success: up => {
						if (up.statusCode == 200) {
							up = typeof up.data == 'object' ? up.data : JSON.parse(up.data);
							if (up.status == 200) {
								rs(up.back.url);
							} else {
								console.error(up);
							}
						}
					}
				});
			});
		},
		previewImag(i) {
			dd.previewImage({
				current: i,
				urls: this.value
			});
		},
		delImgList(i) {
			if (this.disabled) return;
			this.value.splice(i, 1);
		}
	}
};
</script>

<style lang="scss" scoped>
.ud-upload {
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
	}
	.tip {
		color: #919aa1;
		font-size: 24rpx;
	}
	.images {
		margin-top: 30rpx;
		display: grid;
		grid-row-gap: 20rpx;
		grid-column-gap: 20rpx;
		grid-template-columns: repeat(4, 1fr);
		.image-box {
			position: relative;
			.image {
				display: block;
				width: 100%;
				height: 140rpx;
				overflow: hidden;
			}
			.close {
				position: absolute;
				top: -14rpx;
				right: -14rpx;
				width: 36rpx;
				height: 36rpx;
				line-height: 36rpx;
				color: $white;
				border-radius: 50%;
				font-size: 24rpx;
				text-align: center;
				background-color: #cdd5dc;
			}
		}
		.btn {
			line-height: 140rpx;
			text-align: center;
			font-size: 40rpx;
			color: #6a7e9a;
			border: 1px dashed #6a7e9a;
			border-radius: 16rpx;
		}
	}
}
</style>
