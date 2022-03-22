import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    async create(createUserDto: CreateUserDto): Promise<User> {

        await this.verifyDuplicatedEmail(createUserDto.email)

        // Here we create the data from DTO
        const user = User.create(createUserDto);
        // Save
        await user.save();
        // Now we delete a single property
        delete user.password;
        // and return them.
        return user;
    }

    async showById(id: string): Promise<User> {
        const user = await User.findOne(id);
        delete user.password;
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await User.findOne({
            where: {
                email
            }
        });

        if (user) {
            return user;
        } else {
            throw new NotFoundException('Dados incorretos verifique-os.');
        }
    }

    async verifyDuplicatedEmail(email: string): Promise<void> {
        const user = await User.findOne({
            where: {
                email
            }
        });

        if (user) {
            throw new ConflictException('E-mail já cadastrado.');
        }
    }



}
