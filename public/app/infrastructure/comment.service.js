class CommentService{

    constructor($http,$state,$stateParams,$rootScope,DataService){
        this.http = $http;
        this.state = $state;
        this.stateParams = $stateParams;
        this.rootScope = $rootScope;
        this.dataService = DataService;
        this.url = '/api/comments';
        
    }

    getComments(idVijest){
       return this.dataService.getDataById(this.url,idVijest);
    }

    postComment(komentar){
        this.dataService.postData(this.url,komentar).then(() =>{
            this.state.reload();
        });
        
        
    }
}

newsApp.service('CommentService',CommentService);