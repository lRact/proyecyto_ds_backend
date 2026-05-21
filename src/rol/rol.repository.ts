import {EntityRepository, Repository} from "typeorm";
import {RolEntity} from "./entities/rol.entity";

@EntityRepository(RolEntity)
export class RolRepository extends Repository<RolEntity> {

}