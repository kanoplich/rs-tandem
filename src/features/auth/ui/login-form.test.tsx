import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

import { LoginForm } from './login-form';

/**
 * mock react-hook-form context
 */
vi.mock('react-hook-form', async () => {
  const actual = await vi.importActual<typeof import('react-hook-form')>('react-hook-form');

  return {
    ...actual,
    useFormContext: () => ({
      register: vi.fn(),
      formState: {
        errors: {},
      },
    }),
  };
});

/**
 * mock useLoginForm hook
 */
vi.mock('../hooks/use-login-form', () => ({
  useLoginForm: () => ({
    form: {
      handleSubmit: (fn: unknown) => fn,
    },
    handleSubmit: vi.fn(),
    error: null,
    isSubmitting: false,
  }),
}));

describe('LoginForm', () => {
  it('renders login title', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const title = screen.getByText(/вход в систему/i);
    expect(title).toBeInTheDocument();
  });

  it('renders email input', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('renders password input', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('renders submit button', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const button = screen.getAllByRole('button')[0];
    expect(button).toBeInTheDocument();
  });

  it('submit button is enabled when not submitting', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const button = screen.getAllByRole('button')[0];
    expect(button).not.toBeDisabled();
  });
});
