import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
  wrapper: {
    padding: '0px 20px',
  },
  headline: {
    fontSize: 15,
    fontWeight: 800,
  },
  word: {
    fontSize: 15,
  }
};

function handleActive(tab) {
  alert(`A tab with this route property ${tab.props.index} was activated.`);
}

const TabsExampleSimple = () => (
  <MuiThemeProvider>
    <Tabs inkBarStyle={{backgroundColor:'rgb(255, 235, 59)'}}>
      <Tab label="학습" style={{backgroundColor:'rgb(76,175,80)'}}>
        <div style={styles.wrapper}>
          <h2 style={styles.headline}>완전히 기억하고 있는 단어</h2>
          <h2 style={styles.word}>word</h2>
        </div>
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

export default TabsExampleSimple;