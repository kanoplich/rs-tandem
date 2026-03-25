import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

import { AUTH_REGISTER_TEXT } from '../locales';

import { RegisterForm } from './register-form';

vi.mock('react-hook-form', async () => {
  const actual = await vi.importActual<typeof import('react-hook-form')>('react-hook-form');
  return {
    ...actual,
    useFormContext: () => ({
      register: vi.fn(),
      formState: { errors: {} },
    }),
  };
});

vi.mock('../hooks/use-register-form', () => ({
  useRegisterForm: () => ({
    form: {
      handleSubmit: (fn: unknown) => fn,
    },
    handleSubmit: vi.fn(),
    error: null,
    isSubmitting: false,
  }),
}));

describe('RegisterForm', () => {
  const renderForm = () => {
    return render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );
  };

  it('should render the registration title and description', () => {
    renderForm();
    expect(screen.getByText(AUTH_REGISTER_TEXT.TITLE)).toBeInTheDocument();
    expect(screen.getByText(AUTH_REGISTER_TEXT.DESCRIPTION)).toBeInTheDocument();
  });

  it('should render the name field', () => {
    renderForm();
    expect(screen.getByPlaceholderText(AUTH_REGISTER_TEXT.NAME_PLACEHOLDER)).toBeInTheDocument();
  });

  it('should render the email field', () => {
    renderForm();
    expect(screen.getByPlaceholderText(AUTH_REGISTER_TEXT.EMAIL_PLACEHOLDER)).toBeInTheDocument();
  });

  it('should render two password fields (primary and confirmation)', () => {
    renderForm();
    const passwordInputs = screen.getAllByPlaceholderText(AUTH_REGISTER_TEXT.PASSWORD_PLACEHOLDER);
    expect(passwordInputs).toHaveLength(2);
  });

  it('should render the submit button with the correct text', () => {
    renderForm();
    const submitBtn = screen.getByRole('button', { name: AUTH_REGISTER_TEXT.SUBMIT_BUTTON });
    expect(submitBtn).toBeInTheDocument();
  });

  it('should render social media buttons (OAuth)', () => {
    renderForm();
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(1);
  });

  it('should render a link to go to the login page', () => {
    renderForm();
    const link = screen.getByRole('link', { name: AUTH_REGISTER_TEXT.LOGIN_LINK });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/login');
  });
});
