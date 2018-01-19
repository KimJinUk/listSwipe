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
			location:0,
			clickedPosition:0,
			isClicked:false,
			wordDisplay:'table',
			iconDisplay:'none',
			iconScale:0,
			textHeight:56
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
		    location: e.clientX,
		    iconScale:0
		  })
		}
	}

	handleMouseMove(e) {
		this.setState({
		  location: e.clientX
		})
	}

	handleMouseUp() {
		if(this.state.isClicked) {
			this.setState({
			    isClicked: false
			})
			if(this.state.location-this.state.clickedPosition<-innerWidth*0.5) {
				this.setState({
					wordDisplay: 'none'
				})
				setTimeout(()=>{this.setState({
					textHeight: 0
				})},500)
			}
			if(this.state.location-this.state.clickedPosition>0) {
				this.setState({
					iconDisplay: 'table-cell',
					iconScale: 1
				})
			}
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
        window.addEventListener('touchmove', this.handleTouchMove,true);
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
    	const drag = this.state.isClicked?this.state.location-this.state.clickedPosition:0
    	// const height = this.state.location-this.state.clickedPosition<-innerWidth*0.5?0:56
    	const dragValue = { stiffness: 700, damping: 50 }
    	const scaleValue = { stiffness: 500, damping: 20 }
    	const heightValue = { stiffness: 1000, damping: 50 }   	

        return (
        	<div>
				<Motion 
					style={{ 
						drag: spring(drag, dragValue),
						iconScale: spring(this.state.iconScale, scaleValue),
					}}
				>
	        		{({drag, iconScale}) =>
	        			<div
	        				style={{
	        				//transform: this.state.location-this.state.clickedPosition>-innerWidth*0.5?`scaleY(${1})`:`scaleY(${scale})`
	        				
	        				}}
	    					onTouchStart={this.handleTouchStart}
			            	onTouchMove={this.handleTouchMove}
			            	onMouseDown={this.handleMouseDown}
			            	onMouseMove={this.handleMouseMove}
			            	onMouseUp={this.handleMouseUp}
			            	onTouchEnd={this.handleMouseUp}
	        			>
			            	<div
			            		style = {{
				            		backgroundColor:'white',
			            			paddingLeft:'16px',
			            			width:'100%',
			            			height: '56px',
			            			position:'absolute',
			            			border:'1px solid rgb(221, 221, 221)',
			            			boxSizing:'border-box',
			            			display: this.state.wordDisplay,
			            			zIndex:'2',
			            			transform:`translate(${drag}px,0)`
				            	}}
			            	>
			            		<div className='text' style={{
			            			display:'table-cell',
			            			verticalAlign:'middle',
			            			width:'80%',
			            			padding:'',
			            			boxSizing:'border-box'
			            		}}>
			            			apple
			            		</div> 	
			            		<div style={{
			            			display:'table-cell',
			            			verticalAlign:'middle',
			            			//transform:this.state.iconDisplay==='table-cell'?`translateX(${})`
			            		}}>
			            			<StarBorder/>
			            		</div> 		
			            		<div style={{
			            			display:this.state.iconDisplay,
			            			transform:`scale3d(${iconScale},${iconScale},${iconScale})`,
			            			verticalAlign:'middle',
			            		}}>
			            			<StarBorder/>
			            		</div> 			            			            		
			            	</div>

						</div>
		        }
	        	</Motion>
				<Motion 
					style={{ 
						height:spring(this.state.textHeight, heightValue)
					}}
				>
	        		{({height}) =>
			    		<div 
			    			className='text' style={{
			    				backgroundColor: this.state.location-this.state.clickedPosition>0?'red':'rgb(76,175,80)',
			        			width:'100%',
			        			height: `${height}px`,
			        			position:'absolute',
			        			boxSizing:'border-box',
			        			zIndex:'1'
			        		}}>
			        		<span
				    			style={{
				    			display:`${height}`!=='56'?'none':'inline-block',
				    			padding:'16px'
			        		}}>
			        			사과
			        		</span>			        			
						</div>
					}
				</Motion>				
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