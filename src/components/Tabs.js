import React from 'react';
import Item from './Item';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
  wrapper: {

  },
  headline: {
    fontSize: 15,
    fontWeight: 800,
  },
  word: {
    fontSize: 15,
  }
};

export default class TabsExampleSimple extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      words:this.props.words
    }

  }


  render() {
    console.log(this.state.location)
    let words = this.state.words.map((memo, i) => {
                  //if(!memo.isDeleted)
                  return(
                    <Item string={memo.string} key={i}/>                    
                  );
                })

    

    return (
      <MuiThemeProvider>
        <Tabs inkBarStyle={{backgroundColor:'rgb(255, 235, 59)'}}>
          <Tab label="학습" style={{backgroundColor:'rgb(76,175,80)'}}>
            {words}
          </Tab>

          <Tab label="모르는 단어" style={{backgroundColor:'rgb(76,175,80)'}}>
            <div style={styles.wrapper}>
              <h2 style={styles.headline}>완전히 기억하고 있는 단어</h2>
              <h2 style={styles.word}>word</h2>
            </div>
          </Tab>

          <Tab label="한눈에 보기" style={{backgroundColor:'rgb(76,175,80)'}}>
            <div style={styles.wrapper}>
              <h2 style={styles.headline}>완전히 기억하고 있는 단어</h2>
              <h2 style={styles.word}>word</h2>
            </div>
          </Tab>

          <Tab label="암기 현황" style={{backgroundColor:'rgb(76,175,80)'}}>
            <div style={styles.wrapper}>
              <h2 style={styles.headline}>완전히 기억하고 있는 단어</h2>
              <h2 style={styles.word}>word</h2>
            </div>
            <div style={styles.wrapper}>
              <h2 style={styles.headline}>1회 학습한 단어</h2>
              <h2 style={styles.word}>word</h2>
            </div>        
          </Tab>      
        </Tabs>
      </MuiThemeProvider>
    );
  }
}