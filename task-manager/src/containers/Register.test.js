import { render, fireEvent } from '@testing-library/react';
import { Register } from './Register';

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
        const loginButton = getByRole('button', { name: /register/i});
        expect(loginButton).toBeInTheDocument();
        expect(loginButton.tagName).toBe('BUTTON');
    });

    // test that email is required
    test('email is required', async () => {
        const { getByRole, getByLabelText, findByText, queryByText } = render(<Register />);
        const loginButton = getByRole('button', { name: /register/i });
        const passwordTextBox = getByLabelText(/^password$/i);
        const nameTextBox = getByLabelText(/name/i);
        
        fireEvent.change(passwordTextBox, { target: { value: 'Password123!' } });
        fireEvent.change(nameTextBox, { target: { value: 'Michael' } });
        fireEvent.click(loginButton);        
       
        expect(await findByText(/email is required/i)).toBeInTheDocument();
        //test password and name error messages are NOT displayed
        expect(queryByText(/password is required/i)).toBeNull();
        expect(queryByText(/name is required/i)).toBeNull();   
    });

    // test that email is required
    test('password is required', async () => {
        const { getByRole, getByLabelText, findByText, queryByText } = render(<Register />);
        const loginButton = getByRole('button', { name: /register/i });
        const emailTextBox = getByLabelText(/email/i);
        const nameTextBox = getByLabelText(/name/i);
        
        fireEvent.change(emailTextBox, { target: { value: 'test@gmail.com'}});
        fireEvent.change(nameTextBox, { target: { value: 'Michael'}});        
        fireEvent.click(loginButton);

        expect(await findByText(/password is required/i)).toBeInTheDocument();
        //test email and name error messages are NOT displayed
        expect(queryByText(/email is required/i)).toBeNull();
        expect(queryByText(/name is required/i)).toBeNull();  
    });

    // test that name is required
    test('name is required', async () => {
        const { getByRole, getByLabelText, findByText, queryByText } = render(<Register />);
        const loginButton = getByRole("button", { name: /register/i });
        const emailTextBox = getByLabelText(/email/i);
        const passwordTextBox = getByLabelText(/^password$/i);
        
        fireEvent.change(emailTextBox, {target: { value: "Test@gmail.com"}});
        fireEvent.change(passwordTextBox, { target: { value: 'Password123!' } });
        fireEvent.click(loginButton);    
        
        
        expect(await findByText(/name is required/i)).toBeInTheDocument();
        //test email and password error messages are NOT displayed
        expect(queryByText(/email is required/i)).toBeNull();
        expect(queryByText(/password is required/i)).toBeNull();   
    });
})

