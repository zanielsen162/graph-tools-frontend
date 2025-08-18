import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.route('**/login_direct', async route => {
        const request = route.request();
        const body = request.postDataJSON();

        if (body.username === 'testuser' && body.password === 'password') {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    msg: 'Login successful',
                    status: 200
                }),
                // headers: {
                //     'Set-Cookie': 'access_token=fake-jwt; Path=/; HttpOnly'
                // }
            });
        } else {
            await route.fulfill({
                status: 400,
                contentType: 'application/json',
                body: JSON.stringify({
                    msg: 'Missing credentials',
                    status: 400
                })
            });
        }
    });

    await page.route('http://localhost:5000/logout', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                msg: 'logout successful',
                status: 200
            }),
        });
    });
})

test('login available when user not signed in', async ({ page }) => {
    await page.route('**/verify', async route => {
        await route.fulfill({
            status: 401,
            contentType: 'application/json',
            body: JSON.stringify({ msg: 'Missing or invalid token', status: 401 }),
        });
    });

    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Home' }).click();
    await page.getByRole('link', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible();
    await expect(page.getByText('Signing into your account')).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Email or Username$/ }).nth(2)).toBeVisible();
    await expect(page.locator('input[type="text"]')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Forgot Password?' })).toBeVisible();
    await expect(page.getByText('Password', { exact: true })).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In with SSO' })).toBeVisible();
    await expect(page.getByText('Don\'t have an account? Sign')).toBeVisible();
});

test('login not available when user is signed in', async ({ page }) => {
    await page.route('**/verify', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                id: '011050e8-c5f5-4b59-9774-69b0cdf223fb',
                username: 'testuser',
                email: 'testuser@fake.com',
                auth_source: 'direct'
            })
        });
    });

    await page.goto('http://localhost:3000/');

    await expect(page.getByRole('heading', { name: 'Graph Tools' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();

    await page.goto('http://localhost:3000/login');

    await expect(page.getByRole('heading', { name: 'Graph Tools' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();

});

test('login and logout with credentials', async ({ page }) => {
    await page.route('**/verify', async route => {
        await route.fulfill({
            status: 401,
            contentType: 'application/json',
            body: JSON.stringify({ msg: 'Missing or invalid token', status: 401 }),
        });
    });

    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Home' }).click();
    await page.getByRole('link', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible();
    await expect(page.locator('input[type="text"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();

    await page.locator('input[type="text"]').fill('testuser');
    await page.locator('input[type="password"]').fill('password');

    await page.route('**/verify', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                id: '011050e8-c5f5-4b59-9774-69b0cdf223fb',
                username: 'testuser',
                email: 'testuser@fake.com',
                auth_source: 'direct'
            })
        });
    });

    await page.getByRole('button', { name: 'Sign In', exact: true }).click();

    await expect(page.getByRole('heading', { name: 'Graph Tools' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();

    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
});