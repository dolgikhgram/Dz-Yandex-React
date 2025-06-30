import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfoList from '../../src/modules/Analytics/InfoList/InfoList';

describe('InfoList Component', () => {
  const baseProps = {
    total_spend_galactic: '1000',
    less_spent_civ: 'Alderaan',
    rows_affected: 42,
    less_spent_value: 123,
    big_spent_civ: 'Tatooine',
    average_spend_galactic: '250',
    less_spent_at: 32, // 1 февраля
    big_spent_at: 100, // 10 апреля
  };


  it('корректно преобразует день года в дату (less_spent_at и big_spent_at)', () => {
    render(<InfoList {...baseProps} />);
    expect(screen.getByText('1 февраля')).toBeInTheDocument();
    expect(screen.getByText('10 апреля')).toBeInTheDocument();
  });

  it('применяет правильный класс для типа row по умолчанию', () => {
    const { container } = render(<InfoList {...baseProps} />);
    const root = container.firstChild as HTMLElement;
    expect(root.className).toMatch(/containerRow/);
  });

  it('применяет правильный класс для типа column', () => {
    const { container } = render(<InfoList {...baseProps} type="column" />);
    const root = container.firstChild as HTMLElement;
    expect(root.className).toMatch(/containerColumn/);
  });
}); 