import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import Login from './pages/Login/Login'
import {BrowserRouter} from "react-router-dom";

function renderPage(element){
  render(
      <BrowserRouter>
        { element }
      </BrowserRouter>
  );
}


describe('verifica se as paginas rodam', ()=> {


  it('verifica se a pagina de login abre', ()=> {

    renderPage(<Login/>);
    const loginPage = screen.getByTestId('login-page');
    expect(loginPage).toBeInTheDocument();
  });

  it('verifica email', async () => {
    renderPage(<Login/>);
    const entrarButton = screen.getByText(/entrar/i);
    expect(entrarButton).toBeInTheDocument();

    fireEvent.click(entrarButton);

    const email = screen.getByTestId('email');
    expect(email).toBeInTheDocument();

    fireEvent.change(email, { target: {
        value: 'abel@falco.gg'
      }});

    expect(email).toHaveValue('abel@falco.gg');

  })

  it('verifica formato incorreto', async () => {
    renderPage(<Login/>);

    fireEvent.change(email, { target: {
        value: 'abel'
      }});

    const entrarButton = screen.getByText(/entrar/i);
    fireEvent.click(entrarButton);

    const formatoIncorreto = screen.getByText(/formato incorreto/i);
    expect(formatoIncorreto).toBeInTheDocument();

  })

  it('verifica email e senha', async () => {
    renderPage(<Login/>);

    fireEvent.change(email, { target: {
        value: 'abel@gmail.com'
      }});


    const password = screen.getByTestId('password');
    expect(password).toBeInTheDocument();
    fireEvent.change(password, { target: {
        value: 'Aa@1x38bja'
      }});

    const entrarButton = screen.getByText(/Entrar/i);
    fireEvent.click(entrarButton);

    await waitFor(() =>  // tem que usar await, pq tem que esperar dar o fetch e retornar da API. //
    expect(
        screen.getByText(/incorretos/i)
    ).toBeInTheDocument())
  })

});