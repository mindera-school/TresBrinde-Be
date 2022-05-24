/*import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from "@nestjs/typeorm";
import {UserRepository} from "../user.repository";
import {UserController} from '../user.controller';
import {UserService} from '../user.service';
import {UserRole} from "../userRole.enum";
import {userMocks} from "./user.mocks";
import {HttpStatus} from "@nestjs/common";

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;
    let userRepository: UserRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                UserService,
                {provide: getRepositoryToken(UserRepository), useClass: UserRepository}
            ],
        }).compile();


        userController = module.get<UserController>(UserController);
        userService = module.get<UserService>(UserService);
        userRepository = module.get<UserRepository>(getRepositoryToken(UserRepository))
    });

    describe('findOneSuccess', () => {
        it('should return a user', async () => {
            //mocks
            jest.spyOn(userService, 'findOne').mockResolvedValue(userMocks.getMockedUserDetailsDto(UserRole.User));

            const result = await userController.findOne(1)

            expect(result).toStrictEqual(userMocks.getMockedUserDetailsDto(UserRole.User));
        });
    });

    describe('updateUserSuccess', () => {
        it('should return a user with updated data', async () => {
            //mocks
            jest.spyOn(userService, 'update').mockResolvedValue(userMocks.getMockedUpdatedUserDetailsDto(UserRole.User));

            expect(await userController.update(1, await userMocks.getMockedUserUpdateDto(UserRole.User))).toStrictEqual(await userMocks.getMockedUpdatedUserDetailsDto(UserRole.User));
        });
    });

    describe('deleteUserSuccess', () => {
        it('should call the delete method once', async () => {
            //mocks
            const remove = jest.spyOn(userService, "remove").mockResolvedValue({statusCode: HttpStatus.OK});

            await userController.remove(1);

            expect(remove).toBeCalledTimes(1);
        });
    });

})*/
