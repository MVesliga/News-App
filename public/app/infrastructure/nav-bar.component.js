newsApp.component('navBar', {
    template: `
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a ui-sref="home" class="navbar-brand logo">TVZNews</a>
                </div>
                <ul class="nav navbar-nav">
                    <li><a ui-sref="home">HOME</a></li>
                    <li><a ui-sref="news">NEWS</a></li>
                    <li><a ui-sref="sport">SPORT</a></li>
                    <li><a ui-sref="tech">TECH</a></li>
                    
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a ng-show="c.user.level == 'admin'" ui-sref="news-list"><span class="glyphicon glyphicon-list-alt"></span> Sve vijesti</a></li>
                    <li><a ui-sref="search"><span class="glyphicon glyphicon-search"></span> Search</a></li>
                    <li><a ui-sref="register" ng-show="!c.authenticated"><span class="glyphicon glyphicon-user"></span> Registracija</a></li>
                    <li><a ui-sref="login" ng-show="!c.authenticated"><span class="glyphicon glyphicon-log-in"></span> Log in</a></li>
                    <li><a ng-show="c.authenticated" ng-click="c.logout()"><span class="glyphicon glyphicon-log-out"></span> Log out</a></li>
                    <li><a ng-show="c.authenticated" ui-sref="user-detail({id:c.user.id})"><span class="glyphicon glyphicon-user"></span> {{c.user.username}}</a></li>
                 </ul>
            </div>
        </nav>
        `,
        controller:function(AuthenticationService){

            this.user = AuthenticationService.getUser();
            this.authenticated = AuthenticationService.isAuthenticated();

            
            this.$doCheck=function(){
                this.user = AuthenticationService.getUser();
                this.authenticated = AuthenticationService.isAuthenticated();
            }

            this.logout=function(){
                AuthenticationService.logout();
            }
        },
        controllerAs: 'c'
});