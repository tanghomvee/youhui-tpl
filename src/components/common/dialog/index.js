/*
* dialog组件
*
* @param title : 提示标题
* @param message : 提示消息
* @param confirmTxt : 确定按钮文字
* @param cancleTxt : 取消按钮文字
* @param confirmCallback : 确定回调
* @param cancleCallback : 取消回调
*
* 用法
* import dialog from '../components/common/dialog';
*
* dialog.toast("message")
*
* dialog.alert("title" , "message")
* dialog.alert({"title":"title" , message:"message"})
*
* dialog.confirm({"title":"title" , message:"message"})
*/ 



import dialog from './src/dialog.js';
export default dialog;



