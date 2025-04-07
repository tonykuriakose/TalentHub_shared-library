"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresBaseRepository = void 0;
const app_errors_1 = require("../app.errors");
class PostgresBaseRepository {
    constructor(repository) {
        this.repository = repository;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = this.repository.create(data);
                return yield this.repository.save(entity);
            }
            catch (error) {
                this.handleError(error);
            }
        });
    }
    update(criteria, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repository.update(criteria, data);
                return result.affected ? result.raw : null;
            }
            catch (error) {
                this.handleError(error);
            }
        });
    }
    delete(criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repository.delete(criteria);
                return result.affected !== 0;
            }
            catch (error) {
                this.handleError(error);
            }
        });
    }
    findAll() {
        return __awaiter(this, arguments, void 0, function* (filter = {}) {
            try {
                return yield this.repository.find(filter);
            }
            catch (error) {
                this.handleError(error);
            }
        });
    }
    findOne() {
        return __awaiter(this, arguments, void 0, function* (filter = {}) {
            try {
                return yield this.repository.findOne(filter);
            }
            catch (error) {
                this.handleError(error);
            }
        });
    }
    paginate() {
        return __awaiter(this, arguments, void 0, function* (filter = {}, page = 1, limit = 10) {
            try {
                if (page < 1)
                    page = 1;
                if (limit < 1)
                    limit = 1;
                const [data, total] = yield this.repository.findAndCount({
                    where: filter.where,
                    skip: (page - 1) * limit,
                    take: limit,
                });
                const totalPages = Math.ceil(total / limit);
                const hasPreviousPage = page > 1;
                const hasNextPage = page < totalPages;
                return {
                    data,
                    total,
                    limit,
                    currentPage: page,
                    totalPages,
                    hasPreviousPage,
                    hasNextPage,
                };
            }
            catch (error) {
                this.handleError(error);
            }
        });
    }
    handleError(error) {
        if (error instanceof Error) {
            throw new app_errors_1.InternalError(error.message);
        }
        throw new app_errors_1.InternalError('An unknown error occurred');
    }
}
exports.PostgresBaseRepository = PostgresBaseRepository;
//# sourceMappingURL=postgres.repository.js.map