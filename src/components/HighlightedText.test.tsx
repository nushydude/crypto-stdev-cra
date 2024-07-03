import React from 'react';
import { render, screen } from '@testing-library/react';
import HighlightedText from './HighlightedText';

describe('HighlightedText', () => {
  it('renders the text without highlighting if highlight is not present', () => {
    render(<HighlightedText text="Hello World" highlight="Test" />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders the text with the highlighted part in bold', () => {
    render(<HighlightedText text="Hello World" highlight="World" />);
    expect(screen.getByText('World')).toHaveClass('font-bold');
  });

  it('renders multiple occurrences of the highlighted text', () => {
    render(<HighlightedText text="Hello World, World" highlight="World" />);
    const highlightedParts = screen.getAllByText('World');
    highlightedParts.forEach((part) => {
      expect(part).toHaveClass('font-bold');
    });
    expect(highlightedParts).toHaveLength(2);
  });

  it('is case-insensitive when highlighting text', () => {
    render(<HighlightedText text="Hello World" highlight="world" />);
    expect(screen.getByText('World')).toHaveClass('font-bold');
  });

  it('renders text correctly when highlight is part of a word', () => {
    render(<HighlightedText text="Hello Worldly" highlight="World" />);
    expect(screen.getByText('Hello')).not.toHaveClass('font-bold');
    expect(screen.getByText('ly')).not.toHaveClass('font-bold');
  });

  it('handles empty highlight gracefully', () => {
    render(<HighlightedText text="Hello World" highlight="" />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('handles empty text gracefully', () => {
    render(<HighlightedText text="" highlight="World" />);
    expect(screen.queryByText('World')).not.toBeInTheDocument();
  });
});
