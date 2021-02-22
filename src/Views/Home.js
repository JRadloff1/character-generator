import React from "react";
import Generator from "../Helpers/Generator";
import Navigation from "../Components/Navigation/Navigation";
import "./characterSheet.css";
import { Button, Form, Col, Row, Container } from "react-bootstrap";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.GenrateCharacter = this.GenrateCharacter.bind(this);
    this.generator = new Generator();
  }
  state = {
    character: {
      name: "",
      class: "",
      race: "",
      level: 0,
      background: "",
      alignment: "",
      experiencePoints: 0,
      inspiration: 0,
      proficiencyBonus: 0,
      abilityScores: {
        strength: 0,
        strengthMod: 0,
        dexterity: 0,
        dexterityMod: 0,
        constitution: 0,
        constitutionMod: 0,
        intelligence: 0,
        intelligenceMod: 0,
        wisdom: 0,
        wisdomMod: 0,
        charisma: 0,
        charismaMod: 0,
      },
      armorClass: 0,
      initiative: 0,
      movementSpeed: [
        {
          speed: 0,
          condition: "movement",
        },
      ],
      currentHitPoints: 0,
      temporaryHitPoints: 0,
      hitDice: {
        dieName: "",
        maxNumber: 0,
        numberOfDie: 0,
      },
      DeathSaves: {
        succcess: 0,
        failures: 0,
      },
      personalityTraits: "",
      ideals: "",
      bonds: "",
      flaws: "",
      skills: [
        {
          skillName: "",
          classSkill: false,
          raceSkill: false,
          skillMod: 0,
          additionalMod: 0,
        },
      ],
      attacks: [
        {
          attackName: "",
          atkBonus: 0,
          damageType: "",
          notes: "",
        },
      ],
    },
    races: [],
    classes: [],
    backgrounds: [],
    alignments: [
      "Lawful Good",
      "Lawful Neutral",
      "Lawful Evil",
      "Neutral Good",
      "Neutral",
      "Neutral Evil",
      "Chaotic Good",
      "Chaotic Neutral",
      "Chaotic Evil",
    ],
  };

  componentDidMount() {
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

  onInputChange(event) {
    let newValue = event.target.value;
    let fieldToUpdate = event.target.name;
    this.setState({
      character: { ...this.state.character, [fieldToUpdate]: newValue },
    });
    console.log(this.state.character);
  }

  onSubFieldInputChange(event) {
    let newValue = event.target.value;
    let seperatorIndex = event.target.name.indexOf(".");
    let fieldToUpdate = event.target.name.substring(0, seperatorIndex);
    let subFieldToUpdate = event.target.name.substring(seperatorIndex + 1);
    let newField = this.state.character[fieldToUpdate];
    newField[subFieldToUpdate] = newValue;
    this.setState({
      character: { ...this.state.character, [fieldToUpdate]: newField },
    });
    console.log(this.state.character);
  }
  render() {
    return (
      <Container >
        <Row className="mt-3 mb-3">
          <Navigation />
          <Col lg="12" md="" sm="" xs="">
            <div className="text-right">
              <Button variant="primary" onClick={this.GenrateCharacter}>
                Generate Random Character
              </Button>
            </div>
          </Col>
        </Row>
        <Form>
          <Row>
            <Col lg="4" md="" sm="" xs="" className="m-1 bg-info p-3 rounded">
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Character Name</Form.Label>
                    <Form.Control
                      size="sm"
                      value={this.state.character.name}
                      name="name"
                      onChange={this.onInputChange.bind(this)}
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
                      type="number"
                      value={this.state.character.inspiration}
                      name="inspiration"
                      onChange={this.onInputChange.bind(this)}
                    />
                  </Form.Group>
                </Col>
                <Col lg="6" md="" sm="" xs="">
                  <Form.Group>
                    <Form.Label>Proficiency Bonus</Form.Label>
                    <Form.Control
                      size="sm"
                      type="number"
                      value={this.state.character.proficiencyBonus}
                      name="proficiencyBonus"
                      onChange={this.onInputChange.bind(this)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            <Col lg="8" md="" sm="" xs="" className="m-1 bg-info p-3 rounded">
              <Row>
                <Col lg="5" md="" sm="" xs="">
                  <Form.Group>
                    <Form.Label>Class</Form.Label>
                    <Form.Control
                      as="select"
                      value={this.state.character.class}
                      size="sm"
                      name="class"
                      onChange={this.onInputChange.bind(this)}
                    >
                      {this.state.classes.map((c) => {
                        return <option key={c.name}>{c.name}</option>;
                      })}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col lg="3" md="" sm="" xs="">
                  <Form.Group>
                    <Form.Label>Level</Form.Label>
                    <Form.Control
                      size="sm"
                      value={this.state.character.level}
                      type="number"
                      name="level"
                      onChange={this.onInputChange.bind(this)}
                    />
                  </Form.Group>
                </Col>
                <Col lg="4" md="" sm="" xs="">
                  <Form.Group>
                    <Form.Label>Background</Form.Label>
                    <Form.Control
                      as="select"
                      value={this.state.character.background}
                      size="sm"
                      name="background"
                      onChange={this.onInputChange.bind(this)}
                    >
                      {this.state.backgrounds.map((b) => {
                        return <option key={b.name}>{b.name}</option>;
                      })}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg="5" md="" sm="" xs="">
                  <Form.Group>
                    <Form.Label>Race</Form.Label>
                    <Form.Control
                      as="select"
                      value={this.state.character.race}
                      size="sm"
                      name="race"
                      onChange={this.onInputChange.bind(this)}
                    >
                      {this.state.races.map((r) => {
                        return <option key={r.name}>{r.name}</option>;
                      })}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col lg="4" md="" sm="" xs="">
                  <Form.Group>
                    <Form.Label>Alignment</Form.Label>
                    <Form.Control
                      as="select"
                      value={this.state.character.alignment}
                      size="sm"
                      name="alignment"
                      onChange={this.onInputChange.bind(this)}
                    >
                      {this.state.alignments.map((a) => {
                        return <option key={a}>{a}</option>;
                      })}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col lg="3" md="" sm="" xs="">
                  <Form.Group>
                    <Form.Label>Experience Points</Form.Label>
                    <Form.Control
                      size="sm"
                      value={this.state.character.experiencePoints}
                      type="number"
                      name="experiencePoints"
                      onChange={this.onInputChange.bind(this)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-5 ">
            <Col lg="2" md="" sm="" xs="" className="m-1 bg-info p-3 rounded">
              <Form.Group>
                <Form.Label>Strength</Form.Label>
                <Form.Control
                  size="sm"
                  type="number"
                  name="abilityScores.strength"
                  value={this.state.character.abilityScores.strength}
                  onChange={this.onSubFieldInputChange.bind(this)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Dexterity</Form.Label>
                <Form.Control
                  type="number"
                  size="sm"
                  name="abilityScores.dexterity"
                  value={this.state.character.abilityScores.dexterity}
                  onChange={this.onSubFieldInputChange.bind(this)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Constitution</Form.Label>
                <Form.Control
                  type="number"
                  size="sm"
                  name="abilityScores.constitution"
                  value={this.state.character.abilityScores.constitution}
                  onChange={this.onSubFieldInputChange.bind(this)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Intelligence</Form.Label>
                <Form.Control
                  type="number"
                  size="sm"
                  name="abilityScores.intelligence"
                  value={this.state.character.abilityScores.intelligence}
                  onChange={this.onSubFieldInputChange.bind(this)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Wisdom</Form.Label>
                <Form.Control
                  type="number"
                  size="sm"
                  name="abilityScores.wisdom"
                  value={this.state.character.abilityScores.wisdom}
                  onChange={this.onSubFieldInputChange.bind(this)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Charisma</Form.Label>
                <Form.Control
                  type="number"
                  size="sm"
                  name="abilityScores.charisma"
                  value={this.state.character.abilityScores.charisma}
                  onChange={this.onSubFieldInputChange.bind(this)}
                />
              </Form.Group>
            </Col>
            <Col lg="6" md="" sm="" xs="" className="m-1 bg-info p-3 rounded">
              <Row>
                <Col lg="4" md="" sm="" xs="">
                  <Form.Group>
                    <Form.Label>Armor Class</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="armorClass"
                      value={this.state.character.armorClass}
                      onChange={this.onInputChange.bind(this)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Current Hit Points</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="currentHitPoints"
                      value={this.state.character.currentHitPoints}
                      onChange={this.onInputChange.bind(this)}
                    />
                  </Form.Group>
                </Col>
                <Col lg="4" md="" sm="" xs="">
                  <Form.Group>
                    <Form.Label>Initiative</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="initiative"
                      value={this.state.character.initiative}
                      onChange={this.onInputChange.bind(this)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Temporary Hit Points</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="temporaryHitPoints"
                      value={this.state.character.temporaryHitPoints}
                      onChange={this.onInputChange.bind(this)}
                    />
                  </Form.Group>
                </Col>
                <Col lg="4" md="" sm="" xs="">
                  <Form.Group>
                    <Form.Label>Speed</Form.Label>
                    <Form.Control type="text" size="sm" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Hit Dice</Form.Label>
                    <Form.Control size="sm" as="select" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <Form.Label>Death Saves</Form.Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Successes</Form.Label>
                        &nbsp; &nbsp;
                        <Form.Check inline="true" />
                        <Form.Check inline="true" />
                        <Form.Check inline="true" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Failures</Form.Label>
                        &nbsp; &nbsp;
                        <Form.Check inline="true" />
                        <Form.Check inline="true" />
                        <Form.Check inline="true" />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col lg="4" md="" sm="" xs="">
                  <Form.Group>
                    <Form.Label>Strength</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="abilityScores.strengthMod"
                      value={this.state.character.abilityScores.strengthMod}
                      onChange={this.onSubFieldInputChange.bind(this)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Intelligence</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="abilityScores.intelligenceMod"
                      value={this.state.character.abilityScores.intelligenceMod}
                      onChange={this.onSubFieldInputChange.bind(this)}
                    />
                  </Form.Group>
                </Col>
                <Col lg="4" md="" sm="" xs="">
                  <Form.Group>
                    <Form.Label>Dexterity</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="abilityScores.dexterityMod"
                      value={this.state.character.abilityScores.dexterityMod}
                      onChange={this.onSubFieldInputChange.bind(this)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Wisdom</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="abilityScores.wisdomMod"
                      value={this.state.character.abilityScores.wisdomMod}
                      onChange={this.onSubFieldInputChange.bind(this)}
                    />
                  </Form.Group>
                </Col>
                <Col lg="4" md="" sm="" xs="">
                  <Form.Group>
                    <Form.Label>Constitution</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="abilityScores.constitutionMod"
                      value={this.state.character.abilityScores.constitutionMod}
                      onChange={this.onSubFieldInputChange.bind(this)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Charisma</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="abilityScores.charismaMod"
                      value={this.state.character.abilityScores.charismaMod}
                      onChange={this.onSubFieldInputChange.bind(this)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            <Col lg="4" md="" sm="" xs="" className="m-1 bg-info p-3 rounded">
              <Form.Group>
                <Form.Label>Personality Traits</Form.Label>
                <Form.Control as="textarea" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Ideals</Form.Label>
                <Form.Control as="textarea" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Bonds</Form.Label>
                <Form.Control as="textarea" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Flaws</Form.Label>
                <Form.Control as="textarea" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col lg="12" md="" sm="" xs="" className="m-1 bg-info p-3 rounded">
              <Form.Label>Skills</Form.Label>
              <Row>
                <Col lg="2" md="" sm="" xs="">
                  <Form.Group>
                    <Form.Label>Acrobatics</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="skills.acrobatics"
                    />
                  </Form.Group>
                  <Form.Group>
                  <Form.Label>Insight</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="skills.insight"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Performance</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="skills.performance"
                    />
                  </Form.Group>
                </Col>
                <Col lg="2" md="" sm="" xs="">
                <Form.Group>
                    <Form.Label>Animal Handling</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="skills.animalHandling"
                    />
                  </Form.Group>
                  <Form.Group>
                  <Form.Label>Intimidation</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="skills.intimidation"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Persuasion</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="skills.persuasion"
                    />
                  </Form.Group>
                </Col>
                <Col lg="2" md="" sm="" xs="">
                <Form.Group>
                    <Form.Label>Arcana</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="skills.arcana"
                    />
                  </Form.Group>
                  <Form.Group>
                  <Form.Label>Investigation</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="skills.investigation"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Religion</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="skills.religion"
                    />
                  </Form.Group>
                </Col>
                <Col lg="2" md="" sm="" xs="">
                <Form.Group>
                    <Form.Label>Athletics</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="skills.athletics"
                    />
                  </Form.Group>
                  <Form.Group>
                  <Form.Label>Medicine</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="skills.medicine"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Sleight of Hand</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="skills.sleightOfHand"
                    />
                  </Form.Group>
                </Col>
                <Col lg="2" md="" sm="" xs="">
                <Form.Group>
                    <Form.Label>Deception</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="skills.deception"
                    />
                  </Form.Group>
                  <Form.Group>
                  <Form.Label>Nature</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="skills.nature"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Stealth</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="skills.stealth"
                    />
                  </Form.Group>
                </Col>
                <Col lg="2" md="" sm="" xs="">
                <Form.Group>
                    <Form.Label>History</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="skills.history"
                    />
                  </Form.Group>
                  <Form.Group>
                  <Form.Label>Perception</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="skills.perception"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Survival</Form.Label>
                    <Form.Control
                      type="number"
                      size="sm"
                      name="skills.survival"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col lg="12" md="" sm="" xs="" className="m-1 bg-info p-3 rounded">
              <Form.Label>Attacks & Spellcasting</Form.Label>
              <Row>
              <Col lg="3" md="" sm="" xs="">
              <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      size="sm"
                      name="atkName1"
                    />
               </Form.Group>
               <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      size="sm"
                      name="atkName2"
                    />
               </Form.Group>
               <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      size="sm"
                      name="atkName3"
                    />
               </Form.Group>
              </Col>
              <Col lg="2" md="" sm="" xs="">
              <Form.Group>
                    <Form.Label>ATK Bonus</Form.Label>
                    <Form.Control
                      size="sm"
                      name="atkBonus1"
                    />
               </Form.Group>
               <Form.Group>
                    <Form.Label>ATK Bonus</Form.Label>
                    <Form.Control
                      size="sm"
                      name="atkBonus2"
                    />
               </Form.Group>
               <Form.Group>
                    <Form.Label>ATK Bonus</Form.Label>
                    <Form.Control
                      size="sm"
                      name="atkBonus3"
                    />
               </Form.Group>
              </Col>
              <Col lg="3" md="" sm="" xs="">
              <Form.Group>
                    <Form.Label>Damage/Type</Form.Label>
                    <Form.Control
                      size="sm"
                      name="dmgType1"
                    />
               </Form.Group>
               <Form.Group>
                    <Form.Label>Damage/Type</Form.Label>
                    <Form.Control
                      size="sm"
                      name="dmgType2"
                    />
               </Form.Group>
               <Form.Group>
                    <Form.Label>Damage/Type</Form.Label>
                    <Form.Control
                      size="sm"
                      name="dmgType3"
                    />
               </Form.Group>
              </Col> 
              <Col lg="4" md="" sm="" xs="">
              <Form.Group>
                    <Form.Label>Notes</Form.Label>
                    <Form.Control
                      size="sm"
                      name="atkNotes1"
                    />
               </Form.Group>
               <Form.Group>
                    <Form.Label>Notes</Form.Label>
                    <Form.Control
                      size="sm"
                      name="atkNotes2"
                    />
               </Form.Group>
               <Form.Group>
                    <Form.Label>Notes</Form.Label>
                    <Form.Control
                      size="sm"
                      name="atkNotes3"
                    />
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
