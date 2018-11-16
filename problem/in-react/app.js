'use strict';

class JustABlot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    shouldComponentUpdate() {
        this.sleep(5)
    }

    sleep = (milliseconds) => {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
            break;
          }
        }
      }
    

    render() {
        return (
            <span id="blot"> {this.props.number } </span>
        )
    }
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', randomNumbers: [] };
    this.poolofNumbers = [],
    this.start = 0;
    this.end = 1000;
    setTimeout(this.init.bind(this), 0);
  }

  init = () => {
    const randNums = [];
    for(let i=0; i<100000; i++) {
        let numGen = Math.floor(Math.random() * (20000 - 1000 + 1)) + 1000;
        randNums.push(numGen)
    }
    this.poolofNumbers = randNums
  }

  typingHandler = (event) => {
    const randomNumbers = this.state.randomNumbers.concat(this.poolofNumbers.slice(this.start, this.end));
    this.start = this.end;
    this.end = this.end + 1000;
    this.setState({ randomNumbers, value: event.target.value })
  }

  render() {
   return <div>
      <h2> Demo App </h2>
      <div>
        <label> Just type: </label> 
        <input 
            type="text" 
            value={this.state.value} 
            onChange={this.typingHandler}>
        </input>
        <div>
            {
                this.state.randomNumbers.map(num => <JustABlot number={num} />)
            }
        </div>
      </div>
      <div>

        
      </div>
    </div>
}
}

const domContainer = document.querySelector('#app');
ReactDOM.render(<Root></Root>, domContainer);