import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { generateKeyPairSync } from 'crypto';
import { FindOneUserDto } from './dto/findOne-user.dto';
import { handleError } from '../services/error';


const saltOrRounds = 10;

@Injectable()
export class UserService {
  constructor(
    @Inject("USERS_REPOSITORY") private usersRepository: typeof User,
  ) {

  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { name, password, phone, role = "user"} = createUserDto;
      const matchUser = await this.usersRepository.findOne({ where: { phone }});
      if(matchUser) {
        throw new HttpException("User is already been decarate", HttpStatus.NOT_ACCEPTABLE)
      }

      const hash = await bcrypt.hash(password, saltOrRounds);
      const { publicKey, privateKey } = generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
        },
      });

      const user = await this.usersRepository.create({
        name,
        phone,
        hashPassword: hash,
        role,
        avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        publicKey,
        privateKey
      })

      return user

    } catch(error) {
      handleError(error)
    }
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll<User>();
  }

  async findOne(findOneUserDto: FindOneUserDto) {
    try {
      const {phone, password} = findOneUserDto;
      const user = await this.usersRepository.findOne<User>({ where: { phone }});

      if(!user) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND)
      }

      const passwordIsMath = await bcrypt.compare(password, user.hashPassword);

      if(!passwordIsMath) {
        throw new HttpException("Wrong password", HttpStatus.NOT_FOUND)
      }

      return user;

    } catch(error) {
      handleError(error)
    }
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
