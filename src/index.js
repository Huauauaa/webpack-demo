import './index.css';

import(/* webpackChunkName: 'foo'*/ './foo').then((value) => {
  console.log(value);
});
