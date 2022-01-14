import AdminModel from '../../src/accounts/admin/model'
import faker from 'faker'
import bcryptjs from 'bcryptjs'

export const AdministratorAccountSeed = async (): Promise<void> => {

    // hash password with the default value of DEVSCRUM
    const password = await bcryptjs.hash(process.env.DEFAULT_PASSWORD || 'DEVSCRUM', 10);

    const adminTypes = ['Super', 'Queue', 'Station', 'Window'];
    const adminId = ['SA', 'QA', 'STA', 'WA'];

    const adminAccounts = [];

    for (let i = 0; i < adminTypes.length; i++) {
        const admins = new AdminModel({
            adminId: `${new Date().getFullYear()}-00000-${adminId[i]}`,
            status: true,
            fullName: {
                firstName: faker.name.firstName(),
                middleName: faker.name.middleName(),
                lastName: faker.name.lastName(),
                nameExtension: faker.name.suffix()
            },
            type: adminTypes[i],
            contact: {
                email: faker.internet.email()
            },
            username: `Archon${adminId[i]}`,
            password: password,
            permissions : []
        })

        adminAccounts.push(admins);
    }

    await AdminModel.insertMany(adminAccounts);
    console.log('Seeding Admin Accounts.....');

}

export default AdministratorAccountSeed;