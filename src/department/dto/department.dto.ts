export class CreateDepartmentDto{
    departmentName: string
    location: string
    type: { [key: string]: any };
    createdBy: number
    createdOn: Date
    updatedBy: number
    updatedOn: Date;
}