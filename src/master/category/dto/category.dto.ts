export class CreatecategoryDto{
    parentCategoryId: number
    childCategoryId: number
    subCategoryId: number
    type: number
    grade: number
    smsCategory: boolean
    deleted: boolean
    createdBy: number
    createdOn: Date
    updatedBy: number
    updatedOn: Date;
}