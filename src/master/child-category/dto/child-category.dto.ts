export class CreateChildCategoryDto{
    parentCategoryId: number
    name: string
    deleted: boolean
    createdBy: number
    createdOn: Date
    updatedBy: number
    updatedOn: Date
}