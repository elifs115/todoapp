import { EntitySchema } from "typeorm";

export const TodoEntity = new EntitySchema({
  name: "Todo",
  tableName: "todos",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    title: {
      type: String,
      nullable: false
    },
    description: {
      type: String,
      nullable: false
    },
    completed: {
      type: Boolean,
      default: false
    },
    created_at: {
      type: "timestamptz",
      createDate: true
    },
    updated_at: {
      type: "timestamptz",
      updateDate: true
    }
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "user_id" },
      onDelete: "CASCADE"
    }
  },
  indices: [
    {
      name: "IDX_TODO_COMPLETED",
      columns: ["completed"]
    },
    {
      name: "IDX_TODO_CREATED_AT",
      columns: ["created_at"]
    }
  ]
});