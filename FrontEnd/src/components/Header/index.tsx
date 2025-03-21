import Button from "../Button";
import "./Header.css";

interface HeaderTypes {
  activeContacts: number;
  openModal(): void;
}

const Header = ({ activeContacts, openModal }: HeaderTypes) => {
  return (
    <div className="Header">
      <div className="Header__Title__Wrapper">
        <h3 className="Header__Title">Welcome</h3>
        <Button onClick={openModal}>Add contact</Button>
      </div>
      <h2 className="Header__WelcomeMessage">
        Activer Contacts: {activeContacts}
      </h2>
    </div>
  );
};

export default Header;
