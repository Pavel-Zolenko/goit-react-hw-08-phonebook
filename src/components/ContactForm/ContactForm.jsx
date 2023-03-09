import * as yup from 'yup';
import 'yup-phone';

import { Formik, ErrorMessage } from 'formik';
import { addContact} from "redux/contacts/operations";
import { useDispatch, useSelector } from "react-redux";


import {
  FormContact,
  FormLabel,
  Input,
  ErrorText,
  AddBtn,
} from './ContactForm.styled';

let schema = yup.object().shape({
  name: yup.string().min(3).required(),
  number: yup.string().phone('UA').required(),
});

const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={message => <ErrorText>{message}</ErrorText>}
    />
  );
};

const initialValues = {
  name: '',
  number: '',
};

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts)
 
  const handleSubmit = (values, { resetForm }) => {
    if (contacts.some(
      contact => contact.name.toLowerCase() === values.name.toLowerCase()
    )
    ) {
      alert(`${values.name} is already in contacts.`);
      return;
    }
     dispatch(addContact(values));
    
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <FormContact>
        <FormLabel htmlFor="name">
          Name
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            placeholder="Name"
            required
          />
          <FormError name="name" />
        </FormLabel>
       
        <FormLabel htmlFor="number">
          Number
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            placeholder="Number"
            required
          />
          <FormError name="number" />
        </FormLabel>
        <AddBtn type="submit">Add contact</AddBtn>
      </FormContact>
    </Formik>
  );
};
