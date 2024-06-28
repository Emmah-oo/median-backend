import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createPostDto: CreatePostDto) {
    const { title, body, authorId, published } = createPostDto;

    return this.prisma.post.create({
      data: {
        title,
        body,
        published,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.post.findMany({
      include: {
        author: true,
      },
    });
  }

  findAllDrafts() {
    return this.prisma.post.findMany({
      include: {
        author: true,
      },
      where: {
        published: false,
      },
    });
  }

  findAllPublished() {
    return this.prisma.post.findMany({
      include: {
        author: true,
      },
      where: {
        published: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    const { title, body, authorId, published } = updatePostDto;

    return this.prisma.post.update({
      where: { id },
      data: { title, body, published, author: { connect: { id: authorId } } },
    });
  }

  remove(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
