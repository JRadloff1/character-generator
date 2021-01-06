import React from "react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      character: null,
    };
    this.GenrateCharacter = this.GenrateCharacter.bind(this);
  }

  GenrateCharacter() {
    this.setState(state => ({
      character: {
        name: "Super Cool Character Name",
      }})
    );
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
            <h1>The character '{this.state.character.name}' has been created</h1>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
