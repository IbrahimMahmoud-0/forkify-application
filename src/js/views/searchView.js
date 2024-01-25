


class SearchView{
    _parenElement=document.querySelector('.search');


    getQuery(){
        const query= this._parenElement.querySelector('.search__field').value;
        this._clearInput();
        return query;
    }
    _clearInput(){
        this._parenElement.querySelector('.search__field').value='';
    }
    
    addHandlerSearch(fn){

        this._parenElement.addEventListener('submit',function(e){
            e.preventDefault();
            fn();
        })
    }
}

export default new SearchView();