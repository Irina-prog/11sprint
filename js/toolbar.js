// отвечает за привязку обработчиков к кнопкам "Создать карточку" и "Редактировать провиль"
'use strict';
class Toolbar {
    constructor(newCard, editProfile) {
        this._newCard = newCard;
        this._editProfile = editProfile;
    }

    render(container) {
        container.querySelector('.user-info__button-new').addEventListener('click', this._newCard.bind(this));
        container.querySelector('.user-info__button-edit').addEventListener('click', this._editProfile.bind(this));
    }
}