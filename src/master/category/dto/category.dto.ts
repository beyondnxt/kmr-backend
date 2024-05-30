export class CreatecategoryDto{
    parentCategoryId: number
    childCategoryId: number
    subCategoryId: number
    type: string
    grade: string
    smsCategory: boolean
    deleted: boolean
    createdBy: number
    createdOn: Date
    updatedBy: number
    updatedOn: Date;
}