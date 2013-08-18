var PiREApi = angular.module('PiREApi', []).
    config(function ($routeProvider) {
        $routeProvider.
            when('/', {controller: ListCtrl, templateUrl: 'listing.html'}).
            otherwise({redirectTo: '/'});
    });

function ListCtrl($scope, $http) {
    $scope.results = {};
    // TODO should be done at startup only once, maybe a service
    var reaApiKey;
    $http.get('/key.json').success(function (data) {
        reaApiKey = data["reaApiKey"];
    });

    $scope.search = '{"term":"Australia","page":1,"channel":"buy"}';

    $scope.fetchSearch = function () {
        $scope.fetch("http://api.realestate.com.au/searches/" + btoa($scope.search)); // TODO is btoa a good practice?
    }

    $scope.fetch = function (uri) {
        $http.jsonp(uri + '?rea-api-key=' + reaApiKey + '&callback=JSON_CALLBACK').success(function (data) {
            $scope.results = data.results;
            $scope.availableResults = data["available-results"];
            $scope.links = data["links"];
        });
    }

    $scope.photographsByRel = function(result, rel) {
        // TODO need modernizer to get around use of map
        return result.photographs.map(function(photograph) {
            var link = photograph["links"].filter(function(link){
                return link["rel"] === rel;
            });
            // TODO still a little messy and no error checking
            return link[0]["uri"];
        });
    }
}
