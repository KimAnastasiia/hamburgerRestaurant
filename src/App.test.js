import { render, screen, fireEvent} from '@testing-library/react';
import App from './App';
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ListHamburgers from './Hamburger/ListHamburgers';
import { ThemeWrapper } from "./testUtils";
import '@testing-library/jest-dom'
import { CookiesProvider } from 'react-cookie';

const matchMediaPolyfill = () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  });

window.matchMedia = window.matchMedia || matchMediaPolyfill;


test('In / check if load word DESCRIPCION', () => {
    
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const textElement = screen.getByText('DESCRIPTION');
    expect(textElement).toBeInTheDocument();
});


test('Click in menu option Login and check if Text Continium appears', () => {

    render(
        <MemoryRouter initialEntries={['/']}>
        <App />
        </MemoryRouter>
    );

    
    const linkElement = screen.getByRole('link', { name: 'login' });
    fireEvent.click(linkElement)

    const textElement = screen.getByText('Continium');
    expect(textElement).toBeInTheDocument();
});

test('Click in menu option Hamburgers and check if Text The king Bacon 1 appears', () => {
    
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );


    const linkElement = screen.getByRole('link', { name: 'hamburgers' });
    fireEvent.click(linkElement)

    const textElement = screen.getByTestId('table-hamburguer')
    expect(textElement).toBeInTheDocument();
});


test('Do login', () => {
    
    render(
      <MemoryRouter initialEntries={['/']}>
            <App />
      </MemoryRouter>
    );

    const linkElement = screen.getByRole('link', { name: 'login' });
    fireEvent.click(linkElement)

    const inputEmail = screen.getByRole('textbox', { name: /email/i });
    fireEvent.change(inputEmail, { target: { value: 'f' } });

    const inputPassword = screen.getByRole('textbox', { name: 'pd' });
    fireEvent.change(inputPassword, { target: { value: 'opa' } });

    const loginButton = screen.getByRole('button', {name: 'cm'})

    fireEvent.click(loginButton)
    

    const textElement = screen.getByText('VEGETAL')
    expect(textElement).toBeInTheDocument();
});
