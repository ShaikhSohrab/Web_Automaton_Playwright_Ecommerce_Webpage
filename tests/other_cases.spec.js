import {test, expect} from '@playwright/test';

test('Check Next and Previous Button behaviour on Home screen', async ({page}) => {
    
    await page.goto('https://www.demoblaze.com');
    await page.click('//button[@id="next2"]');
    await page.waitForTimeout(3000);
})
