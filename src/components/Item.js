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
			textHeight:75,
			favoriteMargin:0,
			rotateScale:1
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
		    location: e.clientX
		  })
		}
	}

	handleMouseMove(e) {
		this.setState({
		  location: e.clientX
		})
		if(this.state.location-this.state.clickedPosition<0){
			this.setState({
				rotateScale: Math.abs(this.state.location-this.state.clickedPosition)/innerWidth*10>=1?1:Math.abs(this.state.location-this.state.clickedPosition)/innerWidth
			})
		}
		console.log(this.state.rotateScale)
	}

	handleMouseUp() {
		if(this.state.isClicked) {
			this.setState({
			    isClicked: false
			})
			if(this.state.location-this.state.clickedPosition<-innerWidth*0.5) {
				this.setState({
					wordDisplay: 'none',
					rotateScale: 0
				})
				setTimeout(()=>{this.setState({
					textHeight: 0,
					iconDisplay: 'none'
				})},500)
			}
			if(this.state.location-this.state.clickedPosition>0) {
				this.setState({favoriteMargin:60, rotateScale:1})
				setTimeout(()=>{this.setState({
					iconDisplay: 'table',
					iconScale: 0
				})},250)
				setTimeout(()=>{this.setState({
					iconScale: 1
				})},500)
			}
		}
	}

	handleTouchStart(e) {
		this.handleMouseDown(e.touches[0]);
	}

	handleTouchMove(e) {
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
    	const dragValue = { stiffness: 700, damping: 50 }
    	const scaleValue = { stiffness: 700, damping: 40 }
    	const marginValue = { stiffness: 1000, damping: 50 } 
    	const heightValue = { stiffness: 1000, damping: 50 } 
    	const rotateValue = { stiffness: 700, damping: 100 }  	
        return (
        	<div>
				<Motion 
					style={{ 
						drag: spring(drag, dragValue),
						favoriteMargin: spring(this.state.favoriteMargin, marginValue),
					}}
				>
	        		{({drag, favoriteMargin}) =>
	        			<div
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
			            			height: '75px',
			            			position:'absolute',
	        						top:`${this.props.i*75}px`,
			            			borderBottom:'1px solid rgb(221, 221, 221)',
			            			boxSizing:'border-box',
			            			display: this.state.wordDisplay,
			            			zIndex:'2',
			            			transform:`translate(${drag}px,0)`,
				            	}}>
			            		<div className='text' style={{
			            			display:'table-cell',
			            			verticalAlign:'middle',
			            			width:'90%',
			            			padding:'',
			            			boxSizing:'border-box'
			            		}}>
			            			{this.props.words.string}
			            		</div> 	
			            		<div style={{
			            			display:'table-cell',
			            			verticalAlign:'middle',
			            		}}>
			            			<StarBorder style={{marginTop: '5px', marginRight:`${favoriteMargin}px`,}}/>
			            		</div> 					            			            		
			            	</div>

						</div>
		        }
	        	</Motion>
				<Motion 
					style={{ 
						iconScale:spring(this.state.iconScale, scaleValue),
						rotateScale:spring(this.state.rotateScale, rotateValue)
					}}
				>
	        		{({iconScale, rotateScale}) =>

	            			<span
	            				style={{
	            					display:this.state.iconDisplay,
	            					margin:'23px 0',
	            					transform:`scale3d(${iconScale},${iconScale},${iconScale}) scaleX(${rotateScale})`,
			            			textAlign:'center',
			            			lineHeight:'28px',
	            					position:'absolute',
	            					fontSize:'12px',
	            					top:`${this.props.i*75}px`,
	            					right: '20px',
	            					height:'29px',
	            					width:'29px',
	            					color:'rgb(216, 0, 0)',
	            					border: '1px solid rgb(216, 0, 0)',
	            					borderRadius: '50%',
	            					zIndex:'2',
	            					backgroundColor:'white',
	            			}}>
	            			?
	            			</span>
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
			    				backgroundColor: this.state.location-this.state.clickedPosition>0?'rgb(216, 0, 0)':'rgb(76,175,80)',
			        			width:'100%',
			        			height: `${height}px`,
			        			position:'absolute',
	        					top:`${this.props.i*75}px`,
			        			boxSizing:'border-box',
			        			zIndex:'1',
			        			display:'table'
			        		}}>
			        		<span
				    			style={{
				    			display:`${height}`!=='75'?'none':'table-cell',
				    			verticalAlign:'middle',
				    			paddingLeft:'10px'
				    			
			        		}}>
			        			<span style={{display:'block', fontSize:'13px', color:'white'}}>
			        				{this.props.words.meanN&& 'n ' + this.props.words.meanN}
			        			</span>
			        			<span style={{display:'block', fontSize:'13px', color:'white'}}>
			        				{this.props.words.meanV&& 'v ' + this.props.words.meanV}
			        			</span>
			        			<span style={{display:'block', fontSize:'13px', color:'white'}}>
			        				{this.props.words.meanA&& 'a ' + this.props.words.meanA}
			        			</span>
			        		</span>			        			
						</div>
					}
				</Motion>				
			</div>
        );
    }
}

export default Item;