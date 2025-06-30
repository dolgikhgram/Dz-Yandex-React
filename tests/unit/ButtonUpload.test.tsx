import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ButtonUpload from '../../src/modules/common/ButtonCollection/ButtonUpload/ButtonUpload';

describe('ButtonUpload Component', () => {
  it('рендерит кнопку с правильным текстом для состояния pending', () => {
    render(<ButtonUpload type="pending">Upload File</ButtonUpload>);
    
    expect(screen.getByText('Upload File')).toBeInTheDocument();
  });

  it('применяет правильные CSS классы для разных типов кнопок', () => {
    const { rerender } = render(<ButtonUpload type="pending">Pending Button</ButtonUpload>);
    
    const pendingButton = screen.getByText('Pending Button').closest('button');
    expect(pendingButton?.className).toMatch(/pendingBtn/);
    
    rerender(<ButtonUpload type="uploaded">Uploaded Button</ButtonUpload>);
    const uploadedButton = screen.getByRole('button');
    expect(uploadedButton?.className).toMatch(/uploadedBtn/);
    
    rerender(<ButtonUpload type="parsing">Parsing Button</ButtonUpload>);
    const parsingButton = screen.getByRole('button');
    expect(parsingButton?.className).toMatch(/parsingBtn/);
    
    rerender(<ButtonUpload type="done">Done Button</ButtonUpload>);
    const doneButton = screen.getByText('Done Button').closest('button');
    expect(doneButton?.className).toMatch(/doneBtn/);
    
    rerender(<ButtonUpload type="process">Process Button</ButtonUpload>);
    const processButton = screen.getByText('Process Button').closest('button');
    expect(processButton?.className).toMatch(/processBtn/);
    
    rerender(<ButtonUpload type="error">Error Button</ButtonUpload>);
    const errorButton = screen.getByText('Error Button').closest('button');
    expect(errorButton?.className).toMatch(/errorBtn/);
  });

  it('вызывает onClick функцию при клике на основную кнопку', () => {
    const handleClick = vi.fn();
    render(<ButtonUpload type="pending" onClick={handleClick}>Clickable Button</ButtonUpload>);
    
    fireEvent.click(screen.getByText('Clickable Button'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('вызывает onClick функцию при клике на кнопку X', () => {
    const handleClick = vi.fn();
    render(<ButtonUpload type="done" onClick={handleClick}>Done Button</ButtonUpload>);
    
    const xButton = screen.getByAltText('X').closest('button');
    fireEvent.click(xButton!);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });


  it('отображает вторичный текст для всех состояний', () => {
    render(
      <ButtonUpload type="pending" secondaryText="Secondary text">Button</ButtonUpload>
    );
    expect(screen.getByText('Secondary text')).toBeInTheDocument();
  });

  it('отображает лоадер для состояния uploaded', () => {
    render(<ButtonUpload type="uploaded">Uploaded</ButtonUpload>);
    
    const loader = screen.getByAltText('loading');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute('src', './loaderBtn.svg');
  });

  it('не отображает кнопку X для состояний pending, uploaded и parsing', () => {
    const { rerender } = render(<ButtonUpload type="pending">Pending</ButtonUpload>);
    expect(screen.queryByAltText('X')).not.toBeInTheDocument();
    
    rerender(<ButtonUpload type="uploaded">Uploaded</ButtonUpload>);
    expect(screen.queryByAltText('X')).not.toBeInTheDocument();
    
    rerender(<ButtonUpload type="parsing">Parsing</ButtonUpload>);
    expect(screen.queryByAltText('X')).not.toBeInTheDocument();
  });

  it('применяет правильные CSS классы для текста в зависимости от состояния', () => {
    const { rerender } = render(<ButtonUpload type="pending">Pending Text</ButtonUpload>);
    const pendingText = screen.getByText('Pending Text');
    expect(pendingText?.className).toMatch(/pendingText/);
    
    rerender(<ButtonUpload type="error">Error Text</ButtonUpload>);
    const errorText = screen.getByText('Error Text');
    expect(errorText?.className).toMatch(/errorText/);
  });

  it('применяет правильные CSS классы для вторичного текста в зависимости от состояния', () => {
    const { rerender } = render(
      <ButtonUpload type="pending" secondaryText="Secondary">Button</ButtonUpload>
    );
    const secondaryText = screen.getByText('Secondary');
    expect(secondaryText?.className).toMatch(/textSecondary/);
    
    rerender(
      <ButtonUpload type="error" secondaryText="Error Secondary">Button</ButtonUpload>
    );
    const errorSecondaryText = screen.getByText('Error Secondary');
    expect(errorSecondaryText?.className).toMatch(/textErrorSecondary/);
  });

  it('рендерит без secondaryText', () => {
    render(<ButtonUpload type="pending">Button</ButtonUpload>);
    
    expect(screen.getByText('Button')).toBeInTheDocument();
    expect(screen.queryByText('undefined')).not.toBeInTheDocument();
  });

  it('использует pending как тип по умолчанию', () => {
    render(<ButtonUpload>Default Button</ButtonUpload>);
    
    const button = screen.getByText('Default Button').closest('button');
    expect(button?.className).toMatch(/pendingBtn/);
  });
}); 