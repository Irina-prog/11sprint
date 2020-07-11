// отвечает за отображение списка
export default class CardList {
    constructor (createCardView) {
        this._createCardView = createCardView; // вызывается для отображения одного элемента списка
    }

    addCard(card){
       this._createCardView(card).render(this._view);
    }

    setCards(cards) {
       cards.forEach(card => {
            this.addCard(card);
        });
    }

    
    render(container){
        this._view = container;
    }
}

