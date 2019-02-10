newsApp.component('userDetail',{
    templateUrl:'./pages/page-user-detail.template.html',
    controller:function(AuthenticationService,$stateParams){
        this.user = AuthenticationService.getUser();
    },
    controllerAs:'c'
});