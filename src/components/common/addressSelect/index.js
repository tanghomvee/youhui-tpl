/*
* addressPicker组件
*
	 * 使用：
	 * 1.必须传一个props:'addressShow'，布尔值，控制地址选择器显示与否
	 * 2.自定义ok和cancel事件，表示当address-picker组件点击确定按钮和取消按钮的操作，
	 * 3.ok事件将当前选中的省市区传给父组件事件，cancel事件让父组件的addressShow值变为false
*/ 



import addressPicker from './src/address-picker.vue';
export default addressPicker;



