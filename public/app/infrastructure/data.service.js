class DataService{

    constructor($http){
        this.http = $http;
        this.url = '/api/news';
    }

    getData(){
        return this.http.get(this.url,{cache:true});
    }

    postData(vijest){
        return this.http.post(this.url,{vijest:vijest}).then((d)=>{
            if(d.data.status = 'OK'){
                alert('Vijest je dodana!');
            }
        });
    }

    editData(vijest){
        return this.http.put(this.url,{vijest:vijest});
    }

    deleteData(id){
        return this.http.delete(`${this.url}/${id}`);
    }
}

newsApp.service('DataService',DataService);