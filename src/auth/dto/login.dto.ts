import {ApiProperty} from "@nestjs/swagger";

export class LogInDto {
    @ApiProperty({example: "example@example.com", description: "Email example"})
    email: string;
    @ApiProperty({example: "example", description: "Password example"})
    password: string;
}

export default LogInDto;