(function (angular) {
	'use strict';
	/*
	* todoMvc
	* */
	//为应用程序创建模块，管理界面的结构
    var myApp = angular.module('app',['ngRoute', 'app.controllers.main']);

	myApp.config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/:status?',{
				controller: 'MainController',
				templateUrl: 'mainTmp'
			})
			.otherwise({
				redirectTo: '/'
			})
	}]);

		//$location.path()方法；
		//$watch 只能监视属于$scope的成员
		//window.$loc = $location;
	/*	$scope.$watch('$location.path()',function(newO,oldO){
			switch (newO){
				case '/active':
					$scope.filterAll = {completed:false};
					break;
				case '/completed':
					$scope.filterAll = {completed:true};
					break;
				default:
					$scope.filterAll = {};
					break;
			}
		})*/
})(angular);
