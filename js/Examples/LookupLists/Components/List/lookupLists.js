var lookupListsList = {
    template: require('raw-loader!./lookupListsTemplate.html'),
    controllerAs: "vm",
    controller: function (lookupListsDataService, lookupListsModalService){
        var vm = this;

        vm.lookupLists = [];
        vm.startDateOpened = false;
        vm.loading = false;
        vm.resultsCount  = 0;

        vm.pageSizes = [{
            id: 1,
            name: "Cat 1"
        }, {
            id: 2,
            name: "Cat 2"
        }];

     
        vm.filter = {
            Username: 'kevin',
            pageSize: 20,
            currentPage: 1
        };

        vm.pageChangeHandler = function(newpageNumber){
            console.log(newpageNumber);
            vm.filter.currentPage = newpageNumber;
            
            vm.loadLogs();
           
        }

        vm.init = function(){
            vm.loading = true;
            vm.filter.startDate = new Date()
            vm.filter.endDate = new Date()
            
            
           // vm.filter.startDate.setMonth( vm.filter.startDate.getMonth()-2);            
            vm.loadLogs()
        }

        vm.loadLogs = function(){
        
            lookupListsPromise = lookupListsDataService.readAll(vm.filter);
            console.log('start');

            lookupListsPromise.then(function(result){
                vm.loading = false
                console.log('result');
                console.log(result.data);
                vm.lookupLists = result.data;


                vm.resultsCount = result.data.Count;
            });
        }


        vm.startDate


        vm.openStartDate = function() {
            vm.startDateOpened = true;
        };

        vm.view = function (id) {
                console.log(id);
            var result = lookupListsModalService.View(id);
            
        }
        vm.create = function (id) {
            console.log(id);
        var result = lookupListsModalService.create();
        
    }
        vm.modify = function (id) {
            console.log(id);
        var result = lookupListsModalService.modify(id);
        
    }
        
        vm.init();
    }
}

angular.module("examples").component("lookupLists", lookupListsList);