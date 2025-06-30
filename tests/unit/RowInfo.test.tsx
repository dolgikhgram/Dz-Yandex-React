import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RowInfo from '../../src/modules/Analytics/InfoList/RowInfo/RowInfo';

describe('RowInfo Component', () => {
  it('рендерит компонент с правильным значением и заголовком', () => {
    render(<RowInfo value={42} title="Test Title" />);
    
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('применяет правильные CSS классы для типа column', () => {
    const { container } = render(<RowInfo value={200} title="Column Title" type="column" />);
    
    const columnContainer = container.firstChild as HTMLElement;
    expect(columnContainer?.className).toMatch(/column/);
  });

  it('применяет правильные CSS классы для типа row', () => {
    const { container } = render(<RowInfo value={300} title="Row Title" type="row" />);
    
    const rowContainer = container.firstChild as HTMLElement;
    expect(rowContainer?.className).toMatch(/row/);
  });

  it('отображает числовое значение без дробной части', () => {
    render(<RowInfo value={42.7} title="Decimal Value" />);
    
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.queryByText('42.7')).not.toBeInTheDocument();
  });

  it('применяет правильные CSS классы для значения', () => {
    render(<RowInfo value={500} title="Value Test" />);
    
    const valueElement = screen.getByText('500');
    expect(valueElement?.className).toMatch(/value/);
  });

  it('применяет правильные CSS классы для заголовка', () => {
    render(<RowInfo value={600} title="Title Test" />);
    
    const titleElement = screen.getByText('Title Test');
    expect(titleElement?.className).toMatch(/title/);
  });
}); 