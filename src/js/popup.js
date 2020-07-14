//отвечает за отображение всплывающего окна
export default class Popup {
    constructor(renderChildView){
        this._renderChildView = renderChildView;
    }
    
    open() {
        this._view.classList.add('popup_is-opened');
    }

    close() {
        this._view.classList.remove('popup_is-opened');
    }
    
    render(container) {
        this._view = container; // всплывающее окно уже есть в html, просто сохраняем на него ссылку

        const closeButton = this._view.querySelector('.popup__close');
        if (closeButton) {
            closeButton.addEventListener('click', this.close.bind(this));
        }
        this._renderChildView(this._view);
    }
}