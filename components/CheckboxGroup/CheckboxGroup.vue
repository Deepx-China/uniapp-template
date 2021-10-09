<template>
	<view class="checkbox-group">
		<slot />
	</view>
</template>

<script>
	export default {
		props: {
			values: Array
		},
		provide() {
		    return {
				checkboxGroupContext: this,
		    };
		},
		mounted() {
			
		},
		data() {
			return {};
		},
		methods: {
			onCheckboxChange(e) {
				let checked = e.target.checked;
				const value = e.target.value;
				const _values = this.values || [];
				if (_values.indexOf(value) === -1) {
					_values.push(value);
				} else if (_values.indexOf(value) !== -1) {
					_values.splice(_values.indexOf(value), 1);
				}
				e.target.checked = _values;
				delete e.target.value;
				this.$emit('update:values', _values);
				this.$emit('onChange', e);
			},
			emptyAll() {
				this.values = [];
				this.$children.forEach(node => {
					node.data = false
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
