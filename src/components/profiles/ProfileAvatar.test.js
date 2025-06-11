import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfileAvatar from './ProfileAvatar';

describe('ProfileAvatar', () => {
  it('renders with initial if no avatar prop is provided', () => {
    render(<ProfileAvatar name="Test User" />);
    const initialElement = screen.getByText('T');
    expect(initialElement).toBeInTheDocument();
    expect(initialElement).toHaveClass('text-white text-4xl font-bold');
  });

  it('renders with a question mark if name is not provided', () => {
    render(<ProfileAvatar />);
    const initialElement = screen.getByText('?');
    expect(initialElement).toBeInTheDocument();
  });

  it('renders with initial from a multi-word name', () => {
    render(<ProfileAvatar name="Another Test User" />);
    const initialElement = screen.getByText('A');
    expect(initialElement).toBeInTheDocument();
  });

  it('renders with initial even if avatar prop is null or empty string', () => {
    render(<ProfileAvatar name="Test User" avatar={null} />);
    expect(screen.getByText('T')).toBeInTheDocument();

    render(<ProfileAvatar name="Another User" avatar="" />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  // Note: Testing for actual <img> tag rendering when an avatar URL is provided
  // would require modifying the component to conditionally render an <img>.
  // The current component always shows the initial.
  // If the component were to be changed to show an image, tests for that would be added here.
  // For example:
  // it('renders an image if avatar prop is a URL', () => {
  //   // Modify ProfileAvatar to render <img src={avatar} alt={name} /> if avatar is a URL
  //   render(<ProfileAvatar name="Image User" avatar="http://example.com/avatar.jpg" />);
  //   const imgElement = screen.getByAltText('Image User');
  //   expect(imgElement).toBeInTheDocument();
  //   expect(imgElement.src).toBe('http://example.com/avatar.jpg');
  // });

  it('has correct styling on the container div', () => {
    const { container } = render(<ProfileAvatar name="Styled User" />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const divElement = container.firstChild;
    expect(divElement).toHaveClass('w-24 h-24 bg-gray-500 rounded-md flex items-center justify-center m-2 cursor-pointer hover:ring-2 hover:ring-white');
  });
});
