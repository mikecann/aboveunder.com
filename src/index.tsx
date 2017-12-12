import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { App } from './App';
import { getDb } from './lib/db';

async function init()
{
  var db = await getDb();
  ReactDOM.render(
    <App db={db} />,
    document.getElementById('root') as HTMLElement
  );
}

init();
registerServiceWorker();
