newsApp.component('login',{
    templateUrl:'./pages/page-login.template.html',
    controller:function($scope,AuthenticationService){

        this.login = function($scope){
            AuthenticationService.login(this.credentials);
        }

        $scope.$on('wrong',(e,d) =>{
            this.desc = d;
        })
        
    },
    controllerAs: 'c'
});