import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm';
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

  async getAllRopes(page: number | 'all' = 1, limit: number = 10, ropeType: string): Promise<{ data: any[]; fetchedCount: number, totalCount: number }> {
    const where: any = {};
    if (ropeType) {
      where.ropeType = Like(`%${ropeType}%`);
    }
    let queryBuilder = this.ropeRepository.createQueryBuilder('ropeType')
      .andWhere(where);

    if (page !== "all") {
      const skip = (page - 1) * limit;
      queryBuilder = queryBuilder.skip(skip).take(limit);
    }

    const [rope, totalCount] = await Promise.all([
      queryBuilder.getMany(),
      queryBuilder.getCount()
    ]);
    return {
      data: rope.map(rope => ({
        id: rope.id,
        ropeType: rope.ropeType,
        shortCode: rope.shortCode,
        pieceNoShortCode: rope.pieceNoShortCode,
        createdBy: rope.createdBy,
        createdOn: rope.createdOn,
        updatedBy: rope.updatedBy,
        updatedOn: rope.updatedOn
      })),
      fetchedCount: rope.length,
      totalCount: totalCount
    };
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
