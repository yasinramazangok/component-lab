import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { TextField } from './TextField';

describe('TextField', () => {
  it('connects the label to the input', () => {
    render(<TextField label="Email address" type="email" />);
    expect(screen.getByLabelText('Email address')).toHaveAttribute('type', 'email');
  });

  it('shows and hides the password', async () => {
    render(<TextField label="Password" type="password" />);
    const input = screen.getByLabelText('Password');
    await userEvent.click(screen.getByRole('button', { name: 'Show password' }));
    expect(input).toHaveAttribute('type', 'text');
  });

  it('links the error message to the input', () => {
    render(<TextField label="Password" type="password" error="Too short" />);
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Too short');
  });
});
