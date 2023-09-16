import { render, fireEvent } from '@testing-library/react';
import { Register } from './Register';
import * as apiFunctions from '../functions/apiFunctions';

// mock the register function
apiFunctions.register = jest.fn();

describe('Register Component', () => {
        // test that email textbox is rendered
    test('email textbox is rendered', () => {
        const { getByLabelText } = render(<Register />);
        const emailTextbox = getByLabelText(/email/i);
        expect(emailTextbox).toBeInTheDocument();
    });

    // test that password textbox is rendered
    test('password textbox is rendered', () => {
        const { getByLabelText } = render(<Register />);
        const passwordTextBox = getByLabelText(/^password$/i);
        expect(passwordTextBox).toBeInTheDocument();
    });

    // test that name textbox is rendered
    test('name textbox is rendered', () => {
        const { getByLabelText } = render(<Register />);
        const nameTextBox = getByLabelText(/name/i);
        expect(nameTextBox).toBeInTheDocument();
    });

    // test that login button is rendered
    test('register button is rendered', () => {
        const { getByRole } = render(<Register />);
        const registerButton = getByRole('button', { name: /register/i});
        expect(registerButton).toBeInTheDocument();
        expect(registerButton.tagName).toBe('BUTTON');
    });

    // test that email is required
    test('email is required', async () => {
        const { getByRole, getByLabelText, findByText, queryByText } = render(<Register />);
        const registerButton = getByRole('button', { name: /register/i });
        const passwordTextBox = getByLabelText(/^password$/i);
        const nameTextBox = getByLabelText(/name/i);
        
        fireEvent.change(passwordTextBox, { target: { value: 'Password123!' } });
        fireEvent.change(nameTextBox, { target: { value: 'Michael' } });
        fireEvent.click(registerButton);        
       
        expect(await findByText(/email is required/i)).toBeInTheDocument();
        //test password and name error messages are NOT displayed
        expect(queryByText(/password is required/i)).toBeNull();
        expect(queryByText(/name is required/i)).toBeNull();   
    });

    // test that email is required
    test('password is required', async () => {
        const { getByRole, getByLabelText, findByText, queryByText } = render(<Register />);
        const registerButton = getByRole('button', { name: /register/i });
        const emailTextBox = getByLabelText(/email/i);
        const nameTextBox = getByLabelText(/name/i);
        
        fireEvent.change(emailTextBox, { target: { value: 'test@gmail.com'}});
        fireEvent.change(nameTextBox, { target: { value: 'Michael'}});        
        fireEvent.click(registerButton);

        expect(await findByText(/password is required/i)).toBeInTheDocument();
        //test email and name error messages are NOT displayed
        expect(queryByText(/email is required/i)).toBeNull();
        expect(queryByText(/name is required/i)).toBeNull();  
    });

    // test that name is required
    test('name is required', async () => {
        const { getByRole, getByLabelText, findByText, queryByText } = render(<Register />);
        const registerButton = getByRole("button", { name: /register/i });
        const emailTextBox = getByLabelText(/email/i);
        const passwordTextBox = getByLabelText(/^password$/i);
        
        fireEvent.change(emailTextBox, {target: { value: "Test@gmail.com"}});
        fireEvent.change(passwordTextBox, { target: { value: 'Password123!' } });
        fireEvent.click(registerButton);    
        
        
        expect(await findByText(/name is required/i)).toBeInTheDocument();
        //test email and password error messages are NOT displayed
        expect(queryByText(/email is required/i)).toBeNull();
        expect(queryByText(/password is required/i)).toBeNull();   
    });

    // test that valid registration displays success message
    test('valid registration displays success message', async () => {
        apiFunctions.register.mockResolvedValueOnce({status: "Success"});

        const { getByRole, getByLabelText, findByText, queryByText } = render(<Register />);
        const registerButton = getByRole("button", { name: /register/i });
        const emailTextBox = getByLabelText(/email/i);
        const nameTextBox = getByLabelText(/name/i);
        const passwordTextBox = getByLabelText(/^password$/i);
        const confirmPasswordTextBox = getByLabelText(/confirm password/i);
        
        fireEvent.change(emailTextBox, {target: { value: "Test@gmail.com"}});
        fireEvent.change(passwordTextBox, { target: { value: 'Password123!' } });
        fireEvent.change(confirmPasswordTextBox, { target: { value: 'Password123!' } });
        fireEvent.change(nameTextBox, { target: { value: 'Anon'}});
        fireEvent.click(registerButton);    
        
        
        const successMessage = await findByText(/registration successful/i);
        expect(successMessage).toBeInTheDocument();  
    });

    // test that invalid registration displays error message
    test('invalid registration displays error message', async () => {
        apiFunctions.register.mockResolvedValueOnce({status: "Error"});

        const { getByRole, getByLabelText, findByText, queryByText } = render(<Register />);
        const registerButton = getByRole("button", { name: /register/i });
        const emailTextBox = getByLabelText(/email/i);
        const nameTextBox = getByLabelText(/name/i);
        const passwordTextBox = getByLabelText(/^password$/i);
        
        fireEvent.change(emailTextBox, {target: { value: "Test@gmail.com"}});
        fireEvent.change(passwordTextBox, { target: { value: 'Password123!' } });
        fireEvent.change(nameTextBox, { target: { value: 'Anon'}});
        fireEvent.click(registerButton);    
        
        
        const errorMessage = await findByText(/the following error has occured/i);
        expect(errorMessage).toBeInTheDocument();  
    });
})

