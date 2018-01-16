import React from 'react';
import AppBar from 'material-ui/AppBar';

import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const AppBarExampleIcon = () => (
	<MuiThemeProvider>
		<AppBar
			iconElementLeft={    
			    <IconButton>
			 	   <i className="material-icons">arrow_back</i>
			    </IconButton>
 			}
			title="단어장 단어"
			style={{backgroundColor:'rgb(76,175,80)'}}
		/>
	</MuiThemeProvider>
);

export default AppBarExampleIcon;