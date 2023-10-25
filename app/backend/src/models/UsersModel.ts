import IUser from "../interfaces/IUser";
import SequelizeUser from "../database/models/SequelizeUsers";
import { compareSync, hash } from "bcryptjs";
import { tokenGenerator } from "../auth/index";
import { ACTIVE, EMAIL_ALREADY_REGISTERED, INACTIVE, NAME_ALREADY_REGISTERED, TOKEN_NOT_GENERATED, USER, USER_NOT_DELETED, USER_NOT_EDITED, USER_NOT_FOUND } from "../helpers/mapStrings";


export default class UsersModel {
    private sequelizeUser = SequelizeUser;

    async findAll(): Promise<IUser[]> {
        const dbData = await this.sequelizeUser.findAll();
        if (!dbData) throw new Error(USER_NOT_FOUND);

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

        if (dbEmail) throw new Error(EMAIL_ALREADY_REGISTERED);

        const dbname = await this.sequelizeUser.findOne({
            where: {
                name: user.name
            }
        });

        if (dbname) throw new Error(NAME_ALREADY_REGISTERED);
        
        const { password } = user;
        const hashedPassword = await hash(password!, 10);

        user.password = hashedPassword as string;
        user.accStatus = ACTIVE;
        user.accType = USER;

        const newUser = await this.sequelizeUser.create(user as IUser);
        
        const { userId, email, accType, accStatus } = newUser;

        const token = tokenGenerator({ userId, email, accType, accStatus });

        if(!token) throw new Error(TOKEN_NOT_GENERATED);

        return token;
    }

    async login(user: IUser): Promise<string> {
        const { email, password } = user;

        const dbUser = await this.sequelizeUser.findOne({
            where: {
                email
            }
        });

        if (!dbUser) throw new Error(USER_NOT_FOUND);

        if (dbUser.accStatus === INACTIVE) throw new Error("Acc inactive");

        if(!password) throw new Error("Password not provided");

        const isPasswordCorrect = await compareSync(password, dbUser.password!);

        if (!isPasswordCorrect) throw new Error("Password invalid");

        const { userId, accType, accStatus } = dbUser.get();

        const token = tokenGenerator({ userId, email, accType, accStatus });

        if(!token) throw new Error(TOKEN_NOT_GENERATED);

        return token;
    }

    async editUser(userId: number, user: IUser): Promise<IUser> {

        const userDb = await this.sequelizeUser.findOne({
            where: {
                userId
            }
        });

        if (!userDb) throw new Error(USER_NOT_FOUND);

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

        if(!editedUser) throw new Error(USER_NOT_EDITED);

        const { password, ...editedUserWithoutPassword } = editedUser.dataValues as IUser;

        return editedUserWithoutPassword as IUser;
    }

    async deleteUser(userId: number): Promise<IUser> {

        const usesrdb = await this.sequelizeUser.findOne({
            where: {
                userId
            }
        });

        if (!usesrdb) throw new Error(USER_NOT_FOUND);
        
        await this.sequelizeUser.update({ accStatus: INACTIVE }, {
            where: {
                userId
            }
        });
        
        const userToDelete = await this.sequelizeUser.findOne({
            where: {
                userId
            }
        });

        if (!userToDelete) throw new Error(USER_NOT_DELETED);

        const { password, ...deletedUserWithoutPassword } = userToDelete?.dataValues as IUser;
        return deletedUserWithoutPassword as IUser;

        

    }

}