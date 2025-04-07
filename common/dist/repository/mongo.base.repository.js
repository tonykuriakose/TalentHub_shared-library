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
exports.MongoBaseRepository = void 0;
const app_errors_1 = require("../app.errors");
class MongoBaseRepository {
    constructor(repository) {
        this.repository = repository;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = new this.repository(data);
                return yield entity.save();
            }
            catch (error) {
                this.handleError(error);
            }
        });
    }
    findById(id, select) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findById(id).select(select || '');
            }
            catch (error) {
                this.handleError(error);
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findByIdAndUpdate(id, data, { new: true });
            }
            catch (error) {
                this.handleError(error);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repository.findByIdAndDelete(id).exec();
                return result !== null;
            }
            catch (error) {
                this.handleError(error);
            }
        });
    }
    findAll() {
        return __awaiter(this, arguments, void 0, function* (filter = {}, options = {}, select) {
            try {
                return yield this.repository.find(filter, null, Object.assign(Object.assign({}, options), { select: select || '' }));
            }
            catch (error) {
                this.handleError(error);
            }
        });
    }
    findOne() {
        return __awaiter(this, arguments, void 0, function* (filter = {}, options = {}, select) {
            try {
                return yield this.repository.findOne(filter, null, Object.assign(Object.assign({}, options), { select: select || '' }));
            }
            catch (error) {
                this.handleError(error);
            }
        });
    }
    paginate() {
        return __awaiter(this, arguments, void 0, function* (filter = {}, page = 1, limit = 10, options = {}, select) {
            try {
                if (page < 1)
                    page = 1;
                if (limit < 1)
                    limit = 1;
                const skip = (page - 1) * limit;
                const data = yield this.repository.find(filter, null, Object.assign(Object.assign({}, options), { skip, limit, select: select || '' })).exec();
                const total = yield this.repository.countDocuments(filter).exec();
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
exports.MongoBaseRepository = MongoBaseRepository;
//# sourceMappingURL=mongo.base.repository.js.map