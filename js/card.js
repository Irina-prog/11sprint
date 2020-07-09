//отвечает за отображение одной карточки
'use strict';
class Card {
    constructor ({_id, name, owner, link, likes}, options){
        this._id = _id;
        this._name = name;
        this._link = link;
        this._owner = owner;
        this._options = options; 
        this._likes = likes;
    }
    
     _like(){
        return this._options.toogleLike(this._id, this._options.hasLike(this._likes))
        .then(() => {
            this._likeButton.classList.toggle('place-card__like-icon_liked');
        })
        .catch( this._options.errorHandler);
    } 
    _remove(event){
        event.stopPropagation();
        const result = this._options.removeCard(this._id)
        if (result) {
            result.then(() => {
                this._view.remove();
                this._view = null;
            })
            .catch( this._options.errorHandler);
        }
    }
    
    _preview() {
        this._options.previewCard(this._link);
    }

    render(container){
        const placecard = document.createElement('div');
        placecard.classList.add('place-card');
    
        const placeCardImage = document.createElement('div');
        placeCardImage.classList.add('place-card__image');
        placecard.appendChild(placeCardImage);
        placeCardImage.style.backgroundImage = `url(${this._link})`;
       
        placeCardImage.addEventListener('click', this._preview.bind(this));
    
        if (this._options.canRemove(this._owner)) {
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('place-card__delete-icon');
            placeCardImage.appendChild(deleteButton);
            deleteButton.addEventListener('click', this._remove.bind(this));
        }
        
    
        const placeCardDescription = document.createElement('div');
        placeCardDescription.classList.add('place-card__description');
        placecard.appendChild(placeCardDescription);
    
        const cardName = document.createElement('h3');
        cardName.classList.add('place-card__name');
        placeCardDescription.appendChild(cardName);
        cardName.textContent = this._name;
    
        const likeButton = document.createElement('button');
        likeButton.classList.add('place-card__like-icon');
        placeCardDescription.appendChild(likeButton);
        likeButton.addEventListener('click', this._like.bind(this));
        if (this._options.hasLike(this._likes)) {
            likeButton.classList.add('place-card__like-icon_liked');
        }
        this._likeButton = likeButton;
        this._view = placecard;

        container.appendChild(placecard);     
    }

}