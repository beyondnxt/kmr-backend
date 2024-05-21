export class CreateDepartmentDto {
    departmentName: string
    location: string
    type: { [key: string]: any };
    deleted: boolean
    createdBy: number
    createdOn: Date
    updatedBy: number
    updatedOn: Date;
}