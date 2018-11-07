//import registerServiceWorker from './registerServiceWorker';
import 'babel-polyfill'
import React from 'react';
import mirror,{render} from 'mirrorx';

import App from './routes';
import Model from './models'

import 'antd/dist/antd.css'
import './index.css'

mirror.defaults({
    historyMode: 'hash'
})

Model.registerAll()

render(<App />, document.getElementById('root'));

//registerServiceWorker()
