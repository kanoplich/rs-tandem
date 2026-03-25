import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, type Mock } from 'vitest';
import '@testing-library/jest-dom';

import { useForgotForm } from '../hooks/use-forgot-form';
import { FORGOT_PASSWORD_FORM_TEXT } from '../locales';

import { ForgotForm } from './forgot-form';

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

vi.mock('../hooks/use-forgot-form', () => ({
  useForgotForm: vi.fn(() => ({
    form: {
      handleSubmit: (fn: unknown) => fn,
    },
    handleSubmit: vi.fn(),
    error: null,
    isSubmitting: false,
  })),
}));

describe('ForgotForm', () => {
  const renderForm = () => {
    return render(
      <MemoryRouter>
        <ForgotForm />
      </MemoryRouter>
    );
  };

  it('should render the main elements of the form', () => {
    renderForm();
    expect(screen.getByText(FORGOT_PASSWORD_FORM_TEXT.TITLE)).toBeInTheDocument();
    expect(screen.getByText(FORGOT_PASSWORD_FORM_TEXT.DESCRIPTION)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(FORGOT_PASSWORD_FORM_TEXT.EMAIL_PLACEHOLDER)
    ).toBeInTheDocument();
  });

  it('should render the submit button', () => {
    renderForm();
    const submitBtn = screen.getByRole('button', { name: FORGOT_PASSWORD_FORM_TEXT.SUBMIT_BUTTON });
    expect(submitBtn).toBeInTheDocument();
  });

  it('should show the loading status on the button', () => {
    (useForgotForm as Mock).mockReturnValueOnce({
      form: { handleSubmit: (fn: unknown) => fn },
      handleSubmit: vi.fn(),
      error: null,
      isSubmitting: true,
    });

    renderForm();
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByText(FORGOT_PASSWORD_FORM_TEXT.BUTTON_PENDING)).toBeInTheDocument();
  });

  it('should render an error message when provided', () => {
    const errorMessage = 'Custom Error Message';

    (useForgotForm as Mock).mockReturnValueOnce({
      form: { handleSubmit: (fn: unknown) => fn },
      handleSubmit: vi.fn(),
      error: errorMessage,
      isSubmitting: false,
    });

    renderForm();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should render a link to the login page', () => {
    renderForm();
    const loginLink = screen.getByRole('link', { name: FORGOT_PASSWORD_FORM_TEXT.LOGIN_LINK });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
  });
});
