import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Footer } from '../footer';

import { FOOTER_TEXTS } from './locales';

describe('Footer', () => {
  it('renders footer description', () => {
    render(<Footer />);
    expect(screen.getByText(FOOTER_TEXTS.DESCRIPTION)).toBeTruthy();
  });

  it('renders powered by text', () => {
    render(<Footer />);
    expect(screen.getByText(FOOTER_TEXTS.POWERED_BY)).toBeTruthy();
  });

  it('renders developers label', () => {
    render(<Footer />);
    expect(screen.getByText(FOOTER_TEXTS.DEVELOPERS_LABEL)).toBeTruthy();
  });

  it('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(FOOTER_TEXTS.COPYRIGHT)).toBeTruthy();
  });

  it('renders footer element', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeTruthy();
  });
});
