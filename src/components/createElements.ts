import { Classes, Tags } from '../interface/enums';

export default class CreateElements {
    protected levelHeader = document.createElement(Tags.DIV);

    protected rootLevel = document.createElement(Tags.DIV);

    protected rootMenu = document.createElement(Tags.DIV);

    protected levelNumber = document.createElement(Tags.SPAN);

    protected listMenu = document.createElement(Tags.UL);

    protected rootHelp = document.createElement(Tags.DIV);

    protected input = document.createElement(Tags.INPUT);

    protected table = document.createElement(Tags.SECTION);

    protected htmlCode = document.createElement(Tags.DIV);

    formEditor = document.createElement(Tags.FORM);
    protected createBlock = (tagName: Tags, className?: Classes[] | Classes, ...arg: HTMLElement[]): HTMLElement => {
        const block = document.createElement(tagName);
        if (Array.isArray(className)) {
            block.classList.add(...className);
        } else if (typeof className === 'string') {
            block.classList.add(className);
        }
        block.append(...arg);
        return block;
    };

    protected createHeaderElement = (
        tagName: Tags,
        className: Classes[],
        title: string,
        description: string
    ): HTMLElement => {
        const headerEditor = document.createElement(tagName);
        headerEditor.classList.add(`${className}-header`);
        headerEditor.append(
            this.createElement(tagName, [`${className}-item`], title),
            this.createElement(tagName, [`${className}-item`], description)
        );
        return headerEditor;
    };

    protected createElement = (tagName: Tags, className: string[], text?: string): HTMLElement => {
        const element = document.createElement(tagName);
        element.classList.add(...className);
        element.innerHTML = text || '';
        return element;
    };

    protected createLink = (className: string[], text: string, href: string): HTMLElement => {
        const element = document.createElement('a');
        element.classList.add(...className);
        element.innerHTML = text || '';
        element.href = href;
        return element;
    };

    protected createButton = (
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
