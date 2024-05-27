import { Module } from '@nestjs/common';
import { RopeMachineService } from './rope-machine.service';
import { RopeMachineController } from './rope-machine.controller';

@Module({
  providers: [RopeMachineService],
  controllers: [RopeMachineController]
})
export class RopeMachineModule {}
