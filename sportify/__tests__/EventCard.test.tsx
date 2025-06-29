import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EventCard from '../components/EventCard';

describe('EventCard', () => {
  const mockItem = {
    title: 'Football Match',
    description: 'Friendly game at the park',
  };

  const mockOnOpen = jest.fn();
  const mockOnClose = jest.fn();

  it('renders the event title and description', () => {
    const { getByText } = render(
      <EventCard
        item={mockItem}
        isVisible={false}
        onOpen={mockOnOpen}
        onClose={mockOnClose}
      />
    );

    expect(getByText('Football Match')).toBeTruthy();
    expect(getByText('Friendly game at the park')).toBeTruthy();
  });

  it('calls onOpen when the card is pressed', () => {
    const { getByText } = render(
      <EventCard
        item={mockItem}
        isVisible={false}
        onOpen={mockOnOpen}
        onClose={mockOnClose}
      />
    );

    fireEvent.press(getByText('Football Match'));
    expect(mockOnOpen).toHaveBeenCalled();
  });

  it('renders the modal when isVisible is true and closes on button press', () => {
    const { getByText } = render(
      <EventCard
        item={mockItem}
        isVisible={true}
        onOpen={mockOnOpen}
        onClose={mockOnClose}
      />
    );

    expect(getByText('CLOSE')).toBeTruthy();

    fireEvent.press(getByText('CLOSE'));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
