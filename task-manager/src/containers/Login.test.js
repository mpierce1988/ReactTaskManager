import { render, fireEvent } from '@testing-library/react';
import { Login } from './Login';

describe('Login Component', () => {
    // test that email textbox is rendered
test('email textbox is rendered', () => {
    const { getByLabelText } = render(<Login />);
    const emailTextbox = getByLabelText(/email/i);
    expect(emailTextbox).toBeInTheDocument();
});

// test that password textbox is rendered
test('password textbox is rendered', () => {
    const { getByLabelText } = render(<Login />);
    const passwordTextBox = getByLabelText(/password/i);
    expect(passwordTextBox).toBeInTheDocument();
});

// test that login button is rendered
test('login button is rendered', () => {
    const { getByText } = render(<Login />);
    const loginButton = getByText(/login/i);
    expect(loginButton).toBeInTheDocument();
    expect(loginButton.tagName).toBe('BUTTON');
});

// test that email is required
test('email is required', async () => {
    const { getByText, getByLabelText, findByText } = render(<Login />);
    const loginButton = getByText(/login/i);
    const passwordTextBox = getByLabelText(/password/i);
    
    fireEvent.change(passwordTextBox, { target: { value: 'Password123!' } });
    fireEvent.click(loginButton);
    
    const emailRequired = await findByText(/email is required/i);
    
    expect(emailRequired).toBeInTheDocument();    
});

// test that email is required
test('password is required', async () => {
    const { getByText, getByLabelText, findByText } = render(<Login />);
    const loginButton = getByText(/login/i);
    const emailTextBox = getByLabelText(/email/i);
    
    emailTextBox.textContent = "test@gmail.com";
    fireEvent.click(loginButton);
    
    
    const passwordRequired = await findByText(/password is required/i);
    expect(passwordRequired).toBeInTheDocument();    
});
})

