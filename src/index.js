import './index.css';
import { bar1 } from './bar';

import(/* webpackChunkName: 'foo'*/ './foo').then(({ fn2 }) => {
  fn2();
});

console.log('index.js');

if (module.hot) {
  module.hot.accept('./bar', function () {
    bar1();
  });
}

bar1();
