import { Classes, Tags } from '../interface/enums';

export default class GenerateElements {
    createBlock = (tagName: Tags, className?: Classes[] | Classes, ...arg: HTMLElement[]): HTMLElement => {
        const element = document.createElement(tagName);
        if (Array.isArray(className)) {
            element.classList.add(...className);
        } else if (typeof className === 'string') {
            element.classList.add(className);
        }
        element.append(...arg);
        return element;
    };

    createButton = (
        type: 'button' | 'submit' | 'reset',
        functions: () => void,
        text?: string,
        className?: Classes[] | Classes
    ): HTMLButtonElement => {
        const button = document.createElement(Tags.BUTTON);
        if (Array.isArray(className)) {
            button.classList.add(...className);
        } else if (typeof className === 'string') {
            button.classList.add(className);
        }
        button.innerHTML = text || '';
        button.type = type;
        button.addEventListener('click', functions);
        return button;
    };
}
