import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, test, expect, vi } from 'vitest';

import { ProtectedRoute } from './protected-route';

import { useAuth } from '@/entities/session';
import { ROUTES } from '@/shared/config/routes';

vi.mock('@/entities/session', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/shared/ui', () => ({
  Loader: () => <div data-testid="loader">Loading...</div>,
}));

const mockUseAuth = vi.mocked(useAuth);

const TestComponent = ({
  children,
  reverse = false,
}: {
  children: React.ReactNode;
  reverse?: boolean;
}) => (
  <MemoryRouter initialEntries={['/test']}>
    <Routes>
      <Route path="/test" element={<ProtectedRoute reverse={reverse}>{children}</ProtectedRoute>} />
      <Route path={ROUTES.LOGIN} element={<div data-testid="login-page" />} />
      <Route path={ROUTES.DASHBOARD} element={<div data-testid="dashboard-page" />} />
    </Routes>
  </MemoryRouter>
);

describe('ProtectedRoute', () => {
  test('Shows Loader, when isLoading = true', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      session: null,
      user: null,
    });

    render(
      <TestComponent>
        <div data-testid="protected-content">Protected Content</div>
      </TestComponent>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  test('Redirect to /login, if is not authenticated  (reverse=false)', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      session: null,
      user: null,
    });

    render(
      <TestComponent>
        <div data-testid="protected-content">Protected Content</div>
      </TestComponent>
    );
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  test('Show children, if is not athenticated and reverse=true', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      session: null,
      user: null,
    });

    render(
      <TestComponent reverse>
        <div data-testid="protected-content">Protected Content</div>
      </TestComponent>
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    expect(screen.queryByTestId('login-page')).not.toBeInTheDocument();
    expect(screen.queryByTestId('dashboard-page')).not.toBeInTheDocument();
  });

  test('Redirect to /dashboard, if is authenticated and reverse=true', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      session: null,
      user: null,
    });

    render(
      <TestComponent reverse>
        <div data-testid="protected-content">Protected Content</div>
      </TestComponent>
    );

    expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    expect(screen.queryByTestId('login-page')).not.toBeInTheDocument();
  });
});
