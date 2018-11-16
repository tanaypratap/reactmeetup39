'use strict';


class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: ''};
  }

  render() {
   return <div>
      <h2> Search App </h2>
      <div>
        <label> Search: </label> <input type="text" value={this.state.value} onChange={(event) => this.setState({ value: event.target.value})}></input>
      </div>
      <div>
        <h3> Movies </h3>
        <div id="movie-list">
          {
            movieData.filter((movie) => {
              if (this.state.value.length === 0 ) {
                return true
              }
              
              return  movie.title.indexOf(this.state.value) > 0
              
              }).map(movie => (
              <div key={movie.title} id="movie-card">
                <h4> { movie.title } </h4>
                <p> { movie.year } </p>
                <p> { movie.genres.map(genre => <span id="genre"> { genre }</span>) } </p>

                <p id="starring"> Starring: </p>
                <ul>
                {
                  movie.cast.map(actor => {
                   return  <li>
                      { actor }
                    </li>
                  })
                }
                </ul>
              
              </div>
            ))
          }
        </div>
       
      </div>
    </div>
}
}

const domContainer = document.querySelector('#app');
ReactDOM.render(<Root></Root>, domContainer);