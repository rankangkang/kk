import { Component } from 'react';
import * as React from 'react';
// 非css module方式
import '../assets/styles/global.less';
import bg from '@assets/images/webpack.png'

export default class Page extends Component {
  state = {
    tick: 1,
    timer: undefined,
  }
  render() {
    let dots = Array(this.state.tick).fill('.').join('');
    
    return (
      <div className='wrap'>
        <img src={bg} alt="" />
        <h1>
          hey, there
          {
            dots
          }
          </h1>
      </div>
    )
  }
  
  componentDidMount() {
    let timer = setInterval(() => {
      let tick = (this.state.tick + 1) % 4;
      this.setState({tick})
    }, 1000);
    this.setState({timer});
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }
}