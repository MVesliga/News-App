newsApp.filter('searchFilter',function(){
    return function(vijesti,tekst){
        let filtrirane = [];

        for(let i = 0; i < vijesti.length; i++){
            let vijest = vijesti[i];
            if(vijest.naslov.includes(tekst)){
                filtrirane.push(vijest);
            }
        }
        return filtrirane;
    };
});