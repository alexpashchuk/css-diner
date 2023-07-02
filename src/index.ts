import Game from './components/game';
import levels from './data/levelsData';
import './css/style.css';

const game = new Game(levels);

game.initApp();
