newsApp.component('newsList',{
    templateUrl:'./components/news-list.template.html',
    controller:function($scope,$window,$state,NewsService,AuthenticationService){

        this.vijesti = NewsService.getNews();
        this.user = AuthenticationService.getUser();
        this.mode='';
        this.state=$state.current.name;

        $scope.$on('init', (event, vijest)=>{
            this.vijesti=NewsService.getNews();
        });

        $scope.$on('modeChange', ()=>{
            this.mode='';
        });

        this.changeSelected=function(vijest){
            this.selectedVijest = $window.angular.copy(vijest);
        };

        this.mode='';
        this.selectedVijest=null;

        this.doDelete=function(id){
            NewsService.deleteNews(id);
        }
    },
    controllerAs:'c'
})