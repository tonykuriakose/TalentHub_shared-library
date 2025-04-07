import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { ObjectLiteral } from 'typeorm';
import { IPaginationResponse, IPostgresRepository } from './repository.interface';
export declare class PostgresBaseRepository<T extends ObjectLiteral> implements IPostgresRepository<T> {
    protected repository: Repository<T>;
    constructor(repository: Repository<T>);
    create(data: DeepPartial<T>): Promise<T>;
    update(criteria: string | number | FindOptionsWhere<T>, data: Partial<T>): Promise<T | null>;
    delete(criteria: string | number | FindOptionsWhere<T>): Promise<boolean>;
    findAll(filter?: FindManyOptions<T>): Promise<T[]>;
    findOne(filter?: FindOneOptions<T>): Promise<T | null>;
    paginate(filter?: FindManyOptions<T>, page?: number, limit?: number): Promise<IPaginationResponse<T>>;
    protected handleError(error: unknown): never;
}
