import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { CreateRopeDto } from './dto/rope-type.dto';
import { RopeType } from './entity/rope-type.entity';

@Injectable()
export class RopeService {
    constructor(
        @InjectRepository(RopeType)
        private readonly ropeRepository: Repository<RopeType>,
      ) { }
    
      async createRope(ropeData: CreateRopeDto, userId: number): Promise<RopeType> {
        try {
          const rope = this.ropeRepository.create(ropeData);
          rope.createdBy = userId
          return await this.ropeRepository.save(rope);
        } catch (error) {
          throw new Error(`Unable to create Rope : ${error.message}`);
        }
      }
    
      async getAllRopes(page: number = 1, limit: number = 10): Promise<{ data: RopeType[]; total: number }> {
        try {
          const [data, total] = await this.ropeRepository.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
          });
          return { data, total };
        } catch (error) {
          throw new Error(`Unable to fetch Ropes: ${error.message}`);
        }
      }
    
      async getRopeById(id: number): Promise<RopeType> {
        try {
          return await this.ropeRepository.findOne({ where: { id } });
        } catch (error) {
          throw new Error(`Unable to fetch Rope: ${error.message}`);
        }
      }
    
      async updateRope(id: number, ropeData: CreateRopeDto, userId): Promise<RopeType> {
        try {
          const rope = await this.ropeRepository.findOne({ where: { id } });
          if (!rope) {
            throw new NotFoundException(`Rope with ID ${id} not found`);
          }
          rope.updatedBy = userId
          this.ropeRepository.merge(rope, ropeData);
          return await this.ropeRepository.save(rope);
        } catch (error) {
          throw new Error(`Unable to update Rope : ${error.message}`);
        }
      }
    
      async remove(id: number): Promise<void> {
        try {
          const rope = await this.ropeRepository.findOne({ where: { id } });
          if (!rope) {
            throw new NotFoundException(`Rope with ID ${id} not found`);
          }
          await this.ropeRepository.remove(rope);
        } catch (error) {
          throw new Error(`Unable to delete Rope: ${error.message}`);
        }
      }
}
