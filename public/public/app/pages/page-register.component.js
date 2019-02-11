newsApp.component('register',{
    templateUrl:'./pages/page-register.template.html',
    controller:function($scope,RegistrationService){

        this.onSubmit = function(e,unos){
            this.errorMsg = '';
            let user = {
                ime: unos.ime.$viewValue,
                prezime: unos.prezime.$viewValue,
                email: unos.email.$viewValue,
                username: unos.username.$viewValue,
                password:unos.password.$viewValue
            };
            let repeatPass = unos.rPassword.$viewValue;

            if(user.password != repeatPass){
                e.preventDefault();
                this.errorMsg="Lozinke se ne podudaraju!";
            }
            else{
                RegistrationService.addUser(user);
            }
        }

        $scope.$on('wrong',(e,d)=>{
            console.log('Greška kod registera.');
        });
    },
    controllerAs:'c'
});