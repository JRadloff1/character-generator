import React from "react";
import LargeCharacterSheet from "./LargeCharacterSheet";
//import MediumCharacterSheet from './MediumCharacterSheet';
//import SmallCharacterSheet from './SmallCharacterSheet';
import GenerateButton from "../Components/Buttons/GenerateButton";
//import PrintButton from '../Components/Buttons/PrintButton';
//import SaveButton from '../Components/Buttons/SaveButton';

function Home() {
  /*TODO: This will most likely be a component to house the different views and pass in the character object thru props */
  return (
    <div className="container">
      <div className="buttonArea">
        <GenerateButton />
      </div>
      <div className="content">
        <LargeCharacterSheet />
      </div>
    </div>
  );
}

export default Home;
