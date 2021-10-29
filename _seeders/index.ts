import AdminModel from  '../src/accounts/admin/model'
import AdministratorAccountSeed from './accounts/administrator';

/** Clears the Database Collection */
export async function clearAccounts(): Promise<void> {
    console.log('Clearing Authentication related data...');
    console.log('\tDeleting Admin Collection...');
    await AdminModel.deleteMany({});
}

/** Seed Data */
export async function seedAccounts() {
    console.log('Seeding Data...');

    await AdministratorAccountSeed();
    console.log('\tSeeding Admin Accounts now...')
}

/**  */
export async function seed(safe: boolean): Promise<void> {
    try {
        
    }
}