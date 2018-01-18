import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import ActionInfo from 'material-ui/svg-icons/action/info';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Motion, spring} from 'react-motion';

class Item extends React.Component {
	constructor(props) {
		super(props)
	    this.state = {
			location:[0],
			clickedPosition:0,
			isClicked:false
		}

    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    
	}

	handleMouseDown(e) {
		if(!this.state.isClicked) {
		  this.setState({
		    isClicked: true,
		    clickedPosition: e.clientX,
		    location: [e.clientX]
		  })
		}
	}

	handleMouseMove({x}) {
		this.setState({
		  location: [x]
		})
	}

	handleMouseUp() {
		if(this.state.isClicked) {
		  this.setState({
		    isClicked: false
		  })
		}
	}

	handleTouchStart(e) {
		 this.handleMouseDown(e.touches[0]);
	}

	handleTouchMove(e) {
		//e.preventDefault();
		this.handleMouseMove(e.touches[0]);
	}

    componentDidMount() {

        document.getElementsByClassName('iii').addEventListener('touchmove', this.handleTouchMove,true);
        window.addEventListener('touchend', this.handleMouseUp);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    
    }

    componentWillUnmount() {
        window.removeEventListener('touchmove', this.handleTouchMove,true);
        window.removeEventListener('touchend', this.handleMouseUp);
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }


    render(){
    	const drag = this.state.isClicked?this.state.location[0]-this.state.clickedPosition:0
    	const config = { stiffness: 700, damping: 50 }
		const toCSS = (scale) => ({ transform: `scale(${scale}, ${scale})` })

    	if(this.state.clickedPosition>0) {
    		console.log(1)
    	}


        return (
        	<div className='iii'>
				<Motion 
					defaultStyle={{ scale: 1 }} 
					style={{ scale: spring(drag, config) }}
				>
	        		{({scale}) =>
		            	<div
		            		style = {{
			            		backgroundColor:'white',
		            			paddingLeft:'16px',
		            			width:'100%',
		            			height: '56px',
		            			position:'absolute',
		            			border:'1px solid rgb(221, 221, 221)',
		            			boxSizing:'border-box',
		            			display:'table',
		            			zIndex:'2',
		            			transform:`translate(${scale}px,0)`
			            		//display:this.state.location[0]-this.state.clickedPosition>-innerWidth*0.5?'block':'none'
			            		//transform: this.state.location[0]-this.state.clickedPosition>-innerWidth*0.5?`scale(${1}, ${1})`:`scale(${1}, ${scale})`
			            	}}
			            	onTouchStart={this.handleTouchStart}
			            	onTouchMove={this.handleTouchMove}
			            	onMouseDown={this.handleMouseDown}
			            	onMouseMove={this.handleMouseMove}
		            		>
		            		<div className='text' style={{
		            			display:'table-cell',
		            			verticalAlign:'middle',
		            			width:'90%',
		            			padding:'',
		            			boxSizing:'border-box'
		            		}}>
		            			apple
		            		</div> 	
		            		<div style={{
		            			display:'table-cell',
		            			verticalAlign:'middle',
		            			
		            		}}>
		            			<StarBorder/>
		            		</div> 			            		
		            	</div>

		        }
	        	</Motion>
	    		<div 
	    			className='text' style={{
	    				backgroundColor: this.state.location[0]-this.state.clickedPosition>0?'red':'rgb(76,175,80)',
	        			width:'100%',
	        			padding:'16px',
	        			height: '56px',
	        			position:'absolute',
	        			boxSizing:'border-box',
	        			zIndex:'1'
	        		}}>
	        			사과
				</div> 	
			</div>
        );
    }
}

export default Item;


/*
			        <Paper
	    				style = {{
	    					position:'absolute',
	    					backgroundColor: this.state.location[0]-this.state.clickedPosition>0?'red':'rgb(76,175,80)',
	    					width: '100%',
	    					height: '56px'}}
	    				zDepth={1}
	    			>
	    				{this.props.words.meanN}
	    			</Paper>
	    		    <Toolbar 
	    		    	style = {{
	    		    		position:'absolute',
	    		    		backgroundColor:'white', 
	    		    		borderBottom:'1px solid gray', 
	    		    		width:'100%',
	    		    		transform: `tlanslate3d(${scale},0,0,0)`,
	    		    		marginLeft:this.state.isClicked?this.state.location[0]-this.state.clickedPosition:1,
	    		    		zIndex:2
	    		    	}} 
			    		onMouseDown={this.handleMouseDown} 
			    		onMouseUp={this.handleMouseUp}
		    		>
	                  <ToolbarGroup firstChild={true} style={{padding:'10px'}}>
	                    {this.props.words.string}
	                  </ToolbarGroup>
	                  <ToolbarGroup>
	                    <StarBorder/>
	                    <ActionInfo />
	                  </ToolbarGroup>                 
	                </Toolbar>   
*/