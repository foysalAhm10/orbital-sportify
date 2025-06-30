import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Index from '@/app/(tabs)/index';

// mock router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

// mock useAuth context
jest.mock('@/context/authContext', () => ({
  useAuth: () => ({
    user: { id: 'mock-user-id' },
  }),
}));

// mock supabase
jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({
            data: { username: 'Antor' },
            error: null,
          }),
        }),
      }),
    }),
  },
}));

describe('Index Screen', () => {
  it('renders welcome text and locker button', async () => {
    const { findByText } = render(<Index />);

    // async because usually we have to wait for the username to be rendered
    // right now there is a console error, will look into it in the future...
    expect(await findByText('WELCOME BACK, ANTOR')).toBeTruthy();
    expect(await findByText('Locker Room Update')).toBeTruthy();
  },
    10000
  );

  it('renders Upcoming Events label and cards', async () => {
    const { getByText } = render(<Index />);

    // to replace after actual events are available
    expect(getByText('Upcoming Events')).toBeTruthy();
    expect(getByText('Football \nFiesta')).toBeTruthy();
    expect(getByText('Tennis \nwith Antor')).toBeTruthy();
    expect(getByText('Explore More Events!')).toBeTruthy();
  });

  it('opens and closes Locker Room Update Modal', async () => {
    const { getByText, queryByText } = render(<Index />);

    fireEvent.press(getByText('Locker Room Update'));

    // to replace after actual notifications are available 
    expect(getByText('Updates')).toBeTruthy();
    expect(getByText('• You have 2 new invites! \n • New football session added on July 18.')).toBeTruthy();

    fireEvent.press(getByText('Close'));

    // Modal should close
    expect(queryByText('Updates')).toBeNull();
  });
});
