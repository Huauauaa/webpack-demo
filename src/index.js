import _ from 'lodash';
import foo from './foo';
require('./assets/styles/index.css');
import './assets/styles/style.scss';

const div = document.createElement('DIV');
div.innerHTML = _.join(['Hello', 'World', foo.name], ' ');

document.body.appendChild(div);