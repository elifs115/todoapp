import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "../schema/UserEntity.js";
import { TodoEntity } from "../schema/TodoEntity.js";
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "ep-hidden-sunset-a21ci81e-pooler.eu-central-1.aws.neon.tech",
  port: 5432,
  username: "neondb_owner",
  password: "npg_erQo5fATXD7B",
  database: "neondb",
  synchronize: true, // development için true, production'da false
  logging: true,
  entities: [UserEntity, TodoEntity],
  migrations: ["./migrations/*.js"],
  migrationsTableName: "migrations_history",
  ssl: {
    rejectUnauthorized: false,
  },
  
});