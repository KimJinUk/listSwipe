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
	    	//이벤트 발생 트리거
	    	isTouched : false,
	    	//터치(클릭)시
			touchedPosition : 0,
			//스와이프(드래그)시
			clientX : 0,
			clientY : 0,
			pageX : 0,
			pageY : 0,
			
			//출력가부
			wordCoverDisplay : 'table',
			wordMeanDisplay : 'block',


			//모션 - 즐겨찾기 아이콘 이동 마진
			favoriteMarginRight : 0,

			//모션 - 뜻 높이값
			meanHeight : 75,

			//모션 - 아이콘 회전 및 생성
			iconScaleX : 0,
			iconScaleAll : 0,
		}

		//터치 이벤트 핸들러(상위)
	    this.handleTouchStart = this.handleTouchStart.bind(this);
	    this.handleTouchMove = this.handleTouchMove.bind(this);
	    this.handleTouchEnd = this.handleTouchEnd.bind(this);
	    
	    //마우스 이벤트 핸들러(하위)
	    this.handleMouseDown = this.handleMouseDown.bind(this);
	    this.handleMouseMove = this.handleMouseMove.bind(this);
	    this.handleMouseUp = this.handleMouseUp.bind(this); 
	}

	handleMouseDown(e) {
		//e.stopPropagation();
		//e.preventDefault();
		//마우스 안눌렸으면
		if(!this.state.isTouched) {
		  this.setState({
		  	//클릭 상태 저장, 클릭된 위치 x값 저장, 눌린 후 마우스의 x위치값 저장
		    isTouched : true,
		    touchedPosition : e.clientX,
		    clientX : e.clientX,
			clientY : e.clientY,
			pageX : e.pageX,
			pageY : e.pageY,		    
		  })
		}
	}

	handleMouseMove(e) {
		//터치된 상태에서
		if(this.state.isTouched) {
			//마우스 움직이면
			this.setState({
				//마우스의 위치값 저장
			    clientX : e.clientX,
				clientY : e.clientY,
				pageX : e.pageX,
				pageY : e.pageY,
			})
		}
	}

	handleMouseUp() {
	//e.stopPropagation();
	  this.setState({
	  	//클릭 상태 변경
	    isTouched : false,
	  })

		//클릭해서 스와이프 한 거리가 왼쪽으로 50%이상이면,
		if(this.state.touchedPosition-this.state.clientX>innerWidth*0.5) {
			this.setState({
				//뜻 사라지며 아이콘 돌아감
				wordCoverDisplay : 'none',
				
				//rotateScale: 0
			})
			setTimeout(()=>{
				
				this.setState({
				//0.5초 후에는 아이콘과 텍스트 높이 사라지도록
				meanHeight : 0,
				wordMeanDisplay : 'none',
				//iconDisplay : 'none'
			})
			},500)
		}
	}

	handleTouchStart(e) {
		//e.preventDefault();
		this.handleMouseDown(e.touches[0]);
	}

	handleTouchMove(e) {
		//e.preventDefault();
		this.handleMouseMove(e.touches[0]);
	}

	handleTouchEnd(e) {
		//e.preventDefault();
		this.handleMouseUp(e.touches[0]);
	}

    componentDidMount() {
    	//전체 움직이게 하는 놈(터치 시)
    	//window.addEventListener('touchstart', this.handleTouchStart);
        window.addEventListener('touchmove', this.handleTouchMove);
        //터치 떼면 마지막에 이상한 값 반환하는 놈
        //window.addEventListener('touchend', this.handleTouchEnd);

        //전체 움직이게 하는 놈(클릭 시)
        //window.addEventListener('mousedown', this.handleMouseDown);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    }

    componentDidUpdate(prevProps,prevState) {
    	if(prevState.wordMeanDisplay==='block'&&this.state.wordMeanDisplay==='none') {
    		this.props.deleteWord(this.props.i)
    	}
    }

    componentWillUnmount() {
    	window.removeEventListener('touchstart', this.handleTouchStart);
        window.removeEventListener('touchmove', this.handleTouchMove);
        window.removeEventListener('touchend', this.handleTouchEnd);

        window.removeEventListener('mousedown', this.handleTouchMove);
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }

    render(){
    	const rowSwipeValue = this.state.isTouched?this.state.clientX-this.state.touchedPosition:0
	    const rowSwipeLeftValue = this.state.touchedPosition-this.state.clientX
	    const rowSwipeRightValue = this.state.clientX-this.state.touchedPosition

        return (

        	<div
				className='wordRow'

				onTouchStart={this.handleTouchStart}
	        	onTouchMove={this.handleTouchMove}
	        	onTouchEnd={this.handleTouchEnd}
	        	onMouseDown={this.handleMouseDown}
	        	onMouseMove={this.handleMouseMove}
	        	onMouseUp={this.handleMouseUp}

	        	style={{
	        		width : '100%',
	        		height : '76px',

	        		position : 'inherit',
	        }}>        	
				<Motion 
					style={{
						rowSwipeValue 		: spring(rowSwipeValue, { stiffness: 700, damping: 50 }),
						favoriteMarginRight : spring(this.state.favoriteMarginRight, { stiffness: 1000, damping: 50 }),
				}}>
	        		{({rowSwipeValue, favoriteMarginRight}) =>
	        		//껍데기(단어, 즐겨찾기 아이콘)
        				<div
        					className='wordCover'
			            	style={{
			            		width : 'inherit',
			            		height : 'inherit',
			            		paddingLeft : '16px',

			            		display : this.state.wordCoverDisplay,

			            		borderBottom : '1px solid rgb(221, 221, 221)',
			            		boxSizing : 'border-box',	

			            		backgroundColor : 'white',			            		

								transform : `translate(${rowSwipeValue}px,0)`,
		            	}}>	        				
	        				<div
	        					className='wordText'
				            	style={{
				            		width : '80%',
				            		height : '75px',

				            		display : 'table-cell',
				            		verticalAlign : 'middle',
			            	}}>
	        					{this.props.words.string}
	        				</div>
	        				<div
	        					className='favoriteIcon'
				            	style={{
				            		display : 'table-cell',
				            		verticalAlign : 'middle',
			            	}}>
		            			<StarBorder style={{
		            				//marginRight:`${favoriteMargin}px`,

		            				fill : 'rgb(241, 241, 241)'
		            			}}/>
	        				</div>	
	        			</div>
		  		    }
	        	</Motion>
				<Motion 
					style={{
						meanHeight			: spring(this.state.meanHeight, { stiffness: 200, damping: 50 }),
				}}>
	        		{({meanHeight}) =>
	        		//단어 뜻
	        			<div
	        				className='wordMean'

			    			style={{
				    				width:'inherit',
				    				height : `${meanHeight}px`,

				    				position : 'absolute',
				    				top : '0px',

				    				display : 'table',

				    				zIndex : '-1',

				    				backgroundColor : rowSwipeRightValue>=0?'rgb(216, 0, 0)':'rgb(76,175,80)',
	        			}}>
	        				<span
	        					style={{
	        						paddingLeft : '16px',

        							display : `${meanHeight}`!=='75'?'none':'table-cell',
				    				verticalAlign:'middle',
	        				}}>
			        			<span style={{
			        				display : this.state.wordMeanDisplay, 
			        				fontSize:'13px', 
			        				color:'white'
			        			}}>
			        				{this.props.words.meanN&& 'n ' + this.props.words.meanN}
			        			</span>
			        			<span style={{
			        				display : this.state.wordMeanDisplay,
			        				fontSize:'13px', 
			        				color:'white'
			        			}}>
			        				{this.props.words.meanV&& 'v ' + this.props.words.meanV}
			        			</span>
			        			<span style={{
			        				display : this.state.wordMeanDisplay,
			        				fontSize:'13px', 
			        				color:'white'
			        			}}>
			        				{this.props.words.meanA&& 'a ' + this.props.words.meanA}
			        			</span>
	        				</span>
	        			</div>
		  		    }
	        	</Motion>	
				<Motion 
					style={{
						iconScaleX			: spring(this.state.iconScaleX, { stiffness: 1000, damping: 50 }),
						iconScaleAll 		: spring(this.state.iconScaleAll, { stiffness: 1000, damping: 50 }),
				}}>
	        		{({iconScaleX, iconScaleAll}) =>
	        		//아이콘
	        			<div
	        			>
	        			</div>
		  		    }
	        	</Motion>		        		        				
			</div>
        );
    }
}

export default Item;