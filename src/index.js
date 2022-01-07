import _ from 'lodash';
import foo from './foo';
import './assets/styles/style.scss';
import bar from './bar.json';

require('./assets/styles/index.css');

const promise = new Promise(((resolve) => {
  setTimeout(() => {
    console.log('定时器执行完了~');
    resolve();
  }, 1000);
}));
console.log(promise);
const div = document.createElement('DIV');
div.innerHTML = _.join(['Hello', 'World', foo.name, bar.id], ' ');
document.body.appendChild(div);
