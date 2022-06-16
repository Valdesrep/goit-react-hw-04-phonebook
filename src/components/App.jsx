import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import ContactFilter from './ContactFilter/ContactFilter';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const onAddContact = contactData => {
    const contact = { id: nanoid(), ...contactData };

    contacts.find(
      contact => contact.name.toLowerCase() === contactData.name.toLowerCase()
    )
      ? alert(`${contact.name} is already in contacts`)
      : setContacts([contact, ...contacts]);
  };
  const onDelteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const getFilterContacts = () => {
    const normalizedFilterValue = filter.toLowerCase().trim();

    const filtredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilterValue)
    );
    return filtredContacts;
  };
  const onChangeContactFilter = e => {
    setFilter(e.target.value);
  };
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts({ contacts: parsedContacts });
    }
  }, []);
  const filterContacts = getFilterContacts();

  return (
    <>
      <ContactForm onSubmit={onAddContact}></ContactForm>
      <ContactFilter value={filter} onChange={onChangeContactFilter} />

      <ContactList contacts={filterContacts} onDelete={onDelteContact} />
    </>
  );
};
