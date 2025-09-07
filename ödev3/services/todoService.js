import { AppDataSource } from "../db/dataSource.js";
import { TodoEntity } from "../schema/TodoEntity.js";
import { UserEntity } from "../schema/UserEntity.js";
import { TODO_NOT_FOUND, INVALID_USER_ID } from "../utils/errorMessages.js";

const todoRepository = AppDataSource.getRepository(TodoEntity);
const userRepository = AppDataSource.getRepository(UserEntity);

export async function list(query = {}) {
  const { 
    completed, 
    q, 
    page = 1, 
    limit = 10, 
    sort = 'created_at', 
    order = 'desc' 
  } = query;
  
  const skip = (page - 1) * limit;
  
  const queryBuilder = todoRepository.createQueryBuilder("todo")
    .leftJoinAndSelect("todo.user", "user")
    .skip(skip)
    .take(limit);

  // Completed filtresi
  if (completed !== undefined) {
    queryBuilder.andWhere("todo.completed = :completed", { 
      completed: completed === 'true' 
    });
  }

  // Arama (title ve description'da)
  if (q) {
    queryBuilder.andWhere(
      "(todo.title ILIKE :search OR todo.description ILIKE :search)",
      { search: `%${q}%` }
    );
  }

  // Sıralama
  const validSortFields = ['created_at', 'updated_at', 'title', 'completed'];
  const sortField = validSortFields.includes(sort) ? sort : 'created_at';
  const sortOrder = order.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
  
  queryBuilder.orderBy(`todo.${sortField}`, sortOrder);

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

export async function getById(id) {
  const todo = await todoRepository.findOne({
    where: { id },
    relations: ["user"]
  });
  
  if (!todo) {
    throw { status: 404, message: TODO_NOT_FOUND };
  }
  
  return todo;
}

export async function create(data) {
  const { title, description, userId } = data;
  
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw { status: 400, message: INVALID_USER_ID };
  }

  const newTodo = todoRepository.create({
    title,
    description,
    completed: false,
    user: user
  });

  return await todoRepository.save(newTodo);
}

export async function update(id, data) {
  const todo = await getById(id);
  
  await todoRepository.update(id, data);
  
  return await getById(id);
}

export async function remove(id) {
  const todo = await getById(id);
  
  await todoRepository.delete(id);
  
  return todo;
}

export async function patch(id, data) {
  const todo = await getById(id);
  await todoRepository.update(id, { ...data, updated_at: new Date() });
  return await getById(id);
}

export async function completeTodo(id) {
  return await patch(id, { completed: true });
}