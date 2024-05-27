export class CreateDepartmentDto {
    departmentName: string
    location: number
    type: { [key: string]: any };
    deleted: boolean
    createdBy: number
    createdOn: Date
    updatedBy: number
    updatedOn: Date;
}