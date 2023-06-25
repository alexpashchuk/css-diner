import GenerateElements from './generateElements';
import { Classes, Tags, Text } from '../interface/enums';
import levels from '../data/levelsData';

export default class Game extends GenerateElements {
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
                [Classes.EDITOR],
                this.createHeaderElement(Tags.DIV, [Classes.EDITOR], Text.CSS, Text.STYLE),
                this.createBlock(Tags.DIV, [Classes.EDITOR_MAIN], this.createLineNumber())
            ),
            this.createBlock(
                Tags.DIV,
                [Classes.VIEWER],
                this.createHeaderElement(Tags.DIV, [Classes.VIEWER], Text.HTML, Text.INDEX),
                this.createBlock(Tags.DIV, [Classes.VIEWER_MAIN], this.createLineNumber())
            )
        );
        return container;
    };

    initApp = (): void => {
        const container = document.createElement(Tags.DIV);
        container.classList.add(Classes.WRAPPER);
        container.append(this.createWrapperGame(), this.createElement(Tags.SPAN, [Classes.TOOLTIP]));
        document.body.append(container);
    };
}
