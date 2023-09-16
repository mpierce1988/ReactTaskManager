import { render, fireEvent, screen } from '@testing-library/react';
import { Login } from './Login';
import { UserProvider } from '../contexts/UserContext';
import { BrowserRouter  } from 'react-router-dom';
import * as apiFunctions from '../functions/apiFunctions';

// Mock the apiFunctions.login function
apiFunctions.login = jest.fn();

const renderWithUserContext = (ui) => {
    return render(
        <BrowserRouter>
            <UserProvider value={{ userId: 1, setUserId: () => {} }}>
                {ui}
            </UserProvider>
        </BrowserRouter>
    );
}

describe('Login Component', () => {
        // test that email textbox is rendered
    test('email textbox is rendered', () => {
        const { getByLabelText } = renderWithUserContext(<Login />);
        const emailTextbox = getByLabelText(/email/i);
        expect(emailTextbox).toBeInTheDocument();
    });

    // test that password textbox is rendered
    test('password textbox is rendered', () => {
        const { getByLabelText } = renderWithUserContext(<Login />);
        const passwordTextBox = getByLabelText(/password/i);
        expect(passwordTextBox).toBeInTheDocument();
    });   

    // test that login button is rendered
    test('login button is rendered', () => {
        const { getByRole } = renderWithUserContext(<Login />);
        const loginButton = getByRole('button', { name: /login/i });
        expect(loginButton).toBeInTheDocument();
        expect(loginButton.tagName).toBe('BUTTON');
    });

    // test that email is required
    test('email is required', async () => {
        const { getByRole, getByLabelText, findByText } = renderWithUserContext(<Login />);
        const loginButton = getByRole("button", { name: /login/i });
        const passwordTextBox = getByLabelText(/password/i);       

        fireEvent.change(passwordTextBox, { target: { value: 'Password123!' } });        
        fireEvent.click(loginButton);
        
        const emailRequired = await findByText(/email is required/i);
        
        expect(emailRequired).toBeInTheDocument();    
    });

    // test that email is required
    test('password is required', async () => {
        const { getByRole, getByLabelText, findByText } = renderWithUserContext(<Login />);
        const loginButton = getByRole("button", { name: /login/i });
        const emailTextBox = getByLabelText(/email/i);        
        
        fireEvent.change(emailTextBox, {target: { value: "Test@gmail.com"}});       
        fireEvent.click(loginButton);    
        
        const passwordRequired = await findByText(/password is required/i);
        expect(passwordRequired).toBeInTheDocument();    
    });

    // test that reset button clears email and password
    test('reset button clears email and password', async () => {
        const { getByRole, getByLabelText, findByText } = renderWithUserContext(<Login />);        
        const resetButton = getByRole("button", { name: /reset/i });
        const emailTextBox = getByLabelText(/email/i);
        const passwordTextBox = getByLabelText(/password/i);        

        fireEvent.change(emailTextBox, {target: { value: "test@gmail.com"}});
        fireEvent.change(passwordTextBox, {target: {value: "Password123!"}});
        fireEvent.click(resetButton);

        
        expect(emailTextBox.value).toBe('');
        expect(passwordTextBox.value).toBe('');

    });

    // test that reset clears error messages
    test('reset clears error messages', async () => {
        const { getByRole } = renderWithUserContext(<Login />);        
        const resetButton = getByRole("button", { name: /reset/i });        
              
        fireEvent.click(resetButton);

        expect(screen.queryByText(/email is required/i)).toBeNull();
        expect(screen.queryByText(/password is required/i)).toBeNull();        
    });

    // Test that valid login displays success message
    test('valid login displays success message', async () => {
        apiFunctions.login.mockResolvedValueOnce({status: "Success", user: { id: 1, email: 'test@getDefaultNormalizer.com', name: "Anon", password: "*****"} });

        const { getByRole, getByLabelText, findByText } = renderWithUserContext(<Login />);
        const loginButton = getByRole("button", { name: /login/i });
        const emailTextBox = getByLabelText(/email/i);
        const passwordTextBox = getByLabelText(/password/i);

        fireEvent.change(emailTextBox, { target: { value: 'test@gmail.com'}});
        fireEvent.change(passwordTextBox, { target: { value: 'Password123!'} });
        fireEvent.click(loginButton);

        const successMessage = await findByText(/login successful!/i);
        expect(successMessage).toBeInTheDocument();
    });

    // Test that invalid login displays error message
   // Test that valid login displays success message
   test('invalid valid login displays error message', async () => {
    apiFunctions.login.mockResolvedValueOnce({status: "Error"});

    const { getByRole, getByLabelText, findByText } = renderWithUserContext(<Login />);
    const loginButton = getByRole("button", { name: /login/i });
    const emailTextBox = getByLabelText(/email/i);
    const passwordTextBox = getByLabelText(/password/i);

    fireEvent.change(emailTextBox, { target: { value: 'test@gmail.com'}});
    fireEvent.change(passwordTextBox, { target: { value: 'Password123!'} });
    fireEvent.click(loginButton);

    const errorMessage = await findByText(/there was an error logging in/i);
    expect(errorMessage).toBeInTheDocument();
});
})

