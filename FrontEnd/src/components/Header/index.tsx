import Button from "../Button";
import "./Header.css";

interface HeaderTypes {
  activeContacts: number;
}

const Header = ({ activeContacts }: HeaderTypes) => {
  return (
    <div className="Header">
      <div className="Header__Title__Wrapper">
        <h3 className="Header__Title">Welcome</h3>
        <Button>Add contact</Button>
      </div>
      <h2 className="Header__WelcomeMessage">
        Activer Contacts: {activeContacts}
      </h2>
    </div>
  );
};

export default Header;
