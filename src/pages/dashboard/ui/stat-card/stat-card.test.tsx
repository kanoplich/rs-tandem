import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { StatCard } from '.';

describe('StatCard', () => {
  it('renders icon, description and stats', () => {
    render(<StatCard icon={<span data-testid="icon" />} description="Users" stats="42" />);

    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
