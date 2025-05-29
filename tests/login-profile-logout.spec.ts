import { test, expect } from '@playwright/test';

let emailString = "27965@downing.co.uk";
let passwordString = "Password1!";
let accountString = "27965";

test('Login, navigate to profile, and logout', async ({ page }) => {
  await page.goto('/account/login');

  //Fill in login form - Note I would change these to ID's
  await expect(page).toHaveURL('/account/login');
  await page.fill('class*ng-pristine ng-invalid ng-touched', emailString);
  await page.fill('input[class="ng-untouched ng-pristine ng-valid"]', passwordString);
  await page.click('button[class="btn btn-primary"]');

  // Check to see if it has been logged in correctly 
  await expect(page).toHaveURL('/account/dashboard');

  // Navigate and verify Portfolio
  await page.selectOption('accountDropdown-menu', 'Portfolio'); 

  //Check that the page is present and have the title
  await expect(page).toHaveURL('/account/portfolio/Standard/investments');
  await expect(page).toHaveTitle('Standard portfolio');
  //More checks here to add for each investment
  

  // Check the user credentials
  await page.selectOption('accountDropdown-menu', 'Portfolio');
  await expect(page).toHaveURL('/account/login');
  await expect(page).toHaveTitle('Profile settings');
  await expect(page.content,  accountString);
  await expect(page.content,  emailString);
  //More checks here to add for the personal details, change password works and edit the details

  //User clicks the logout button
  await page.click('id#logout');

  //Expect redirected to dashboard
  await expect(page).toHaveURL('https://bonds-client-test.downinglabs.co.uk');
});
