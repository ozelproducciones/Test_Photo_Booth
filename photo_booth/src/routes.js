import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Basic = lazy(() => import('./pages/basic/basic'))

function Routes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Basic}/>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default Routes;
