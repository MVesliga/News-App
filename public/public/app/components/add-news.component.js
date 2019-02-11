newsApp.component('addNews',{
    templateUrl:'./components/add-news.template.html',
    bindings:{
        vijest:'<',
        mode:'<'
    }, require: {
        parent: '^^newsList'
    },
    controller:function($scope,NewsService,$state){
        this.state = $state.current.name;
    
        this.onSubmit = function(){
            if(this.mode == 'add'){
                let datum = new Date().toISOString().slice(0, 19).replace('T', ' ');
                this.vijest.datumObjavljivanja = datum;
            
                NewsService.addNews(this.vijest);
                console.log("Dodajem vijest!");
            }
            else{
                NewsService.editNews(this.vijest);
                console.log("Editiram vijest!");
            }
            
        }
    },
    controllerAs:'c'
});