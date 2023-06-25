import GenerateElements from './generateElements';
import { Classes } from '../interface/enums';
import { Tags } from '../interface/enums';

export default class Game extends GenerateElements {
    createWrapperGame = (): HTMLDivElement => {
        const container = document.createElement(Tags.DIV);
        container.classList.add(Classes.GAME);
        container.append(
            this.createBlock(Tags.DIV, [Classes.EDITOR], this.createBlock(Tags.DIV, [Classes.EDITOR_MAIN])),
            this.createBlock(Tags.DIV, [Classes.VIEWER], this.createBlock(Tags.DIV, [Classes.VIEWER_MAIN]))
        );
        return container;
    };

    initApp = (): void => {
        const container = document.createElement(Tags.DIV);
        container.classList.add(Classes.WRAPPER);
        container.append(this.createWrapperGame());
        document.body.append(container);
    };
}
