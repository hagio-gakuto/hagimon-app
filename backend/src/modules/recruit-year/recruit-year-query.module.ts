import { Module } from '@nestjs/common';
import { RecruitYearController } from '../../query/controller/recruit-year/recruit-year.controller';
import { RecruitYearService } from '../../query/application/recruit-year/recruit-year.service';
import { RecruitYearDao } from '../../query/dao/recruit-year/recruit-year.dao';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [RecruitYearController],
  providers: [RecruitYearService, RecruitYearDao, PrismaService],
})
export class RecruitYearQueryModule {}
