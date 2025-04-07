import { Model, Document, FilterQuery, QueryOptions } from 'mongoose';
import { IMongoRepository, IPaginationResponse } from './repository.interface';
export declare class MongoBaseRepository<T extends Document> implements IMongoRepository<T> {
    protected repository: Model<T>;
    constructor(repository: Model<T>);
    create(data: Partial<T>): Promise<T>;
    findById(id: string, select?: string): Promise<T | null>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
    findAll(filter?: FilterQuery<T>, options?: QueryOptions, select?: string): Promise<T[]>;
    findOne(filter?: FilterQuery<T>, options?: QueryOptions, select?: string): Promise<T | null>;
    paginate(filter?: FilterQuery<T>, page?: number, limit?: number, options?: QueryOptions, select?: string): Promise<IPaginationResponse<T>>;
    protected handleError(error: unknown): never;
}
