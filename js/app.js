var app = angular.module('app', []);

app.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.rate = {};
    $scope.filtredCountry = [];
    $scope.content = true;
    $scope.disclaimer = true;
    $scope.show = function() {
        $scope.content = false;
    }

    $http.get('http://api.fixer.io/latest?base=ZAR')
        .then(function(res) {
            $scope.rates = res.data.rates;
            angular.forEach($scope.rates, function(value, key) {
                if (key === 'CAD' || key === 'USD' || key === 'EUR') {
                    $scope.rate[key] = value;
                }

            });
            $scope.convertedAmount = $scope.rates.USD;
            $scope.amountToConvert = $scope.rates.CAD;

            $scope.currConvert();
        });

    $scope.currConvert = function() {
        $scope.convValue = $scope.convAmount * ($scope.convertedAmount * (1 / $scope.amountToConvert));
        $scope.convValue = $scope.convValue;

    };

    $scope.toggleCustom = function() {
        $scope.disclaimer = $scope.disclaimer === false ? true : false;
    };

}]);