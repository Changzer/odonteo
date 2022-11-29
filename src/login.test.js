import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login/Login.js';

function renderWithRouter(element) {
    render(
        <BrowserRouter>
            { element }
        </BrowserRouter>
    );
}

describe('Test usage of login page', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch');

        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({ user: 'teste', message: 'Login efetuado com sucesso!', token: '123456' }),
        });
    });

    it('Should test invalid e-mail', () => {
        renderWithRouter(<Login />)

        const email = screen.getByTestId('email');

        expect(email).toBeInTheDocument();

        fireEvent.change(email, { target: {
                value: 'teste'
            }});

        expect(email).toHaveValue('teste')

        const password = screen.getByTestId('password');

        expect(password).toBeInTheDocument();

        fireEvent.change(password, { target: {
                value: '123456789A'
            }});

        expect(password).toHaveValue('123456789A')

        const submit = screen.getByTestId('submit');

        expect(submit).toBeInTheDocument();

        fireEvent.click(submit);

        const invalidEmail = screen.getByText(/email ou senha em formato incorreto./i);

        expect(invalidEmail).toBeInTheDocument();
    })

    it('Should test invalid password', () => {
        renderWithRouter(<Login />)

        const email = screen.getByTestId('email');

        expect(email).toBeInTheDocument();

        fireEvent.change(email, { target: {
                value: 'teste@teste.com'
            }});

        expect(email).toHaveValue('teste@teste.com')

        const password = screen.getByTestId('password');

        expect(password).toBeInTheDocument();

        fireEvent.change(password, { target: {
                value: '123456789a'
            }});

        expect(password).toHaveValue('123456789a')

        const submit = screen.getByTestId('submit');

        expect(submit).toBeInTheDocument();

        fireEvent.click(submit);

        const invalidEmail = screen.getByText(/email ou senha em formato incorreto./i);

        expect(invalidEmail).toBeInTheDocument();
    })

    it('Should test login successfully', () => {
        renderWithRouter(<Login />)

        const email = screen.getByTestId('email');

        expect(email).toBeInTheDocument();

        fireEvent.change(email, { target: {
                value: 'teste@teste.com'
            }});

        expect(email).toHaveValue('teste@teste.com')

        const password = screen.getByTestId('password');

        expect(password).toBeInTheDocument();

        fireEvent.change(password, { target: {
                value: '123456789a'
            }});

        expect(password).toHaveValue('123456789a')

        const submit = screen.getByTestId('submit');

        expect(submit).toBeInTheDocument();

        fireEvent.click(submit);

        expect(location.pathname).toBe('/');
    })
});
