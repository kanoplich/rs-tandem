import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { DASHBOARD_HEADER_TEXT } from '../../locales';

import { DashboardHeader } from '.';

describe('DashboardHeader', () => {
  it('renders the header title and description', () => {
    render(<DashboardHeader />);

    const title = screen.getByText(DASHBOARD_HEADER_TEXT.TITLE);
    const description = screen.getByText(DASHBOARD_HEADER_TEXT.DESCRIPTION);

    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H1');
    expect(description).toBeInTheDocument();
    expect(description.tagName).toBe('P');
  });
});
