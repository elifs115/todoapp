import { AppDataSource } from "../db/dataSource.js";
import { UserEntity } from "../schema/UserEntity.js";
import { TodoEntity } from "../schema/TodoEntity.js";
import { USER_NOT_FOUND } from "../utils/errorMessages.js";

const userRepository = AppDataSource.getRepository(UserEntity);
const todoRepository = AppDataSource.getRepository(TodoEntity);

export async function create(data) {
  const newUser = userRepository.create(data);
  return await userRepository.save(newUser);
}

export async function list() {
  return await userRepository.find({
    select: ["id", "username", "email", "created_at"]
  });
}

export async function getUserTodos(userId, query = {}) {
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) throw { status: 404, message: USER_NOT_FOUND };
  
  const { completed, page = 1, limit = 10 } = query;
  const skip = (page - 1) * limit;
  
  const queryBuilder = todoRepository.createQueryBuilder("todo")
    .leftJoinAndSelect("todo.user", "user")
    .where("todo.user_id = :userId", { userId })
    .skip(skip)
    .take(limit)
    .orderBy("todo.created_at", "DESC");

  if (completed !== undefined) {
    queryBuilder.andWhere("todo.completed = :completed", { completed: completed === 'true' });
  }

  const todos = await queryBuilder.getMany();
  const total = await queryBuilder.getCount();

  return {
    todos,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
}