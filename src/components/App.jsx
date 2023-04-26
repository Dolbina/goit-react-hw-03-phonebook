import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter'
import { Layout } from './Layout/Layout';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onChangeInput = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  
  addName = newName => {
    this.state.contacts.filter
      (contact => 
        contact.name.toLocaleLowerCase().trim() === newName.name.toLowerCase().trim() ||
        contact.number.trim() === newName.number.trim()
    ).length
      ? alert(`${newName.name}: is already in contacts`)
        : this.setState(prevState => {
      return{
          contacts: [...prevState.contacts, newName],
        };
    });
  };



  deleteName = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  filter = () => {
    const { contacts, filter } = this.state;
    const filterName = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filterName;
  };

  render() {
    const { filter } = this.state;

    return (
      <Layout>
        <h1>Phonebook</h1>
        <ContactForm onSave={this.addName} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.onChangeInput} />
        <div>
          <ContactList contacts={this.filter()} onDelete={this.deleteName} />
        </div>
        <GlobalStyle />
      </Layout>
    );
  }
}
