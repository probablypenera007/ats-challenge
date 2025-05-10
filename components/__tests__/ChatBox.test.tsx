import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatBox from '../ChatBox';

describe('ChatBox Component', () => {
  const mockMessages: { sender: "ai" | "user"; text: string }[] = [
    { sender: "ai", text: "Hello, candidate!" },
    { sender: "user", text: "Hi there!" },
  ];

  it('renders all messages correctly', () => {
    render(<ChatBox messages={mockMessages} onSend={jest.fn()} />);

    expect(screen.getByText('Hello, candidate!')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });

  it('calls onSend with the correct input value', () => {
    const mockSend = jest.fn();
    render(<ChatBox messages={mockMessages} onSend={mockSend} />);

    const input = screen.getByPlaceholderText(/type your response/i);
    const button = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'My test answer' } });
    fireEvent.click(button);

    expect(mockSend).toHaveBeenCalledWith('My test answer');
  });

  it('clears input after sending', () => {
    const mockSend = jest.fn();
    render(<ChatBox messages={mockMessages} onSend={mockSend} />);

    const input = screen.getByPlaceholderText(/type your response/i);
    const button = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'Testing reset' } });
    fireEvent.click(button);

    expect((input as HTMLInputElement).value).toBe('');
  });
});