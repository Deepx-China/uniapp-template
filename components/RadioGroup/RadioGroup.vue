<template>
	<radio-group class="checkbox-group" @change="onRadioChange">
		<slot />
	</radio-group>
</template>

<script>
	export default {
		name:"RadioGroup",
		data() {
			return {
				
			};
		},
		methods: {
			onRadioChange(e) {
				e.target.checked = e.detail.value;
				this.$emit('onChange', e)
			},
		}
	}
</script>

<style lang="scss" scoped>
.checkbox-group{
	width: 100%;
	display: flex;
	justify-content: flex-end;
}
</style>
