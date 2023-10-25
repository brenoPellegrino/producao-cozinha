import { ServiceResponse } from "../interfaces/ServiceResponse";
import IUser from "../interfaces/IUser";
import UsersModel from "../models/UsersModel";
import { BAD_REQUEST, INTERNAL_ERROR, NOT_FOUND, OK, TOKEN_NOT_GENERATED, USER_NOT_FOUND } from "../helpers/mapStrings";

export default class UsersService {
    private userModel = new UsersModel();

    async findAll(): Promise<ServiceResponse<IUser[]>>{
        try {
            const users = await this.userModel.findAll();
            
            return { status: OK, data: users };
            
        } catch (error) {
            const { message } = error as Error;
            return { status: INTERNAL_ERROR, data: { message } };
        }
    }

    async createUser(user: IUser): Promise<ServiceResponse<string>>{
        try {
            const token = await this.userModel.createUser(user);
            return { status: OK, data: token as string };
        } catch (error) {
            const { message } = error as Error;

            if (message === TOKEN_NOT_GENERATED) return { status: INTERNAL_ERROR, data: { message } };

            return { status: BAD_REQUEST, data: { message } };
        }
    }

    async login(user: IUser): Promise<ServiceResponse<string>>{
        try{
            const token = await this.userModel.login(user);
            return { status: OK, data: token };
        } catch (error) {
            const { message } = error as Error;

            if (message === TOKEN_NOT_GENERATED) return { status: INTERNAL_ERROR, data: { message } };

            return { status: BAD_REQUEST, data: { message } };
        }
    }

    async editUser(id: number, user: IUser): Promise<ServiceResponse<IUser>>{
        try {
            const editedUser = await this.userModel.editUser(id, user);
            return { status: OK, data: editedUser };
            
        } catch (error) {
            const { message } = error as Error;

            if (message === USER_NOT_FOUND) return { status: NOT_FOUND, data: { message } };

            return { status: INTERNAL_ERROR, data: { message } };
            
        }
        
    }

    async deleteUser(id: number): Promise<ServiceResponse<IUser>>{

        try {
            const deletedUser = await this.userModel.deleteUser(id);
            
            return { status: OK, data: deletedUser };
        } catch (error) {
            const { message } = error as Error;

            if (message === USER_NOT_FOUND) return { status: NOT_FOUND, data: { message } };

            return { status: INTERNAL_ERROR, data: { message } };
        }
        
    }
}