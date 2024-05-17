export class CreateColorDto {
    colorName: string
    shortCode: string
    matchingColor: string
    applicableFor: { [key: string]: any };
    deleted: boolean
    createdBy: number
    createdOn: Date
    updatedBy: number
    updatedOn: Date;
}