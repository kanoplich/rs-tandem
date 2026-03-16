import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

import { Header } from '../header';

import { MENU_LINK_TEXT } from './locales';

vi.mock('@/shared/api', () => ({
  signOut: vi.fn().mockResolvedValue(undefined),
}));

describe('Header', () => {
  const renderHeader = () =>
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

  it('render header', () => {
    renderHeader();
    expect(screen.getByRole('banner')).toBeTruthy();
  });

  it('render app title', () => {
    renderHeader();
    expect(screen.getByText(MENU_LINK_TEXT.APP_TITLE)).toBeTruthy();
  });

  it('renders navigation menu button', () => {
    renderHeader();
    expect(screen.getByLabelText(/navigation menu/i)).toBeTruthy();
  });

  it('renders logout text', () => {
    renderHeader();
    expect(screen.getByText(MENU_LINK_TEXT.LOGOUT)).toBeTruthy();
  });

  it('renders dashboard link text', () => {
    renderHeader();
    expect(screen.getByText(MENU_LINK_TEXT.DASHBOARD)).toBeTruthy();
  });
});
