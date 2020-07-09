// отвечает за форму ввода с валидацией введёных данных
'use strict';

class Form {
    constructor(onSubmit, getErrorViewForInput) {
        this._onSubmit = onSubmit;
        this._getErrorViewForInput = getErrorViewForInput;
    }

    _checkInputValidity(input) {
        const errorView = this._getErrorViewForInput(input);
        Form._isValid(input);
        errorView.textContent = input.validationMessage;
    }
    
    _setSubmitButtonState(enabled) {    
        if (enabled) {
            this._submitButton.removeAttribute('disabled');
        } else {
            this._submitButton.setAttribute('disabled', true);
        }
    }
    
    
    static _isValid(input) { // Возварщает true, если поле ввода валидно
        input.setCustomValidity('');

        // если на инпуте есть атрибут required, поле validity.valueMissing будет true / false (заполнено)
        if (input.validity.valueMissing) {
            // текст ошибки записываем в inputElem.validationMessage с помощью input.setCustomValidity()
            input.setCustomValidity('Это обязательное поле');
            return false;
        }

        // если на инпуте есть атрибут minlength, поле validity.tooShort будет true / false (достигнута мин. длина)
        if (input.validity.tooShort || input.validity.tooLong) {
            input.setCustomValidity(`Должно быть от ${input.getAttribute('minlength')} до ${input.getAttribute('maxlength')} символов`);
            return false;
        }

        // если на инпуте есть атрибут type, поле validity.typeMismatch будет true / false (сопадение типа)
        if (input.validity.typeMismatch && input.type === 'url') {
            input.setCustomValidity('Здесь должна быть ссылка');
            return false;
        }

        return input.checkValidity();
    }
    
    _input(event) {
        this._checkInputValidity(event.target); // проверяем поле, в котором вводили, и выводим информацию об ошибке
        this._updateSubmitButtonState();
    }

    _updateSubmitButtonState() {
        this._setSubmitButtonState(this._getInputs().every(Form._isValid)); //проверяет все элементы формы на валидностьи обновляет статус кнопки submit
    }

    _submit(event) {
        event.preventDefault();
        const data = this._getInputs().reduce((result, input) => {
            result[input.name] = input.value;
            return result;
        }, {});
        this._onSubmit(data);
    }

    _getInputs() {
        
        return [...this._view.elements].filter(input => input !== this._submitButton); //Используется Spread syntax и фильтрация массива
    }

    reset() {
        this._getInputs().forEach(input => {
            const errorView = this._getErrorViewForInput(input);
            errorView.textContent = '';
        });
        this._view.reset();
        this._setSubmitButtonState(false);
    }

    setValues(data) {
        this._getInputs().forEach(input => {
            input.value = data[input.name];
        });
        this._updateSubmitButtonState();
    }
    
    render(container) {
        this._view = container;
        this._submitButton = container.querySelector('button[type="submit"]');
        this._view.addEventListener('submit', this._submit.bind(this));
        this._view.addEventListener('input', this._input.bind(this));
    }
}