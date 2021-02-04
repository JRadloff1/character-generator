import React from "react";
import Generator from "../Helpers/Generator";
import "./characterSheet.css";
import { Button, Form } from "react-bootstrap";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      character: {
        name: "",
        class: "",
        race: "",
        inspiration: 0,
        proficiencyBonus: 0
      },
      races: [],
      classes: []
    };
    this.GenrateCharacter = this.GenrateCharacter.bind(this);
  }

  GenrateCharacter() {
    let generator = new Generator();
    generator.GenerateCharacter().then((c) => {
      this.setState((state) => ({
        character: c,
      }));
    });
  }

  render() {
    return (
      <div>
        <div className="buttonArea">
          <Button variant="primary" onClick={this.GenrateCharacter}>
            Generate Random Character
          </Button>
        </div>
        <div className="content">
          <Form>
            <Form.Group>
              <Form.Label>Character Name</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder={this.state.character.name}
              />
              <Form.Label>Inspiration</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder={this.state.character.inspiration}
              />
              <Form.Label>Proficiency Bonus</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder={this.state.character.proficiencyBonus}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Class</Form.Label>
              <Form.Control/>
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
}

export default Home;
