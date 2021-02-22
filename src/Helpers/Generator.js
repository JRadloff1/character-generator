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
    let strength = this.rollAbility();
    let dexterity = this.rollAbility();
    let constitution = this.rollAbility();
    let intelligence = this.rollAbility();
    let wisdom = this.rollAbility();
    let charisma = this.rollAbility();
    character.name = "Super cool character name";
    character.class = this.GetClass(classes);
    character.race = this.GetRace(races);
    character.abilityScores = {
      strength: strength,
      strengthMod: this.getModifier(strength),
      dexterity: dexterity,
      dexterityhMod: this.getModifier(dexterity),
      constitution: constitution,
      constitutionMod: this.getModifier(constitution),
      intelligence: intelligence,
      intelligenceMod: this.getModifier(intelligence),
      wisdom: wisdom,
      wisdomMod: this.getModifier(wisdom),
      charisma: charisma,
      charismaMod: this.getModifier(charisma),
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

  getModifier  = (base) =>{
    if(base && base > 3 && base < 18) { 
    return Math.floor((base - 10) / 2);
    }
  }
}
