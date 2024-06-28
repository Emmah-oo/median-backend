import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    const { name, email } = createUserDto;

    return this.prisma.user.create({
      data: {
        name,
        email,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: {
        posts: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        posts: true,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const { name, email } = updateUserDto;
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
      },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
