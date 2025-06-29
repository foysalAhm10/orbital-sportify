import React from 'react';
import { render } from '@testing-library/react-native';
import { FlatList } from 'react-native';
import Events from '@/app/(tabs)/events';

jest.mock('@/lib/supabase', () => ({
    supabase: {
        from: jest.fn(() => ({
            select: jest.fn().mockReturnThis(),
        })),
    },
}));

describe('Events Screen FlatList render', () => {
    it('renders empty FlatList without crashing', () => {
        const { UNSAFE_getByType } = render(<Events />);
        expect(() => UNSAFE_getByType(FlatList)).not.toThrow();
    });
});
