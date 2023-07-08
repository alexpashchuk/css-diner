import ManageLevel from './manageLevel';
import { Classes, Tags } from '../interface/enums';
import { DataLevels } from '../interface/interface';

export default class CreateLevel extends ManageLevel {
    constructor(public data: DataLevels[]) {
        super(data);
        this.levels = data;
    }

    private createLevelHeader = (): HTMLDivElement => {
        this.levelHeader = this.createElement(Tags.DIV, [Classes.LEVEL_HEADER]) as HTMLDivElement;
        this.levelNumber = this.createElement(Tags.SPAN, [Classes.LEVEL_TITLE]) as HTMLSpanElement;
        this.levelNumber.textContent = `Level ${this.levelActive + 1} of ${this.levels.length}`;

        this.levelHeader.append(
            this.createButton(
                [Classes.BUTTON_MENU],
                'button',
                this.toggleMenu,
                '',
                this.createElement(Tags.DIV, [Classes.BURGER])
            )
        );
        this.levelHeader.append(this.levelNumber);
        this.levelHeader.append(this.createElement(Tags.SPAN, [Classes.CHECK_MARK, Classes.CHECK]));
        this.levelHeader.append(this.createButton([Classes.BUTTON_PREV], 'button', this.showPrevLevel, ''));
        this.levelHeader.append(this.createButton([Classes.BUTTON_NEXT], 'button', this.showNextLevel, ''));

        return this.levelHeader;
    };

    private createMenuLevel = (): HTMLDivElement => {
        this.rootMenu = this.createElement(Tags.DIV, [Classes.LEVEL_MENU]) as HTMLDivElement;
        this.listMenu = this.createElement(Tags.UL, [Classes.LEVEL_LIST]) as HTMLUListElement;

        for (let i = 0; i < this.levels.length; i += 1) {
            const item = document.createElement(Tags.LI);
            item.classList.add(Classes.LIST_ITEM);
            item.classList.add(this.levelActive + 1 === i + 1 ? Classes.LIST_ACTIVE : Classes.LIST_ITEM);
            item.id = (i + 1).toString();
            item.innerHTML = `<span class="check-mark" aria-hidden="true"></span>
            <span class="list-text">${i + 1}.${this.levels[i].syntax}</span>`;
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

    protected createBlockLevel = (): HTMLDivElement => {
        this.rootLevel = this.createElement(Tags.DIV, [Classes.LEVEL]) as HTMLDivElement;
        this.rootLevel.append(this.createLevelHeader(), this.createMenuLevel(), this.createLevelHelp());
        this.toggleListActives();
        return this.rootLevel;
    };
}
