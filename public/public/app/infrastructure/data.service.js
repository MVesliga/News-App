class DataService{

    constructor($http){
        this.http = $http;
        
    }

    getData(url){
        return this.http.get(url,{cache:true});
    }

    getDataByKategorija(url,kategorija){
        return this.http.get(`${url}/${kategorija}`,{cache:true});
    }

    getDataById(url,idVijest){
        return this.http.get(`${url}/${idVijest}`,{cache:true});
    }

    postData(url,podatak){
        return this.http.post(url,{podatak:podatak}).then((d)=>{
            if(d.data.status = 'OK' && url=='/api/news'){
                alert('Vijest je dodana!');
            }
        });
    }

    editData(url,podatak){
        return this.http.put(url,{podatak:podatak});
    }

    deleteData(url,id){
        return this.http.delete(`${url}/${id}`);
    }
}

newsApp.service('DataService',DataService);