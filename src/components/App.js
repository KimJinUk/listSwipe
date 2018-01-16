import React from 'react';
import AppBar from './AppBar';
import Tabs from './Tabs';

class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			words:[{
				string:'grunt',
				meanN:'뜀박질',
				meanA:'',
				meanV:'',
				isFavorite:'',
			},{
				string:'orthodox',
				meanN:'정통파의 사람',
				meanA:'정통의',
				meanV:'',
				isFavorite:'',
			},{
				string:'scrap',
				meanN:'조각',
				meanA:'',
				meanV:'싸우다, 다투다',
				isFavorite:'',
			}]
		}

	}


    render(){
    	//console.log(this.state.words)
        return (
        	<div>
            	<AppBar/>
            	<Tabs words = {this.state.words}/>
            </div>
        );
    }
}

export default App;