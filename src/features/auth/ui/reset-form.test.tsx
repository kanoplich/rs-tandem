import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, type Mock } from 'vitest';
import '@testing-library/jest-dom';

import { useResetForm } from '../hooks/use-reset-form';
import { RESET_PASSWORD_FORM_TEXT } from '../locales';

import { ResetForm } from './reset-form';

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

vi.mock('../hooks/use-reset-form', () => ({
  useResetForm: vi.fn(() => ({
    form: {
      handleSubmit: (fn: unknown) => fn,
    },
    handleSubmit: vi.fn(),
    error: null,
    isSubmitting: false,
  })),
}));

describe('ResetForm', () => {
  const renderForm = () => {
    return render(
      <MemoryRouter>
        <ResetForm />
      </MemoryRouter>
    );
  };

  it('should render the title and description', () => {
    renderForm();
    expect(screen.getByText(RESET_PASSWORD_FORM_TEXT.TITLE)).toBeInTheDocument();
    expect(screen.getByText(RESET_PASSWORD_FORM_TEXT.DESCRIPTION)).toBeInTheDocument();
  });

  it('should render two password fields', () => {
    renderForm();
    const passwordInputs = screen.getAllByPlaceholderText(
      RESET_PASSWORD_FORM_TEXT.PASSWORD_PLACEHOLDER
    );
    expect(passwordInputs).toHaveLength(2);

    expect(screen.getByLabelText(RESET_PASSWORD_FORM_TEXT.PASSWORD_LABEL)).toBeInTheDocument();
    expect(screen.getByLabelText(RESET_PASSWORD_FORM_TEXT.CONFIRM_LABEL)).toBeInTheDocument();
  });

  it('should render the submit button', () => {
    renderForm();
    const submitBtn = screen.getByRole('button', { name: RESET_PASSWORD_FORM_TEXT.SUBMIT_BUTTON });
    expect(submitBtn).toBeInTheDocument();
  });

  it('should display error message when reset fails', () => {
    const apiError = 'Token expired or invalid';

    (useResetForm as Mock).mockReturnValueOnce({
      form: { handleSubmit: (fn: unknown) => fn },
      handleSubmit: vi.fn(),
      error: apiError,
      isSubmitting: false,
    });

    renderForm();
    expect(screen.getByText(apiError)).toBeInTheDocument();
  });
});
