import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppHeaderContainer from './AppHeaderContainer/AppHeaderContainer';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#9ac433'
  }
});

const MainAppContainer = props => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <AppHeaderContainer />
      <div className='row'>
        <div className='col-xs-12'>
          <div className='box'>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  </MuiThemeProvider>
);

MainAppContainer.propTypes = {
  children: React.PropTypes.node
};

export default MainAppContainer;