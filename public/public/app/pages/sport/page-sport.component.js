newsApp.component('sport',{
    templateUrl:'./pages/sport/page-sport.template.html',
    controller:function($stateParams,DataService){

        this.kategorija = $stateParams.kategorija;
        this.url = '/api/news'
        DataService.getDataByKategorija(this.url,this.kategorija).then(data => {
            this.vijesti = data.data.vijesti;
        });
    },
    controllerAs:'c'
});