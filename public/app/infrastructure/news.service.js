class NewsService{
    constructor($http,$state,$rootScope,DataService){
        this.http = $http;
        this.dataService = DataService;
        this.rootScope = $rootScope;
        this.state = $state;
        this.url = '/api/news';

        this.dataService.getData().then((d) =>{
            this.vijesti = d.data.vijesti;
            
            this.rootScope.$broadcast('init');
        });
    }

    getNews(){
        return this.vijesti;
    }

    addNews(vijest){
        this.dataService.postData(vijest).then(d => {
            this.vijesti.push(vijest);
            this.rootScope.$broadcast('modeChangee');
            this.state.go('news-list');
        });
    }

    editNews(vijest){
        this.dataService.editData(vijest).then(d =>{
            let i = this.vijesti.findIndex(c => c.id == vijest.id);
            this.vijesti[i] = vijest;
            this.rootScope.$broadcast('modeChange');
        });
    }

    deleteNews(id){
        this.dataService.deleteData(id).then(d=>{
            this.vijesti.splice(this.vijesti.findIndex(c => c.id == id),1);
        });
    }
}

newsApp.service('NewsService',NewsService);