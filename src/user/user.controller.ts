import {Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Query} from '@nestjs/common';
import {UserService} from './user.service';
import {UpdateUserDto} from './dto/update-user.dto';
import {ApiBearerAuth, ApiOperation, ApiTags} from "@nestjs/swagger";
import {UserRole} from "./userRole.enum";
import {Roles} from "../decorators/roles.decorator";
import {IsSameUser} from "../decorators/isSameUser.decorator";
import {ApiImplicitQuery} from "@nestjs/swagger/dist/decorators/api-implicit-query.decorator";

@ApiTags("User")
@Controller('users')
@ApiBearerAuth("JWT-auth")
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {
    }

    @Get()
    @Roles(UserRole.Admin)
    @ApiOperation({summary: 'Paginate Users'})
    @ApiImplicitQuery({name: "page", description: "The page to return", required: false, type: Number})
    @ApiImplicitQuery({name: "limit", description: "The number of elements to return", required: false, type: Number})
    async findAll(
        @Query("limit", new DefaultValuePipe(20), ParseIntPipe) limit: number,
        @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    ) {
        return await this.userService.findAll(limit, page);
    }

    @Get(':id')
    @Roles(UserRole.Admin, UserRole.User)
    @IsSameUser()
    @ApiOperation({summary: 'get a specific user'})
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.findOne(id);
    }

    @Patch(':id')
    @Roles(UserRole.Admin, UserRole.User)
    @IsSameUser()
    @ApiOperation({summary: 'Update a specific user'})
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return await this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    @Roles(UserRole.Admin, UserRole.User)
    @IsSameUser()
    @ApiOperation({summary: 'Deletes a specific user'})
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.remove(id);
    }
}
