import React, { Component } from 'react';

import appStyles from './AppStyles.css';

export default class App extends Component {
  render() {
    return (
      <div className='container'>
        <h1 className={appStyles.heading}>Hello World!!!</h1>
      </div>
    );
  }
}
