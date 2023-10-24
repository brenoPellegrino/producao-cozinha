import { ServiceResponse } from "../interfaces/ServiceResponse";
import IUser from "../interfaces/IUser";
import UsersModel from "../models/UsersModel";

export default class UsersService {
    private userModel = new UsersModel();

    async findAll(): Promise<ServiceResponse<IUser[]>>{
        try {
            const users = await this.userModel.findAll();
            
            return { status: 'successful', data: users };
            
        } catch (error) {
            const { message } = error as Error;
            return { status: 'internalError', data: { message } };
        }
    }

    async createUser(user: IUser): Promise<ServiceResponse<string>>{
        try {
            const token = await this.userModel.createUser(user);
            return { status: 'successful', data: token as string };
        } catch (error) {
            const { message } = error as Error;

            if (message === 'Token not generated') return { status: 'internalError', data: { message } };

            return { status: 'badRequest', data: { message } };
        }
    }

    async login(user: IUser): Promise<ServiceResponse<string>>{
        try{
            const token = await this.userModel.login(user);
            return { status: 'successful', data: token };
        } catch (error) {
            const { message } = error as Error;

            if (message === 'Token not generated') return { status: 'internalError', data: { message } };

            return { status: 'badRequest', data: { message } };
        }
    }

    async editUser(id: number, user: IUser): Promise<ServiceResponse<IUser>>{
        try {
            const editedUser = await this.userModel.editUser(id, user);
            return { status: 'successful', data: editedUser };
            
        } catch (error) {
            const { message } = error as Error;

            if (message === 'User not found') return { status: 'notFound', data: { message } };

            return { status: 'internalError', data: { message } };
            
        }
        
    }

    async deleteUser(id: number): Promise<ServiceResponse<IUser>>{

        try {
            const deletedUser = await this.userModel.deleteUser(id);
            
            return { status: 'successful', data: deletedUser };
        } catch (error) {
            const { message } = error as Error;

            if (message === 'User not found') return { status: 'notFound', data: { message } };

            return { status: 'internalError', data: { message } };
        }
        
    }
}