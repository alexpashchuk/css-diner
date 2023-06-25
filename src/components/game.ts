// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { Classes, Tags, Text } from '../interface/enums';
import CreateLevel from './createLevel';
import levels from '../data/levelsData';

export default class Game extends CreateLevel {
    currentElem: HTMLElement | null = null;

    isPassedLevel = true;

    createFormEditor = (): HTMLFormElement => {
        this.formEditor.classList.add(Classes.FORM);
        this.input.classList.add(Classes.FORM_INPUT, Classes.STROBE);
        this.input.placeholder = Text.PLACEHOLDER;
        this.input.type = 'text';
        this.input.focus();

        const button = document.createElement(Tags.BUTTON);
        button.classList.add(Classes.FORM_BUTTON);
        button.type = 'submit';
        button.append(this.createElement(Tags.SPAN, [Classes.BUTTON_TEXT], Text.ENTER));

        this.formEditor.append(
            this.input,
            button,
            this.createButton([Classes.FORM_HELP], 'button', this.showAnswer, Text.HELP)
        );

        this.formEditor.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            if (this.input.value === levels[this.levelActive].selector) {
                this.table.querySelectorAll('*').forEach((item: Element) => {
                    if (item.closest(levels[this.levelActive].selector)) {
                        item.closest(`${levels[this.levelActive].selector}`)?.classList.add('win');
                        item.addEventListener('animationend', () => {
                            this.getNewLevel();
                        });
                    }
                });
                this.setLocalStorageProgress();
                this.levelActive += 1;
                this.isPassedLevel = true;
            } else {
                document.querySelector('.editor')?.classList.add(Classes.SHAKE);
                document.querySelector('.editor')?.addEventListener('animationend', () => {
                    document.querySelector('.editor')?.classList.remove(Classes.SHAKE);
                });
            }
        });

        this.input.addEventListener('input', () => {
            return this.input.value.length === 0
                ? this.input.classList.add(Classes.STROBE)
                : this.input.classList.remove(Classes.STROBE);
        });

        return this.formEditor;
    };

    setLocalStorageProgress = (): void => {
        // const progress = JSON.parse(localStorage.getItem('progress') || '') || {};
        const progress = JSON.parse(localStorage.getItem('progress')) || {};
        const result =
            progress[`${this.levelActive}`] && progress[`${this.levelActive}`].correct
                ? progress
                : { ...progress, [this.levelActive]: { correct: this.isPassedLevel, incorrect: !this.isPassedLevel } };
        localStorage.setItem('progress', JSON.stringify(result));
    };

    showAnswer = (): void => {
        if (this.isPrintText) {
            this.isPrintText = false;
            const arrayResponseLetters: string[] = levels[this.levelActive].selector.split('');
            this.input.classList.remove('blink');
            let count = 0;
            const printText = (): NodeJS.Timeout | string => {
                if (count === arrayResponseLetters.length) return this.input.value;
                this.input.value += arrayResponseLetters[count];
                count += 1;
                this.input.focus();
                return setTimeout(printText, 500);
            };
            printText();
            this.isPassedLevel = false;
        }
    };

    showTooltip = (element: HTMLElement): void => {
        if (element.tagName) {
            const tooltipText = `&lt;${element.tagName.toLocaleLowerCase()}${this.getAttributes(
                element
            )}>&lt/${element.tagName.toLocaleLowerCase()}>`;
            const node = document.querySelector('.tooltip') as HTMLElement;
            node.classList.toggle('hidden');
            node.innerHTML = tooltipText;
            node.style.left = `${element.getClientRects()[0].x}px`;
            node.style.top = `${element.getClientRects()[0].y - 50}px`;
        }
    };

    highlightElement = (e: Event): void => {
        const target = e.target as Element;
        const elementsCode = Array.prototype.slice.call(this.htmlCode.querySelectorAll('*'));
        const elementsTable = Array.prototype.slice.call(this.table.querySelectorAll('*'));
        const index = target.tagName !== 'DIV' ? elementsTable.indexOf(target) : elementsCode.indexOf(target);
        if (e.type === 'mouseover') {
            if (this.currentElem) return;
            this.currentElem = e.target as HTMLElement;
            this.showTooltip(elementsTable[index]);
            elementsTable[index].classList.add('active');
            elementsCode[index]?.classList.add('bold');
        }
        if (e.type === 'mouseout') {
            if (!this.currentElem) return;
            elementsTable[index].classList.remove('active');
            elementsCode[index]?.classList.remove('bold');
            this.currentElem = null;
            this.showTooltip(elementsTable[index]);
        }
    };

    createHtmlCode = (): HTMLDivElement => {
        this.htmlCode.classList.add(Classes.HTML_CODE);
        this.htmlCode.append(this.getViewerCode(levels[this.levelActive].boardMarkup));

        this.htmlCode.addEventListener('mouseover', (e: Event) => {
            const target = e.target as Element;
            if (target.className !== Classes.HTML_CODE) {
                this.highlightElement(e);
            }
        });
        this.htmlCode.addEventListener('mouseout', (e: Event) => {
            const target = e.target as Element;
            if (target.className !== Classes.HTML_CODE) {
                this.highlightElement(e);
            }
        });
        return this.htmlCode;
    };

    createTable = (): HTMLElement => {
        this.table.classList.add(Classes.TABLE);
        this.table.innerHTML = levels[this.levelActive].boardMarkup;
        this.table.querySelectorAll('*').forEach((item: any) => {
            if (item.closest(levels[this.levelActive].selector)) {
                item.closest(`${levels[this.levelActive].selector}`)?.classList.add('selected-element');
            }
        });
        this.table.addEventListener('mouseover', (e: Event) => {
            const target = e.target as Element;
            if (target.className !== Classes.TABLE) {
                this.highlightElement(e);
            }
        });
        this.table.addEventListener('mouseout', (e: Event) => {
            const target = e.target as Element;
            if (target.className !== Classes.TABLE) {
                this.highlightElement(e);
            }
        });
        return this.table;
    };

    createLineNumber = (): HTMLDivElement => {
        const lineNumber = document.createElement(Tags.DIV);
        lineNumber.classList.add(Classes.NUMBERS);
        for (let i = 0; i < 15; i += 1) {
            lineNumber.innerHTML += `${i + 1}<br>`;
        }
        return lineNumber;
    };
    createWrapperGame = (): HTMLDivElement => {
        const container = document.createElement(Tags.DIV);
        container.classList.add(Classes.GAME);
        container.append(
            this.createBlock(
                Tags.DIV,
                [Classes.LAYOUT],
                this.createElement(Tags.H2, [Classes.LAYOUT_HEADER], levels[this.levelActive].doThis),
                this.createTable()
            ),
            this.createBlock(
                Tags.DIV,
                [Classes.EDITOR],
                this.createHeaderElement(Tags.DIV, [Classes.EDITOR], Text.CSS, Text.STYLE),
                this.createBlock(Tags.DIV, [Classes.EDITOR_MAIN], this.createFormEditor(), this.createLineNumber())
            ),
            this.createBlock(
                Tags.DIV,
                [Classes.VIEWER],
                this.createHeaderElement(Tags.DIV, [Classes.VIEWER], Text.HTML, Text.INDEX),
                this.createBlock(Tags.DIV, [Classes.VIEWER_MAIN], this.createLineNumber(), this.createHtmlCode())
            )
        );
        return container;
    };

    initApp = (): void => {
        const container = document.createElement(Tags.DIV);
        container.classList.add(Classes.WRAPPER);
        container.append(
            this.createBlockLevel(),
            this.createWrapperGame(),
            this.createElement(Tags.SPAN, [Classes.TOOLTIP])
        );
        document.body.append(container);
    };
}
