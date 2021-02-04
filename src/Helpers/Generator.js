import Dnd5eApi from "./dnd5eApi";

export const abilityModifier = (base) => {
  if (base < 3) throw "Ability scores must be at least 3";
  if (base > 18) throw "Ability scores can be at most 18";
  return Math.floor((base - 10) / 2);
};

export default class Generator {
  constructor() {
    this.dnd5eApi = new Dnd5eApi();
    this.dnd5eApi.init();
    this.GenerateCharacter = this.GenerateCharacter.bind(this);
  }

  GenerateCharacter = async () => {
    //ToDo:
    let character = {};

    character.name = "Super cool character name";
    character.classes = await this.GetClasses();
    character.class = this.GetClass(character.classes);
    character.races = await this.GetRaces();
    character.race = this.GetRace(character.races);
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

  GetRaces = () => {
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

  GetClasses = () => {
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
    let rollArr = [];
    let rolls = 4;
    for (let i = 0; i < rolls; i++) {
      let roll = Math.floor(Math.random() * 6 + 1);
      rollArr.push(roll);
    }
  };
}
