import IUser from "../interfaces/IUser";
import SequelizeUser from "../database/models/SequelizeUsers";
import { compareSync, hash } from "bcryptjs";
import { tokenGenerator } from "../auth/index";


export default class UsersModel {
    private sequelizeUser = SequelizeUser;

    async findAll(): Promise<IUser[]> {
        const dbData = await this.sequelizeUser.findAll();
        if (!dbData) throw new Error("No users found");

        const response = dbData.map(({ dataValues }) => {
            const { password, ...userWithoutPassword } = dataValues as IUser;
            return userWithoutPassword;
        });

        return response as IUser[];
    }

    async createUser(user: IUser): Promise<string> {
        const dbEmail = await this.sequelizeUser.findOne({
            where: {
                email: user.email
            }
        });

        if (dbEmail) throw new Error("Email already in database");

        const dbname = await this.sequelizeUser.findOne({
            where: {
                name: user.name
            }
        });

        if (dbname) throw new Error("name already in database");
        
        const { password } = user;
        const hashedPassword = await hash(password!, 10);

        user.password = hashedPassword as string;
        user.accStatus = 'active';
        user.accType = 'user';

        const newUser = await this.sequelizeUser.create(user as IUser);
        
        const { userId, email, accType, accStatus } = newUser;

        const token = tokenGenerator({ userId, email, accType, accStatus });

        if(!token) throw new Error("Token not generated");

        return token;
    }

    async login(user: IUser): Promise<string> {
        const { email, password } = user;

        const dbUser = await this.sequelizeUser.findOne({
            where: {
                email
            }
        });

        if (!dbUser) throw new Error("User not found");

        if (dbUser.accStatus === 'inactive') throw new Error("Acc inactive");

        if(!password) throw new Error("Password not provided");

        const isPasswordCorrect = await compareSync(password, dbUser.password!);

        if (!isPasswordCorrect) throw new Error("Password invalid");

        const { userId, accType, accStatus } = dbUser.get();

        const token = tokenGenerator({ userId, email, accType, accStatus });

        if(!token) throw new Error("Token not generated");

        return token;
    }

    async editUser(userId: number, user: IUser): Promise<IUser> {

        const userDb = await this.sequelizeUser.findOne({
            where: {
                userId
            }
        });

        if (!userDb) throw new Error("User not found");

        if (user.password) {
            const hashedPassword = await hash(user.password, 10);
            user.password = hashedPassword;
        }
        
        const userToEdit = {
            ...userDb,
            ...user
        };

        await this.sequelizeUser.update(userToEdit, {
            where: {
                userId
            }
        });

        const editedUser = await this.sequelizeUser.findOne({
            where: {
                userId
            }
        });

        if(!editedUser) throw new Error("User not edited");

        const { password, ...editedUserWithoutPassword } = editedUser.dataValues as IUser;

        return editedUserWithoutPassword as IUser;
    }

    async deleteUser(userId: number): Promise<IUser> {

        const usesrdb = await this.sequelizeUser.findOne({
            where: {
                userId
            }
        });

        if (!usesrdb) throw new Error("User not found");
        
        await this.sequelizeUser.update({ accStatus: "inactive" }, {
            where: {
                userId
            }
        });
        
        const userToDelete = await this.sequelizeUser.findOne({
            where: {
                userId
            }
        });

        if (!userToDelete) throw new Error("User not deleted");

        const { password, ...deletedUserWithoutPassword } = userToDelete?.dataValues as IUser;
        return deletedUserWithoutPassword as IUser;

        

    }

}