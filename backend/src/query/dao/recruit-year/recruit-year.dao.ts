import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { RecruitYear } from '@prisma/client';

@Injectable()
export class RecruitYearDao {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<RecruitYear[]> {
    return this.prisma.recruitYear.findMany({
      orderBy: {
        recruitYear: 'asc',
      },
    });
  }

  async findOne({
    recruitYear,
  }: {
    recruitYear: number;
  }): Promise<RecruitYear | null> {
    return this.prisma.recruitYear.findUnique({
      where: { recruitYear },
    });
  }
}
