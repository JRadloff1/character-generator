import React from "react";
import { Link } from "react-router-dom";

function NavigationMenu(props) {
  return (
    <div className="menu">
      <ul>
        <li>
          <Link to="/" className="menuItem" onClick={props.closeMenu}>
            Home
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavigationMenu;
