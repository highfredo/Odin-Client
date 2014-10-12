'use strict';


var module = angular.module('listDocumentsModule', [])
    
module.factory('Documents',  function($resource) {
	return $resource($backendUrl+'document/:action/', {}, {
		list: {
			method: 'GET', 
			params: {
				action: 'list'
			}, 
			isArray: true
		}
	});
});

module.controller('listDocumentsCtrl', function ($scope, $resource, $state, $modal, Documents) {
	$scope.path = $state.params.path.split("/");
	
	Documents.list({path: "/" + $state.params.path}, function(result){
		$scope.documents = result;
	})
	
	$scope.viewDocument = function(docId) {
		var modalInstance = $modal.open({
		      templateUrl: 'views/view_document.html',
		      controller: 'viewDocumentCtrl',
		      resolve: {
		      	document: function () {
		      		return $.grep($scope.documents, function(doc){ return doc.id == docId; })[0];
		      	}
		      }
		});
		/*
		modalInstance.result.then(function (document) {
		      $scope.document = document; //TODO: renovar datos de verdad
		      var d = $.grep($scope.documents, function(doc){ return doc.id == docId; })[0]
		      d = document;
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		});*/
	}
	
});

module.controller('viewDocumentCtrl', function ($scope, $modalInstance, document) {
	
	document.name = "aaaaaa"
	
	//$scope.document = document;
	
	
	$scope.ok = function () {
		$modalInstance.close($scope.document);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
})



