import '../styles/index.css';
import Api from './api.js';
import Card from './card.js';
import CardList from './card-list.js';
import Form from './form.js';
import Popup from './popup.js';
import Preview from './preview.js';
import Toolbar from './toolbar.js';
import UserInfo from './user-info.js';

const options = {
  url: 'https://praktikum.tk',
  userId: 'cohort11',
  accessToken: '6de8ebff-243e-4e71-93d3-1e76dbdec241'
};

let ownId = null;

const api = new Api(options);

function defaultErrorHandler(error) {
  console.error(error);
  alert('Что-то пошло не так...');
}

function createCard(cardData){
  return new Card(cardData, {
    previewCard: link => {
      preview.setImageLink(link);
      previewPopup.open();
    },
    removeCard: id => {
      if(confirm('Вы действительно хотите удалить эту карточку?')) {
        return api.removeCard(id);
      }
    },
    canRemove: owner => !owner || owner._id == ownId,
    hasLike: likes => (likes || []).some(i => i._id === ownId),
    toogleLike: (id, liked) => {
      if (liked) {
        return api.removeLike(id);
      } else {
        return api.setLike(id);
      }
    },
    errorHandler: defaultErrorHandler
  });
}

const list = new CardList(createCard);

const preview = new Preview();
const previewPopup = new Popup(container => {
  preview.render(container.querySelector('.popup__img-preview'));
});

const getErrorView = input => input.nextElementSibling;

/**
 * Можно лучше:
 * Попробуйте оставлять пустую строку между объявлениями переменных. 
 * Так код проекта не будет сливаться (newCardForm и newCardPopup)
 */

 const newCardForm = new Form(cardData => {
  api.createCard(cardData)
  .then((newCardData)=>{
    list.addCard(newCardData);
    newCardForm.reset();
    newCardPopup.close();
  })
  .catch(defaultErrorHandler);
}, getErrorView);
const newCardPopup = new Popup(container => {
  newCardForm.render(container.querySelector('form'));
});


const userInfo = new UserInfo();
const profileForm = new Form(profileData => {
  api.saveProfile(profileData)
  .then(() => {
    userInfo.setUserInfo(profileData);
    userInfo.updateUserInfo();
    profilePopup.close();
  })
  .catch(defaultErrorHandler);
}, getErrorView);
const profilePopup = new Popup(container => {
  profileForm.render(container.querySelector('form'));
});

const toolbar = new Toolbar(() => newCardPopup.open(), () => profilePopup.open());

const loadingPopup = new Popup(() => {}); // не привязываемся к дочернему содержимому

list.render(document.querySelector('.places-list'));
previewPopup.render(document.querySelector('#preview'));
newCardPopup.render(document.querySelector('#new'));
profilePopup.render(document.querySelector('#profile'));
loadingPopup.render(document.querySelector('#loading'));
userInfo.render(document.querySelector('.user-info'));
toolbar.render(document.querySelector('.root'));

newCardForm.reset();

loadingPopup.open();
Promise.all([api.loadCards(), api.loadProfile()])
.then(([cards, profile]) => {
  ownId = profile._id;
  list.setCards(cards);
  profileForm.setValues(profile);
  userInfo.setUserInfo(profile);
  userInfo.updateUserInfo();
})
.catch(defaultErrorHandler)
.finally(() => {
  loadingPopup.close();
});




