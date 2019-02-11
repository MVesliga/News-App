newsApp.component('search',{
    templateUrl:'./pages/page-search.template.html',
    controller:function(NewsService){

        this.vijesti = NewsService.getNews();
        
    },
    controllerAs:'c'
});