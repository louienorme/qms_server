import dotenv from 'dotenv'

dotenv.config();

import AdminModel from  '../src/accounts/admin/model'
import AdministratorAccountSeed from './accounts/administrator';
import connectToDatabase from '../src/_config/dbConnect';

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
    console.log(process.env.DB_USER);
    try {
        if (await connectToDatabase()) {
            
            if(!safe) {
                await clearAccounts();

                await seedAccounts();
            }

            console.log('\n\nSeeding Success!')
        } else {
            console.log(
				"Seeding unsuccessful. Failed to connect to the database. [ERROR_DB_CONNECTION]"
			);
        }

        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}