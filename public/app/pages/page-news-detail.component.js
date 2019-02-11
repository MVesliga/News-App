newsApp.component('newsDetail',{
    templateUrl: './pages/page-news-detail.template.html',
    controller:function($scope,$state,$stateParams,$location,$timeout, DataService, AuthenticationService, CommentService){

        this.user = AuthenticationService.getUser();
        this.authenticated = AuthenticationService.isAuthenticated();
        this.mode = '';
        
        this.$doCheck=function(){
            this.user = AuthenticationService.getUser();
            this.authenticated = AuthenticationService.isAuthenticated();
        }
        
        this.naslov = $stateParams.newsTitle;
        
        this.url = '/api/news';

        DataService.getData(this.url).then((data) =>{
            this.vijesti = data.data.vijesti;
        
            this.vijesti = this.vijesti.filter((vijest) =>{
                if(vijest.naslov === this.naslov){
                    return true;
                }
            });

            this.vijest = this.vijesti[0];

            $timeout(() => {
                if(this.vijest == undefined){
                    $location.path('/');
                }
            },2000);

            CommentService.getComments(this.vijest.id).then(data =>{
                this.komentari = data.data.komentari;
                console.log(this.komentari);
            });

            $scope.$on('added',()=>{
                CommentService.getComments(this.vijest.id).then(data =>{
                    this.komentari = data.data.komentari;
                    console.log(this.komentari);
                });
            });
        });
    },
    controllerAs:'c'
})