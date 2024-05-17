export class CreateColorDto {
    colorName: string
    shortCode: string
    matchingColor: string
    applicableFor: string
    deleted: boolean
    createdBy: number
    createdOn: Date
    updatedBy: number
    updatedOn: Date;
}