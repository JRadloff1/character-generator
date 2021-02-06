import React from "react";
import Generator from "../Helpers/Generator";
import "./characterSheet.css";
import { Button, Form, Col, Row, Container } from "react-bootstrap";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.GenrateCharacter = this.GenrateCharacter.bind(this);
    this.generator = new Generator();
    this.state = {
      character: {
        name: "",
        class: "",
        race: "",
        level: 0,
        background: "",
        alignment: "",
        experiencePoints: "",
        inspiration: 0,
        proficiencyBonus: 0,
        abilityScores:{
          strength: 0,
          strengthMod:0,
          dexterity: 0,
          dexterityMod: 0,        
          constitution: 0,
          constitutionMod: 0,
          intelligence: 0,
          intelligenceMod: 0,
          wisdom: 0,
          wisdomMod: 0,
          charisma: 0,
          charismaMod: 0
        },
        armorClass: 0,
        initiative: 0,
        movementSpeed:[ {
          speed: 0,
          condition: "movement",
        }],
        currentHitPoints: 0,
        temporaryHitPoints: 0, 
        hitDice: {
          dieName: "",
          maxNumber: 0,
          numberOfDie: 0
        },
        DeathSaves: {
          succcess: 0,
          failures: 0
        },
        personalityTraits:"",
        ideals: "",
        bonds: "",
        flaws: "",
        skills: [
          {
            skillName:"",
            classSkill: false,
            raceSkill: false,
            skillMod: 0,
            additionalMod: 0
          }
        ],
        attacks:[
          {
            attackName: "",
            atkBonus: 0,
            damageType: "",
            notes: ""
          }
        ]
      },
      races: [],
      classes: [],
      backgrounds:[]
    };
    this.generator.GetRaces().then((r) => {
      this.setState((state) => ({
        races: r,
      }));
    });
    this.generator.GetClasses().then((c) => {
      this.setState((state) => ({
        classes: c,
      }));
    });
  }

  GenrateCharacter() {
    let classes = this.state.classes;
    let races = this.state.races;
    let c = this.generator.GenerateCharacter(classes, races);
    this.setState((state) => ({
      character: c,
    }));
  }

  selectClass() {}

  render() {
    return (
      <Container>
        <div className="text-right">
          <Button variant="primary" onClick={this.GenrateCharacter}>
            Generate Random Character
          </Button>
        </div>
          <Form>
            <Row>
              <Col lg="4" md="" sm="" xs="">
                <Row>
                  <Col>
                  <Form.Group>
                    <Form.Label>Character Name</Form.Label>
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder={this.state.character.name}
                    />
                  </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6" md="" sm="" xs="">
                    <Form.Group>
                      <Form.Label>Inspiration</Form.Label>
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder={this.state.character.inspiration}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg="6" md="" sm="" xs="">
                    <Form.Group>
                      <Form.Label>Proficiency Bonus</Form.Label>
                      <Form.Control
                        size="sm"
                        type="text"
                        placeholder={this.state.character.proficiencyBonus}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col lg="8" md="" sm="" xs="">
                <Row>
                  <Col>
                  <Form.Group>
                  <Form.Label>Class</Form.Label>
                  <Form.Control
                    as="select"
                    value={this.state.character.class}
                    size="sm"
                  >
                    {this.state.classes.map((c) => {
                      return <option key={c.name}>{c.name}</option>;
                    })}
                  </Form.Control>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group>
                  <Form.Label>Level</Form.Label>
                  <Form.Control
                  as="text"
                  size="sm"
                  value={this.state.character.level}
                  />
                </Form.Group>
                </Col>
                <Col>
                <Form.Group>
                  <Form.Label></Form.Label>
                  <Form.Control></Form.Control>
                </Form.Group>
                </Col>
                </Row>
                <Row>
                  <Col> 
                  <Form.Group>
                  <Form.Label></Form.Label>
                  <Form.Control></Form.Control>
                </Form.Group>
                </Col>
                  <Col>
                  <Form.Group>
                  <Form.Label></Form.Label>
                  <Form.Control></Form.Control>
                </Form.Group>
                </Col>
                  <Col>
                  <Form.Group>
                  <Form.Label></Form.Label>
                  <Form.Control></Form.Control>
                </Form.Group>
                </Col>
                </Row>
                
              </Col>
            </Row>
          </Form>
      </Container>
    );
  }
}

export default Home;
