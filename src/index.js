import _ from 'lodash';
import foo from './foo';
require('./assets/index.css');
import './assets/style.scss';

const div = document.createElement('DIV');
div.innerHTML = _.join(['Hello', 'World', foo.name], ' ');

document.body.appendChild(div);