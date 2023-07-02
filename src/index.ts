import Game from './components/game';
import levels from './data/levelsData';
import './css/style.css';

window.onload = () => {
    const game = new Game(levels);
    game.initApp();
};
