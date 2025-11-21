import { Module } from '@nestjs/common';
import { RecruitYearController } from './recruit-year.controller';
import { RecruitYearService } from '../../application/recruit-year/recruit-year.service';
import { RecruitYearDao } from '../../dao/recruit-year/recruit-year.dao';
import { PrismaService } from '../../../prisma.service';

@Module({
  controllers: [RecruitYearController],
  providers: [RecruitYearService, RecruitYearDao, PrismaService],
})
export class RecruitYearModule {}
