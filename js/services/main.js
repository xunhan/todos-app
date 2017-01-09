/**
 * Created by Chenxi on 2017/1/7.
 */
(function(angular){
	'use strict';

	//注册一个新的模块
	//业务逻辑必须度出现在服务中（专门定义业务逻辑）
	angular.module('app.services.main',[])
		.factory('MainFactory',['$window',function($window){
			//factory服务 综合命名空间
			var storage = $window.localStorage;
			var todoData = storage['todoList'] ? JSON.parse(storage['todoList']) : [];
			//全选切换
			var flag = true;
			var factory = {

				/*-行为-*/
				actions:{
					//暴露方法数据
					get : function(){
						return todoData;
					},
					//存储数据
					save : function(){
						storage['todoList'] = JSON.stringify(todoData);
					},
					//添加事情
					addThings : function(text){
						todoData.push({
							id:+new Date(),
							text:text,
							completed:false
						});
						this.save();
					},
					//移除事情
					removeThings : function(id){
						for(var i= 0,len=todoData.length;i<len;i++){
							if(todoData[i].id === id){
								todoData.splice(i,1);
								break;
							}
						}
						this.save();
					},
					//清除已完成
					clearCompleted : function(){
						var temp =[];
						for(var i= 0,len=todoData.length;i<len;i++){
							if(!todoData[i].completed){
								temp.push(todoData[i]);
							}
						}
						todoData = temp;
						this.save();
						// 将todoData重指向一个新的地址
						return todoData;
					},
					//清除选项显示与隐藏
					existCompleted : function(){
						for(var i= 0,len=todoData.length;i<len;i++){
							if(todoData[i].completed){
								return true;
							}
						}
						return false;
					},
					//全选切换
					toggleAll : function(){
						for(var i = 0,len=todoData.length;i < len;i++){
							todoData[i].completed = flag;
						}
						flag = !flag;
						this.save();
					}
				}
			};
			return factory;
		}])

})(angular)
