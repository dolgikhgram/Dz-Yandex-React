import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../../src/modules/common/ButtonCollection/Button/Button';

describe('Button Component', () => {
  it('рендерит кнопку с правильным текстом', () => {
    render(<Button type="active">Test Button</Button>);
    
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('применяет правильные CSS классы для разных типов кнопок', () => {
    const { rerender } = render(<Button type="active">Active Button</Button>);
    
    const activeButton = screen.getByText('Active Button').closest('button');
    expect(activeButton?.className).toMatch(/activeBtn/);
    
    rerender(<Button type="unactive">Unactive Button</Button>);
    const unactiveButton = screen.getByText('Unactive Button').closest('button');
    expect(unactiveButton?.className).toMatch(/unactiveBtn/);
    
    rerender(<Button type="download">Download Button</Button>);
    const downloadButton = screen.getByText('Download Button').closest('button');
    expect(downloadButton?.className).toMatch(/downloadBtn/);
    
    rerender(<Button type="clear">Clear Button</Button>);
    const clearButton = screen.getByText('Clear Button').closest('button');
    expect(clearButton?.className).toMatch(/clearBtn/);
  });

  it('вызывает onClick функцию при клике', () => {
    const handleClick = vi.fn();
    render(<Button type="active" onClick={handleClick}>Clickable Button</Button>);
    
    fireEvent.click(screen.getByText('Clickable Button'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('отключает кнопку когда disabled=true', () => {
    render(<Button type="active" disabled>Disabled Button</Button>);
    
    const button = screen.getByText('Disabled Button').closest('button');
    expect(button).toBeDisabled();
  });
}); 