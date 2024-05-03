export class CreateRoleDto{
    name: string
    description: string
    menuAccess: { [key: string]: any }
    createdBy: number
    createdOn: Date
    updatedBy: number
    updatedOn: Date;
}