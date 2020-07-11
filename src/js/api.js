export default class Api{
    constructor({url, userId, accessToken}){
        this._url = url;
        this._accessToken = accessToken;
        this._userId = userId;
    }

    _fetchJson(path, method = 'GET', data = null){
        const options = {
            method,
            headers: {
                authorization: this._accessToken
            }
            
        };
        if (data) { //если есть данные для передачи на сервер, то отправляем их в формате json
            options.headers['Content-Type'] = 'application/json'; //добавили заголовок о формате передаваемых данных
            options.body = JSON.stringify(data); // 
        }
        return fetch(`${this._url}/${this._userId}${path}`, options)
            .then(response => {
                if(response.ok) {
                    if (response.headers.get('Content-Type').includes('application/json')){
                        return response.json();
                    } else {
                        return response.text();
                    }
                } else {
                    return Promise.reject(`Server error ${response.status}`);
                }
            });

    }

    loadCards(){
        return this._fetchJson('/cards');
    }

    createCard(card){
        return this._fetchJson('/cards', 'POST', card);
    }

    removeCard(id){
        return this._fetchJson(`/cards/${id}`, 'DELETE');
    }
    
    loadProfile(){
        return this._fetchJson('/users/me');
    }

    saveProfile(data){
        return this._fetchJson('/users/me','PATCH', data);
    }
    setLike(id){
        return this._fetchJson(`/cards/like/${id}`, 'PUT');
    }
    removeLike(id){
        return this._fetchJson(`/cards/like/${id}`, 'DELETE');
    }
}