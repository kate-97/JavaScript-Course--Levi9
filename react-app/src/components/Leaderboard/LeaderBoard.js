import React from "react";

import "./LeaderBoard.css";
import GetResults from "../../apis/entries";

class LeaderBoard extends React.Component {
  state = { results: [] };

  // setting state here will trigger re-rendering :)
  componentDidMount() {
    this.fromMongo();
  }

  async fromMongo() {
    let results = await GetResults.getResults();
    console.log(results);
    results = results.sort((a, b) => a.score > b.score);
    this.setState({results:results});
  }

  render() {
    console.log(this.state);

    
    let rank = 1;
    let content = this.state.results.map(
      value => 
      
      <tr className="row">
      <td className="cell">{rank++}.</td>
          <td className="cell">{value.name}</td>
          <td className="cell">{value.score}</td>
        </tr>
    );

    return (
      <div className="mainWrapper">
        <h2 id="header"> "Color tap game" </h2>
        
        <table className="board">
          
          <thead>
          <tr className="header">
          <th>POSITION</th>
              <th>USERNAME</th>
              <th>SCORE</th>
            </tr>
            </thead>

            <tbody>
              {content}
            </tbody>  

        </table>
      </div>
    );
  }
}

export default LeaderBoard;
