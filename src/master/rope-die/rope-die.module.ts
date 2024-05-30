import { Module } from '@nestjs/common';
import { RopeDieService } from './rope-die.service';
import { RopeDieController } from './rope-die.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RopeDie } from './entity/rope-die.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RopeDie])],
  providers: [RopeDieService],
  controllers: [RopeDieController]
})
export class RopeDieModule { }
