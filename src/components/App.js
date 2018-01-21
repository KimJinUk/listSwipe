import React from 'react';
import AppBar from './AppBar';
import Tabs from './Tabs';

import update from 'react-addons-update';

class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			words:[{
				string:'grunt',
				meanN:'뜀박질',
				meanA:'',
				meanV:'',
				isFavorite:false,
			},{
				string:'orthodox',
				meanN:'정통파의 사람',
				meanA:'정통의',
				meanV:'',
				isFavorite:false,
			},{
				string:'scrap',
				meanN:'조각',
				meanA:'모름',
				meanV:'싸우다, 다투다',
				isFavorite:false,
			}]
		}

		this.deleteWord = this.deleteWord.bind(this)
	}

	deleteWord(index) {
		this.setState({
			words: update(
				this.state.words,
				{
					$splice:[[index, 1]]
				})
		});

	}

    render(){
        return (
        	<div>
            	<AppBar/>
            	<Tabs words = {this.state.words} deleteWord = {this.deleteWord}/>
            </div>
        );
    }
}

export default App;