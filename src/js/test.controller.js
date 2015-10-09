(function() {
	'use strict';

	angular
		.module('demo')
		.controller('testController', testController);

	/** @ngInject */
	function testController($scope) {
		console.log('TEST');

		$scope.$on("video.playing", function(){
			// perform action
		});

	}

})();
