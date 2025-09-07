import { EntitySchema } from "typeorm";

export const UserEntity = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    username: {
      type: String,
      unique: true,
      nullable: false
    },
    email: {
      type: String,
      unique: true,
      nullable: false
    },
    password: {  
      type: String,
      nullable: false
    },
    created_at: {
      type: "timestamptz",
      createDate: true
    }
  },
  relations: {
    todos: {
      type: "one-to-many",
      target: "Todo",
      inverseSide: "user"
    }
  }
});