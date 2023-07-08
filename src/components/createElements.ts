import { Tags } from '../interface/enums';

export default abstract class CreateElements {
    protected createBlock = (tagName: Tags, className: string[], ...arg: HTMLElement[]): HTMLElement => {
        const block = this.createElement(tagName, className);
        block.append(...arg);
        return block;
    };

    protected createElement = (tagName: Tags, className: string[], text?: string): HTMLElement => {
        const element = document.createElement(tagName);
        element.classList.add(...className);
        element.innerHTML = text || '';
        return element;
    };

    protected createLink = (className: string[], text: string, href: string): HTMLElement => {
        const element = this.createElement(Tags.A, className, text) as HTMLAnchorElement;
        element.classList.add(...className);
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
        const button = this.createElement(Tags.BUTTON, className, text) as HTMLButtonElement;
        button.classList.add(...className);
        button.type = type;
        button.addEventListener('click', functions);
        button.append(...arg);
        return button;
    };
}
