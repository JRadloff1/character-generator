import Dnd5eApi from "./dnd5eApi";

export default class Generator {
  constructor() {
    this.dnd5eApi = new Dnd5eApi();
    this.dnd5eApi.init();
    this.GenerateCharacter = this.GenerateCharacter.bind(this);
    this.GetClasses = this.GetClasses.bind(this);
    this.GetRaces = this.GetRaces.bind(this);
  }

  GenerateCharacter = (classes, races) => {
    //ToDo:
    let character = {};

    character.name = "Super cool character name";
    character.class = this.GetClass(classes);
    character.race = this.GetRace(races);
    character.abilityScores = {
      strength: this.rollAbility(),
      dexterity: this.rollAbility(),
      constitution: this.rollAbility(),
      intelligence: this.rollAbility(),
      wisdom: this.rollAbility(),
      charisma: this.rollAbility(),
    };
    console.log(character);
    return character;
  };

  GetRaces = async() => {
   return this.dnd5eApi.client.get("races").then((r) => {
      let races = r.data.results;
      if (races) {
        return races;
      }
    });
  };

  GetRace = (races) => {
    if (races) {
      //return random race
      let selectedRace = races[Math.floor(Math.random() * races.length)];
      let race = selectedRace.name;
      return race;
    }
  };

  GetClasses = async() => {
  return this.dnd5eApi.client.get("classes").then((c) => {
      let classes = c.data.results;
      if (classes) {
        return classes;
      }
    });
  };

  GetClass = (classes) => {
    if (classes) {
      let selectedClass = classes[Math.floor(Math.random() * classes.length)];
      let className = selectedClass.name;
      return className;
    }
  };

  rollAbility = () => {
    let rolls = [];
    let min = 1;
    let max = 6;
    let numrolls = 6;

    for (let i = 0; i < numrolls; i++) {
      rolls.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }

    rolls = rolls.sort((a, b) => {
      return a < b;
    });

    let result = rolls.splice(0, 3).reduce((a, b) => {
      return a + b;
    });
    return result;
  };
}
