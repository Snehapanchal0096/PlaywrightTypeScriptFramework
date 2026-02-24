import { test, expect } from '../fixtures/hooks-fixture';
import pimData from '../data/pim-module-data.json';

test('[PIM]Verify that a new employee is successfully created under the PIM module.',
    {
        tag: ['@UI', '@UAT', '@DEV'],
        annotation: {
            type: 'Test Case Link',
            description: 'Test case 4 link here .'
        }
    },
    async ({ gotoUrl, leftNavigationPage, pimPage }) => {
        await test.step("Open PIM Module", async () => {
            await leftNavigationPage.openPimModule();
        })
        await test.step("Add Employee In PIM Module", async () => {
            await pimPage.addEmployee(pimData.first_name, pimData.middle_name, pimData.last_name);
        })
        await test.step("Verify Employee In PIM Module", async () => {
            await expect(pimPage.newEmployeeNameHeading).toContainText(`${pimData.first_name} ${pimData.last_name}`);
        })


    })