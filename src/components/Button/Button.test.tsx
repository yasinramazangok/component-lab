import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders its text and uses type="button" by default', () => {
    render(<Button>Log in</Button>);
    expect(screen.getByRole('button', { name: 'Log in' })).toHaveAttribute('type', 'button');
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Log in</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('ignores clicks while loading', async () => {
    const onClick = vi.fn();
    render(<Button isLoading loadingLabel="Logging in…" onClick={onClick}>Log in</Button>);
    const button = screen.getByRole('button', { name: 'Logging in…' });
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('ignores clicks when disabled', async () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Log in</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
});
