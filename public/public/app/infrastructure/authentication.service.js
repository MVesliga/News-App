class AuthenticationService{

    constructor($http,$state,$rootScope){
        this.http = $http;
        this.state = $state;
        this.rootScope = $rootScope;
        this.url = '/api/users';
        this.user = null;
    }

    isAuthenticated(){

        let auth=false;

        if (this.user!=null || sessionStorage.getItem('authenticated')=="true") auth=true;
        if (auth) this.user=JSON.parse(sessionStorage.getItem('user'));

        return auth;
    }

    getUser(){

        return this.user;
    }

    getUserById(id){
        this.http.get(`${this.url}/${id}`).then(d =>{
            if(d.data.status == 'OK'){
                this.user = d.data.user;
            }
        });
    }

    login(credentials){

        this.http.post('/api/login',{credentials:credentials}).then(d => {


            if (d.data.status=='OK'){
                this.user=d.data.user;
                sessionStorage.setItem('authenticated',true);
                sessionStorage.setItem('user',JSON.stringify(this.user));
                this.state.go('home');


            }

            else {

                this.rootScope.$broadcast('wrong',d.data.description);

            }

        });

    }

    logout(){

        sessionStorage.removeItem('authenticated');
        sessionStorage.removeItem('user');
        this.user=null;
        this.state.go('login');

    }

}

newsApp.service('AuthenticationService', AuthenticationService);