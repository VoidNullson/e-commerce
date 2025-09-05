import { test, expect } from '@playwright/test';

test('homepage has correct title and products link', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Vega Commerce/);

  // Expect the main heading to be visible.
  const heading = page.getByRole('heading', { name: 'Vega Commerce' });
  await expect(heading).toBeVisible();

  // Expect a "Products" link to be present.
  const productsLink = page.getByRole('link', { name: 'Products' });
  await expect(productsLink).toBeVisible();
});
