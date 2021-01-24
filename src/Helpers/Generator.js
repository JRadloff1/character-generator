import Dnd5eApi from "./dnd5eApi";

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
    character.class = await this.GetClass();
    character.race = await this.GetRace();
    //
    console.log(character);
    return character;
  };

  GetRace = () => {
   return  this.dnd5eApi.client.get("races").then((r) => {
      let races = r.data.results;
      if (races) {
        //return random race
        let selectedRace = races[Math.floor(Math.random() * races.length)];
        let race = selectedRace.name;
        return race;
      }
    });
  };

  GetClass =  () => {
     return this.dnd5eApi.client.get("classes").then((c) => {
      let classes = c.data.results;
      if (classes) {
        let selectedClass = classes[Math.floor(Math.random() * classes.length)];
        let className = selectedClass.name;
        return className;
      }
    });
  };
}
