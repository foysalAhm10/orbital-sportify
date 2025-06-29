import React from 'react';
import { render } from '@testing-library/react-native';
import StartPage from '@/app/(auth)/StartPage';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({
    replace: jest.fn(), // mock the router.replace method
  })),
}));

describe('StartPage UI', () => {
  it('renders welcome text and loading indicator', () => {
    const { getByText } = render(<StartPage />);

    // Cannot actually see the welcome text though, might be the styling issue.
    expect(getByText('Welcome to Sportify')).toBeTruthy();
    expect(getByText('Loading...')).toBeTruthy();
  });
});
