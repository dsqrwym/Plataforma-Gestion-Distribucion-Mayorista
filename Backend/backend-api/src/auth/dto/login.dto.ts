import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength, IsStrongPassword, IsOptional, MaxLength, ValidateIf } from "class-validator";
export class LoginDto {
    @ApiProperty({
        description: 'The user\'s password. Must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one number.',
        example: 'StrongPassword123!',
    })
    @IsString() // 验证为字符串
    @MinLength(6) // 最小长度为6
    @IsStrongPassword({
        minLength: 6, // 最小长度为6
        minLowercase: 1, // 至少包含一个小写字母
        minUppercase: 1, // 至少包含一个大写字母
        minNumbers: 1, // 至少包含一个数字
        minSymbols: 0, // 至少包含一个符号
    }) // 强密码验证，要求至少包含一个数字、一个大写字母和一个小写字母
    password: string; // 密码


    @ApiPropertyOptional({
        description: 'The user\'s email address. Must be a valid email format and cannot belong to the "example.com" domain.',
        example: 'user@example.com',
    })
    @ValidateIf((o) => !o.username)
    @IsEmail({ host_blacklist: ['example.com'] }) // 验证为邮箱格式，并排除example.com域名
    email: string; // 邮箱地址


    @ApiPropertyOptional({
        description: 'The user\'s email address. Must be a valid email format and cannot belong to the "example.com" domain.',
        example: 'user@example.com',
    })
    @ValidateIf((o) => !o.email)
    @IsString() // 验证为字符串
    @MinLength(3) // 最小长度为3
    @MaxLength(30) // 最大长度为30
    username: string; // 用户名


    @ApiProperty({
        description: 'The name of the device used for login. Will be converted to uppercase.',
        example: 'CHROME_BROWSER',
    })
    @IsString()
    @MaxLength(150)
    @Transform(({ value }) => value?.toUpperCase()) // 将设备名称转换为大写
    deviceName: string; // 登录设备名称


    @ApiProperty({
        description: 'The IP address of the device used for login. Will be converted to uppercase.',
        example: '192.168.1.1',
    })
    @IsString()
    @MaxLength(39)
    @Transform(({ value }) => value?.toUpperCase()) // 将IP地址转换为大写
    ipAddress: string; // 登录地址


    @ApiProperty({
        description: 'The user-agent string of the device used for login. Will be converted to uppercase.',
        example: 'MOZILLA/5.0 (WINDOWS NT 10.0; WIN64; X64)',
    })
    @IsString()
    @MaxLength(255)
    @Transform(({ value }) => value?.toUpperCase()) // 将user-agent转换为大写
    userAgent: string; // 登录设备
}