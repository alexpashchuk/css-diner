// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import levels from '../data/levelsData';
import CreateElements from './createElements';
import { Classes, Tags } from '../interface/enums';

class CreateLevel extends CreateElements {
    isMenuActive = false;

    isPrintText = true;

    levelActive = Number(localStorage.getItem('level')) || 0;

    createLevelHeader = (): HTMLDivElement => {
        this.levelHeader.classList.add('level-header');

        this.levelNumber.classList.add('level-title');
        this.levelNumber.textContent = `Level ${this.levelActive + 1} of ${levels.length}`;

        this.levelHeader.append(this.createButton([Classes.BUTTON_MENU], 'button', this.toggleMenu, 'menu'));
        this.levelHeader.append(this.levelNumber);
        this.levelHeader.append(this.createElement(Tags.SPAN, ['check-mark', 'check']));
        this.levelHeader.append(this.createButton([Classes.BUTTON_PREV], 'button', this.showPrevLevel));
        this.levelHeader.append(this.createButton([Classes.BUTTON_NEXT], 'button', this.showNextLevel));

        return this.levelHeader;
    };

    createMenuLevel = (): HTMLDivElement => {
        this.rootMenu.classList.add('level-menu');
        this.listMenu.classList.add('level-list');

        for (let i = 0; i < levels.length; i += 1) {
            const item = document.createElement('li');
            item.classList.add('list-item');
            item.classList.add(this.levelActive + 1 === i + 1 ? 'list-item_active' : 'list-item');
            item.id = (i + 1).toString();
            item.innerHTML = `<span class="check-mark" aria-hidden="true"></span>
            <span class="list-text">${i + 1}.${levels[i].syntax}</span>`;
            this.listMenu.append(item);
            item.addEventListener('click', () => {
                this.levelActive = +item.id - 1;
                this.getNewLevel();
                this.toggleMenu();
            });
        }

        this.rootMenu.append(this.listMenu);
        return this.rootMenu;
    };

    createLevelHelp = (): HTMLDivElement => {
        this.rootHelp.innerHTML = '';
        this.rootHelp.classList.add('level-help');
        this.rootHelp.append(
            this.createElement(Tags.H3, ['selector-name'], levels[this.levelActive].selectorName),
            this.createElement(Tags.H2, ['title'], levels[this.levelActive].helpTitle),
            this.createElement(Tags.H2, ['syntax'], levels[this.levelActive].syntax),
            this.createElement(Tags.P, ['description'], levels[this.levelActive].help)
        );
        if (levels[this.levelActive].examples) {
            levels[this.levelActive].examples?.forEach((el) =>
                this.rootHelp.append(this.createElement(Tags.DIV, ['example'], el))
            );
        }

        return this.rootHelp;
    };

    showNextLevel = (): void => {
        if (+this.levelActive <= levels.length - 1) {
            this.levelActive += 1;
            this.getNewLevel();
        }
    };

    showPrevLevel = (): void => {
        if (this.levelActive > 0) {
            this.levelActive -= 1;
            this.getNewLevel();
        }
    };

    toggleMenu = (): void => {
        this.isMenuActive = !this.isMenuActive;
        this.rootMenu.style.left = this.isMenuActive ? '0px' : `-${this.rootMenu.offsetWidth}px`;
        const elem = document.querySelector('.button-menu') as HTMLElement;
        elem.textContent = this.isMenuActive ? 'close' : 'menu';
    };

    toggleListActives = (): void => {
        this.levelHeader.children[2].classList.remove('not-passed', 'passed');
        this.levelNumber.textContent = `Level ${this.levelActive + 1} of ${levels.length}`;

        // const objProgress = JSON.parse(localStorage.getItem('progress') || '') || {};
        const objProgress = JSON.parse(localStorage.getItem('progress')) || {};
        if (objProgress[this.levelActive] && objProgress[this.levelActive].correct) {
            this.levelHeader.children[2].classList.add('passed');
        }
        if (objProgress[this.levelActive] && objProgress[this.levelActive].incorrect) {
            this.levelHeader.children[2].classList.add('not-passed');
        }
        this.listMenu.childNodes.forEach((item: any, i: number) => {
            item.classList.remove('mdc-list-item--activated');
            if (+item.id === this.levelActive + 1) item.classList.add('mdc-list-item--activated');
            if (objProgress[`${i}`]) {
                item.children[0].classList.remove('not-passed', 'passed');
                if (objProgress[`${i}`].correct && !objProgress[`${i}`].incorrect) {
                    item.children[0].classList.add('passed');
                }
                if (objProgress[`${i}`].incorrect && !objProgress[`${i}`].correct) {
                    item.children[0].classList.add('not-passed');
                }
            }
        });
    };

    getNewLevel = (): void => {
        this.htmlCode.innerHTML = ``;
        this.input.value = '';
        this.input.classList.add('blink');
        this.input.focus();
        this.isPrintText = true;
        this.htmlCode.append(this.getViewerCode(levels[this.levelActive].boardMarkup));
        this.table.innerHTML = levels[this.levelActive].boardMarkup;
        const elem = document.querySelector('.layout-header') as HTMLElement;
        elem.innerHTML = levels[this.levelActive].doThis;
        this.table.querySelectorAll('*').forEach((item: Element) => {
            if (item.closest(levels[this.levelActive].selector)) {
                item.closest(`${levels[this.levelActive].selector}`)?.classList.add('selected-element');
            }
        });
        this.rootLevel.removeChild(this.rootHelp);
        this.rootLevel.append(this.createLevelHelp());
        this.toggleListActives();
        localStorage.setItem('level', `${this.levelActive}`);
    };

    getAttributes = (child: any): string => {
        const childClass = child.attributes.class;
        const childId = child.attributes.getNamedItem('id');
        const attributes = `${
            childClass && childClass.value && childClass && childClass.value !== 'selected-element'
                ? ` class="${childClass.value}"`
                : ''
        }${childId && childId.value ? ` id="${childId.value}"` : ''}`;
        return attributes;
    };

    getViewerCode = (item: any): DocumentFragment => {
        const container = document.createElement('div');
        typeof item === 'string' ? (container.innerHTML = item) : container.append(item);
        const result = typeof item === 'string' ? document.createDocumentFragment() : item;
        const arrayContainer = Array.prototype.slice.call(container.childNodes).filter((el) => el.nodeName !== '#text');
        for (let i = 0; i < arrayContainer.length; i += 1) {
            const div = document.createElement('div');
            const child = arrayContainer[i];
            if (child.children.length > 0) {
                div.append(`<${child.nodeName.toLocaleLowerCase()}${this.getAttributes(child)}>`);
                for (let j = 0; j < child.children.length; j += 1) {
                    div.append(this.getViewerCode(child.children[j].cloneNode(true)).firstChild);
                }
                div.append(`</${child.nodeName.toLocaleLowerCase()}>`);
            } else {
                div.append(child.outerHTML);
            }
            result.append(div);
        }
        return result;
    };

    createBlockLevel = (): HTMLDivElement => {
        this.rootLevel.classList.add('level');
        this.rootLevel.append(this.createLevelHeader(), this.createMenuLevel(), this.createLevelHelp());
        this.toggleListActives();
        return this.rootLevel;
    };
}

export default CreateLevel;
