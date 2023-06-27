import { Classes, Tags } from '../interface/enums';

export default class CreateElements {
    levelHeader = document.createElement(Tags.DIV);

    rootLevel = document.createElement(Tags.DIV);

    rootMenu = document.createElement(Tags.DIV);

    levelNumber = document.createElement(Tags.SPAN);

    listMenu = document.createElement(Tags.UL);

    rootHelp = document.createElement(Tags.DIV);

    input = document.createElement(Tags.INPUT);

    table = document.createElement(Tags.SECTION);

    htmlCode = document.createElement(Tags.DIV);

    formEditor = document.createElement(Tags.FORM);
    createBlock = (tagName: Tags, className?: Classes[] | Classes | string[], ...arg: HTMLElement[]): HTMLElement => {
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
        headerEditor.classList.add(`${className}-header`);
        headerEditor.append(
            this.createElement(tagName, [`${className}-item`], title),
            this.createElement(tagName, [`${className}-item`], description)
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
        className: string[],
        type: 'button' | 'submit' | 'reset',
        functions: () => void,
        text: string,
        ...arg: HTMLElement[]
    ): HTMLButtonElement => {
        const button = document.createElement(Tags.BUTTON);
        button.classList.add(...className);
        button.innerHTML = text || '';
        button.type = type;
        button.addEventListener('click', functions);
        button.append(...arg);
        return button;
    };
}
