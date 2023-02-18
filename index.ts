import './style.css';
import { numberToWord, SupportedLang } from './numbertowords';

const appDiv: HTMLElement = document.getElementById('app');

appDiv.innerHTML = numberToWord(12.345, 2, SupportedLang.uz, ['сўм', 'тийин']);
