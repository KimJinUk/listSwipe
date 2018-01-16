import React from 'react';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ActionInfo from 'material-ui/svg-icons/action/info';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import {Motion, spring} from 'react-motion';

class Item extends React.Component {
	constructor(props) {
		super(props)
	    this.state = {
			location:[],
			isClicked:false
		}

    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    window.addEventListener('mouseup',this.handleMouseUp);

	}

	  handleMouseDown() {
	    if(!this.state.isClicked) {
	      this.setState({
	        isClicked: !this.state.isClicked
	      })
	      window.addEventListener('mousemove',this.handleMouseMove,true);
	      window.addEventListener('touchmove',this.handleTouchMove,true);
	    }
	  }

	  handleMouseUp() {
	    if(this.state.isClicked) {
	      this.setState({
	        isClicked: !this.state.isClicked
	      })
	      window.removeEventListener('touchmove', this.handleTouchMove,true);
	      window.removeEventListener('mousemove', this.handleMouseMove,true);
	    }
	  }

	  handleMouseMove({x}) {
	    this.setState({
	      location: [x]
	    })
	  }

	  handleTouchMove(e) {
	    e.preventDefault();
	    this.handleMouseMove(e.touches[0]);     
	  }


    render(){
        return (
        	<div>
    		    <Toolbar style = {{backgroundColor:'white', borderBottom:'1px solid gray', position:'absolute', left:this.state.location[0]}} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
                  <ToolbarGroup firstChild={true} style={{padding:'10px'}}>
                    {this.props.string}
                  </ToolbarGroup>
                  <ToolbarGroup>
                    <StarBorder/>
                    <ActionInfo />
                  </ToolbarGroup>                      
                </Toolbar>    
            </div>
        );
    }
}

export default Item;