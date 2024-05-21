export class CreateRoleDto{
    name: string
    description: string
    menuAccess: { [key: string]: any }
    deleted: boolean
    createdBy: number
    createdOn: Date
    updatedBy: number
    updatedOn: Date;
}