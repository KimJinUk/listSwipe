import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ActionInfo from 'material-ui/svg-icons/action/info';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Motion, spring} from 'react-motion';

class Item extends React.Component {
	constructor(props) {
		super(props)
	    this.state = {
			location:[0],
			clickedPosition:1,
			isClicked:false
		}

    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    window.addEventListener('mouseup',this.handleMouseUp);

	}

	  handleMouseDown(e) {
	    if(!this.state.isClicked) {
	      this.setState({
	        isClicked: !this.state.isClicked,
	        clickedPosition: e.clientX
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
    	console.log(this.state.location[0]);
    	console.log(this.state.clickedPosition);
        return (
        	
        	<Motion style={{x: spring(0)}}>
              {({x}) =>
	            <div>
	    		    <Toolbar 
	    		    	style = {{
	    		    		transform: `translate(${x}px,0)`, 
	    		    		backgroundColor:'white', 
	    		    		borderBottom:'1px solid gray', 
	    		    		width:'100%', 
	    		    		position:'absolute', 
	    		    		left:this.state.isClicked?this.state.location[0]-this.state.clickedPosition:1
	    		    	}} 
    		    		onMouseDown={this.handleMouseDown} 
    		    		onMouseUp={this.handleMouseUp}
		    		>
	                  <ToolbarGroup firstChild={true} style={{padding:'10px'}}>
	                    {this.props.string}
	                  </ToolbarGroup>
	                  <ToolbarGroup>
	                    <StarBorder/>
	                    <ActionInfo />
	                  </ToolbarGroup>                      
	                </Toolbar>    
	            </div>
              }
            </Motion>
        );
    }
}

export default Item;