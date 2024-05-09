export class CreateUserDto {
  userName: string
  fullName: string
  location: string
  departmentId: number
  password: string
  mobileNumber: string
  email: string
  roleId: number
  status: boolean
  createdBy: number
  createdOn: Date
  updatedBy: number
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