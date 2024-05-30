export class CreateItemDto {
    ropeTypeId: number
    categoryId: number
    itemCode: string
    colorId: number
    strand: string
    length: string
    noOfTwist: number
    twineType: string
    treasureYarn: boolean
    treasureYarnColorId: number
    itemName: string
    itemUnit: string
    minimumStock: boolean
    reOrderQty: string
    location: number
    currentStock: string
    noOfLeadDays: string
    kpcCode: string
    description: string
    smsItem: boolean
    itemImage: string
    deleted: boolean
    createdBy: number
    createdOn: Date
    updatedBy: number
    updatedOn: Date
}