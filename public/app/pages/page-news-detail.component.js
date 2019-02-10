newsApp.component('newsDetail',{
    templateUrl: './pages/page-news-detail.template.html',
    controller:function($stateParams,$location,$timeout, DataService){

        this.naslov = $stateParams.newsTitle;

        DataService.getData().then((data) =>{
            this.vijesti = data.data.vijesti;
            console.log(this.vijesti);
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
        });
    },
    controllerAs:'c'
})