import { Classes, Tags } from '../interface/enums';

export default class GenerateElements {
    createBlock = (tagName: Tags, className?: Classes[] | Classes, ...arg: HTMLElement[]): HTMLElement => {
        const block = document.createElement(tagName);
        if (Array.isArray(className)) {
            block.classList.add(...className);
        } else if (typeof className === 'string') {
            block.classList.add(className);
        }
        block.append(...arg);
        return block;
    };

    createHeaderElement = (tagName: Tags, className: Classes[], title: string, description: string): HTMLElement => {
        const headerEditor = document.createElement(tagName);
        headerEditor.classList.add(`${className}__header`);
        headerEditor.append(
            this.createElement(tagName, [`${className}__header_item`], title),
            this.createElement(tagName, [`${className}__header_item`], description)
        );
        return headerEditor;
    };

    createElement = (tagName: Tags, className: string[], text?: string): HTMLElement => {
        const element = document.createElement(tagName);
        element.classList.add(...className);
        element.innerHTML = text || '';
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
