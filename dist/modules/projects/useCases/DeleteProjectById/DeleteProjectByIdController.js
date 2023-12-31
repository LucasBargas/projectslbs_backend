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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Project_1 = require("../../models/Project");
class DeleteProjectByIdController {
    constructor(deleteProjectByIdUseCase) {
        this.deleteProjectByIdUseCase = deleteProjectByIdUseCase;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const objId = new mongoose_1.default.Types.ObjectId(id);
                const projectById = yield Project_1.Project.findById(objId);
                if (!projectById) {
                    return res.status(422).json({
                        errors: ['Nenhum projeto localizado ou ID inválido'],
                    });
                }
                const project = yield this.deleteProjectByIdUseCase.execute(id);
                return res.status(201).json({
                    message: 'Projeto deletado',
                    project,
                });
            }
            catch (error) {
                return res
                    .status(422)
                    .json({ errors: ['Houve um erro, tente novamente mais tarde!'] });
            }
        });
    }
}
exports.default = DeleteProjectByIdController;
