import { Module } from '@nestjs/common';
import { RopeMachineService } from './rope-machine.service';
import { RopeMachineController } from './rope-machine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RopeMachine } from './entity/rope-machine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RopeMachine])],
  providers: [RopeMachineService],
  controllers: [RopeMachineController]
})
export class RopeMachineModule { }
