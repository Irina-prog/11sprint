//отвечает за отображение информации профиля
'use strict';

class UserInfo{
    setUserInfo({name, about}){
        this._name = name;
        this._about = about;
    }

    updateUserInfo(){
        this._nameView.textContent = this._name;
        this._aboutView.textContent = this._about;
    }

    render(container) {
        // элементы уже есть в html, просто сохраняем ссылки на них
        this._nameView = container.querySelector('.user-info__name');
        this._aboutView = container.querySelector('.user-info__about');
    }
    
}
