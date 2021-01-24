import React from "react";
import Generator from '../Helpers/Generator';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      character: null,
    };
    this.GenrateCharacter = this.GenrateCharacter.bind(this);
  }

  GenrateCharacter() {
    let generator = new Generator();
    generator.GenerateCharacter().then(c => {
    this.setState(state => ({
      character: c
    })
    );
  });
  }

  render() {
    return (
      <div className="container">
        <div className="buttonArea">
          <button onClick={this.GenrateCharacter}>
            Generate Random Character
          </button>
        </div>
        <div className="content">
          {this.state.character === null ? (
            <h1>No Character Generated</h1>
          ) : (
            <div>
            <h1>The character '{this.state.character.name}' has been created</h1>
            <p>Race: '{this.state.character.race}'</p>
            <p>Class: '{this.state.character.class}'</p>
          </div>)}
        </div>
      </div>
    );
  }
}

export default Home;
