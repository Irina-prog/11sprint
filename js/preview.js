// отвечает за отображение увеличенного варианта картинки
'use strict';
class Preview {
    setImageLink(link){
        this._link = link;
        this._view.setAttribute('src', this._link);
    }

    render(container) {
        this._view = container; // элемент уже есть в html, просто сохраняем ссылку на него
    }
}