import CreateLevel from './createLevel';
import { normalizeHtml } from '../utils/utils';
import { Classes, Tags, Text, Number } from '../interface/enums';
import { DataLevels } from '../interface/interface';

export default class Game extends CreateLevel {
    private currentElem: HTMLElement | null = null;
    private isPassedLevel = true;

    constructor(public data: DataLevels[]) {
        super(data);
        this.levels = data;
    }

    private createFormEditor = (): HTMLFormElement => {
        this.formEditor = this.createElement(Tags.FORM, [Classes.FORM]) as HTMLFormElement;
        this.input = this.createElement(Tags.INPUT, [Classes.FORM_INPUT, Classes.BLINK]) as HTMLInputElement;
        this.input.placeholder = Text.PLACEHOLDER;
        this.input.type = 'text';
        this.input.focus();

        this.formEditor.append(
            this.input,
            this.createButton(
                [Classes.FORM_BUTTON],
                'submit',
                () => null,
                '',
                this.createElement(Tags.SPAN, [Classes.BUTTON_TEXT], Text.ENTER)
            ),
            this.createButton([Classes.FORM_HELP], 'button', this.showAnswer, Text.HELP)
        );

        this.formEditor.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            if (this.input.value === this.levels[this.levelActive].selector) {
                this.table.querySelectorAll('*').forEach((item: Element) => {
                    if (item.closest(this.levels[this.levelActive].selector)) {
                        item.closest(`${this.levels[this.levelActive].selector}`)?.classList.add('win');
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
                ? this.input.classList.add(Classes.BLINK)
                : this.input.classList.remove(Classes.BLINK);
        });

        return this.formEditor;
    };

    private setLocalStorageProgress = (): void => {
        const progress = JSON.parse(localStorage.getItem('progress') || '{}') || {};
        const result =
            progress[`${this.levelActive}`] && progress[`${this.levelActive}`].correct
                ? progress
                : { ...progress, [this.levelActive]: { correct: this.isPassedLevel, incorrect: !this.isPassedLevel } };
        localStorage.setItem('progress', JSON.stringify(result));
    };

    private showAnswer = (): void => {
        if (this.isPrintText && this.isGame) {
            this.isPrintText = false;
            const arrayResponseLetters: string[] = this.levels[this.levelActive].selector.split('');
            this.input.classList.remove(Classes.BLINK);
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

    private showTooltip = (element: HTMLElement): void => {
        if (!element) return;
        if (element.tagName) {
            const tooltipText = `&lt;${element.tagName.toLocaleLowerCase()}${this.getAttributes(
                element
            )}>&lt/${element.tagName.toLocaleLowerCase()}>`;
            const node = document.querySelector('.tooltip') as HTMLElement;
            node.classList.toggle(Classes.HIDDEN);
            node.innerHTML = tooltipText;
            const elementClientRects = element.getClientRects()[0];
            node.style.left = `${elementClientRects.x - 60}px`;
            node.style.top = `${elementClientRects.y - 50}px`;
        }
    };

    private highlightElement = (e: Event): void => {
        if (this.isGame) {
            const target = e.target as Element;
            const elementsCode = Array.prototype.slice.call(this.htmlCode.querySelectorAll('*'));
            const elementsTable = Array.prototype.slice.call(this.table.querySelectorAll('*'));
            const index = target.tagName !== 'DIV' ? elementsTable.indexOf(target) : elementsCode.indexOf(target);
            if (e.type === 'mouseover') {
                if (this.currentElem) return;
                this.currentElem = e.target as HTMLElement;
                this.showTooltip(elementsTable[index]);
                elementsTable[index]?.classList.add(Classes.ACTIVE);
                elementsCode[index]?.classList.add(Classes.BACKLIGHT);
            }
            if (e.type === 'mouseout') {
                if (!this.currentElem) return;
                elementsTable[index]?.classList.remove(Classes.ACTIVE);
                elementsCode[index]?.classList.remove(Classes.BACKLIGHT);
                this.currentElem = null;
                this.showTooltip(elementsTable[index]);
            }
        }
    };

    private createHtmlCode = (): HTMLDivElement => {
        this.htmlCode = this.createElement(Tags.DIV, [Classes.HTML_CODE]) as HTMLDivElement;
        this.htmlCode.append(this.getViewerCode(this.levels[this.levelActive].boardMarkup));

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

    private createTable = (): HTMLElement => {
        this.table = this.createElement(Tags.SECTION, [Classes.TABLE]) as HTMLElement;
        this.table.innerHTML = normalizeHtml(this.levels[this.levelActive].boardMarkup);
        this.table.querySelectorAll('*').forEach((item: Element) => {
            if (item.closest(this.levels[this.levelActive].selector)) {
                item.closest(`${this.levels[this.levelActive].selector}`)?.classList.add(Classes.SELECTED);
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

    private createLineNumber = (): HTMLDivElement => {
        const lineNumber = this.createElement(Tags.DIV, [Classes.NUMBERS]) as HTMLDivElement;
        for (let i = 0; i < Number.LINE_COUNT; i += 1) {
            lineNumber.innerHTML += `${i + 1}<br>`;
        }
        return lineNumber;
    };
    private createWrapperGame = (): HTMLDivElement => {
        const container = this.createElement(Tags.DIV, [Classes.GAME]) as HTMLDivElement;
        container.append(
            this.createBlock(
                Tags.DIV,
                [Classes.HEADING_WRAPPER],
                this.createElement(Tags.H2, [Classes.LAYOUT_HEADER], this.levels[this.levelActive].doThis)
            ),
            this.createBlock(
                Tags.DIV,
                [Classes.LAYOUT],

                this.createBlock(
                    Tags.DIV,
                    [Classes.TABLE_PLANETS],
                    this.createBlock(Tags.DIV, [Classes.TABLE_WRAPPER], this.createTable())
                )
            ),
            this.createBlock(
                Tags.DIV,
                [Classes.EDITOR_WRAPPER],
                this.createBlock(
                    Tags.DIV,
                    [Classes.EDITOR],
                    this.createBlock(
                        Tags.DIV,
                        [Classes.EDITOR_HEADER],
                        this.createElement(Tags.DIV, [Classes.EDITOR_ITEM], Text.CSS),
                        this.createElement(Tags.DIV, [Classes.EDITOR_ITEM], Text.STYLE)
                    ),
                    this.createBlock(Tags.DIV, [Classes.EDITOR_MAIN], this.createFormEditor(), this.createLineNumber())
                ),
                this.createBlock(
                    Tags.DIV,
                    [Classes.VIEWER],
                    this.createBlock(
                        Tags.DIV,
                        [Classes.VIEWER_HEADER],
                        this.createElement(Tags.DIV, [Classes.VIEWER_ITEM], Text.HTML),
                        this.createElement(Tags.DIV, [Classes.VIEWER_ITEM], Text.INDEX)
                    ),
                    this.createBlock(Tags.DIV, [Classes.VIEWER_MAIN], this.createLineNumber(), this.createHtmlCode())
                )
            ),
            this.createBlock(
                Tags.FOOTER,
                [Classes.FOOTER],
                this.createLink([Classes.GIT], Text.GITHUB, Text.LINK_GITHUB),
                this.createElement(Tags.DIV, [Classes.YEARS], Text.RS),
                this.createLink([Classes.RS_SCHOOL], '', Text.LINK_RS)
            )
        );
        return container;
    };

    public initApp = (): void => {
        const container = this.createElement(Tags.DIV, [Classes.WRAPPER]);
        container.append(
            this.createBlockLevel(),
            this.createWrapperGame(),
            this.createElement(Tags.DIV, [Classes.TOOLTIP])
        );
        document.body.append(container);
    };
}
