import _ from 'lodash';
import foo from './foo';
require('./assets/styles/index.css');
import './assets/styles/style.scss';
import bar from './bar.json';

const div = document.createElement('DIV');
div.innerHTML = _.join(['Hello', 'World', foo.name, bar.id], ' ');

document.body.appendChild(div);
