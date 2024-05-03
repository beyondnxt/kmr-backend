export class CreateUserDto {
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    password: string
    roleId: number
    companyId: number
    status: boolean
    createdBy: string
    createdOn: Date
    updatedBy: string
    updatedOn: Date
  }

//   export class userCreated {
//     @IsEmail()
//     @IsNotEmpty()
//     readonly email: string;
//     @IsNotEmpty()
//     @IsString()
//     readonly password: string;
// }