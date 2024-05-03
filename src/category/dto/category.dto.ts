export class CreatecategoryDto{
    categoryName: string
    parentCategory: string
    categoryCode: string
    type: string
    grade: string
    smsCategory: boolean
    createdBy: number
    createdOn: Date
    updatedBy: number
    updatedOn: Date;
}