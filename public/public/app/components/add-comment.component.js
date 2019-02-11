newsApp.component('addComment',{
    templateUrl:'./components/add-comment.template.html',
    bindings:{
        korisnik:'<',
        vijest:'<',
        mode:'='
    }, require: {
        parent: '^?page-news-detail'
    },controller:function($state,$stateParams,CommentService){

        this.onSubmit = function(){
            if(this.mode == 'add'){
                let datum = new Date().toISOString().slice(0, 19).replace('T', ' ');

                this.komentar.idKorisnik =  this.korisnik;
                this.komentar.idVijest = this.vijest;
                this.komentar.datumObjavljivanja = datum;

                CommentService.postComment(this.komentar);              
            }            
        }
    },
    controllerAs:'c'
});