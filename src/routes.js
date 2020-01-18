import React from 'react'
import { Route, Router } from 'react-router-dom'
import Schools from './Schools'
import { createBrowserHistory }  from 'history'

const Routes = () => (
  <Router history={createBrowserHistory()}>
    <Route 
      exact 
      path='/' 
      component={() =>  <Schools />} 
    />
  </Router>
)

export default Routes;