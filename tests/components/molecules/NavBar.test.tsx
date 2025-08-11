import { screen, fireEvent, render} from '@testing-library/react';
import NavBar from '@/components/molecules/NavBar';
import { UserProvider, useUser } from '../../../src/context/UserProvider';
import '@testing-library/jest-dom';
import { useEffect } from 'react';

const testMenuItems = [
    { label: 'item1', link: '/' },
    { label: 'item2', link: '/' },
    { label: 'item3', link: '/' },
]

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

function TestWrapper ({ userInit }: {userInit?: {id: string, auth_source: string}}) {
    const user = userInit ? userInit : null;
    const { setUser } = useUser();

    useEffect(() => {
        setUser(user);
    }, [setUser]);

    return (
        <NavBar
            title='title'
            menuItems={testMenuItems}
        />
    )
}

describe('NavBar component', () => {
    it('displays all menu items', () => {
        render(
            <UserProvider>
                <NavBar
                    title='title'
                    menuItems={testMenuItems}
                />
            </UserProvider>
        )
        expect(screen.getAllByTestId('navlink')).toHaveLength(testMenuItems.length);
        testMenuItems.forEach(element =>
            expect(screen.getByText(element.label)).toBeInTheDocument()
        );
    })

    it('hide and show mobile menu', () => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 150,
        });
        window.dispatchEvent(new Event('resize'));
        expect(window.innerWidth).toBe(150);

        render(
            <UserProvider>
                <NavBar
                    title='title'
                    menuItems={testMenuItems}
                />
            </UserProvider>
        )
        const mobileMenuButton = screen.getByTestId('mobile-menu')
        expect(mobileMenuButton).toBeInTheDocument();
        expect(screen.queryAllByTestId('navlink-mobile')).toHaveLength(0);

        fireEvent.click(mobileMenuButton);

        expect(screen.getAllByTestId('navlink-mobile')).toHaveLength(testMenuItems.length);
        testMenuItems.forEach(element => {
            const instances = screen.getAllByText(element.label);
            expect(instances[1]).toBeVisible();
        });

    })

    it('logout when user logged in', () => {
        render(
            <UserProvider>
                <TestWrapper userInit={{ id: 'testuser', auth_source: 'direct' }} />
            </UserProvider>
        )
        expect(screen.getByText('Logout')).toBeInTheDocument();
    })

    it('login when user logged out', () => {
        render(
            <UserProvider>
                <TestWrapper />
            </UserProvider>
        )
        expect(screen.getByText('Login')).toBeInTheDocument();
    })
})