class RegistrationService{
    constructor($http,$state,$rootScope){
        this.http = $http;
        this.state = $state;
        this.rootScope = $rootScope;
        this.url = '/api/register';
    }

    addUser(user){
        this.http.post(this.url,{user:user}).then((d)=> {
            if(d.data.status = 'OK'){
                alert('Uspješna registracija!');
                this.state.go('login');
            }
            else{
               this.rootScope.$broadcast('wrong');
            }
        });
    }
}

newsApp.service('RegistrationService',RegistrationService);