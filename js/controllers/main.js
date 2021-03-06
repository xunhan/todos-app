/**
 * Created by Chenxi on 2017/1/7.
 */
(function(angular){
	'use strict';

	//独立的模块
	var controllers = angular.module('app.controllers.main',['app.services.main']);

	controllers.controller('MainController',[
		'$scope','$routeParams','$route','MainService',
		function($scope,$routeParams,$route,MainService){
			//文本框
			$scope.text = "";
			$scope.todoData = MainService.get();
			//添加事情
			$scope.addThings = function(){
				// 参数校检 界面逻辑
				if(!$scope.text) return;
				MainService.addThings($scope.text);

				//清空文本框
				$scope.text = '';
			}

			//删除
			$scope.removeThings = function(id){
				MainService.removeThings(id);
			}

			//清空已完成
			$scope.clearCompleted = function(){
				var newTodo = MainService.clearCompleted();
				$scope.todoData = newTodo;
			}

			//是否已经完成
			$scope.existCompleted = function(){
				return MainService.existCompleted();
			}

			//双击编辑
			//双击编辑状态
			$scope.selectEditing=function(item){
				$scope.selectedEditing = item;
			}

			//全选切换
			$scope.toggleAll = function(){
				MainService.toggleAll();
			}

			//状态筛选
			//去除路由中匹配出来的数据
			var status = $routeParams.status;
			switch (status){
				case 'active':
					$scope.filterAll = {completed:false};
					$scope.toggleFil = 'active';
					break;
				case 'completed':
					$scope.filterAll = {completed:true};
					$scope.toggleFil = 'completed';
					break;
				default:
					$route.updateParams({ status: ''})
					$scope.filterAll = {};
					$scope.toggleFil = false;
					break;
			}

			//自定义比较器
			$scope.filterCompare = function(source,target){
				return source === target;
			}

			//起始样式切换
			$scope.whenShow = function(){
				if($scope.todoData.length){
					return true;
				}
				return false;
			}
		}
	])
})(angular)
