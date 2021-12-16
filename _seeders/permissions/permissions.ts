import PermissionModel from '../../src/permissions/model'

export const PermissionSeed = async (): Promise<void> => {

    const permissions = [
        {
            permissionId: `${new Date().getFullYear()}-P0001`,
            tag: 'Create:Queue',
            name: 'Create Queue',
            description: 'Allows the Admin to Create Queue'
        },
        {
            permissionId: `${new Date().getFullYear()}-P0002`,
            tag: 'Manage:Queue',
            name: 'Manage Queue',
            description: 'Allows the Admin to Manage Queue'
        },
        {
            permissionId: `${new Date().getFullYear()}-P0003`,
            tag: 'Delete:Queue',
            name: 'Delete Queue',
            description: 'Allows the Admin to Delete Queue'
        },
        {
            permissionId: `${new Date().getFullYear()}-P0004`,
            tag: 'Create:Account',
            name: 'Create Account',
            description: 'Allows the Admin to Create Account'
        },
        {
            permissionId: `${new Date().getFullYear()}-P0005`,
            tag: 'Manage:Account',
            name: 'Manage Account',
            description: 'Allows the Admin to Manage Account'
        },
        {
            permissionId: `${new Date().getFullYear()}-P0006`,
            tag: 'Delete:Account',
            name: 'Delete Account',
            description: 'Allows the Admin to Delete Account'
        }
    ]

    await PermissionModel.insertMany(permissions);
    console.log('Seeding Permissions.....');

}

export default PermissionSeed;