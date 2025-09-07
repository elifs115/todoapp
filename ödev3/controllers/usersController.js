import * as usersService from "../services/userService.js";

export async function createUser(req, res, next) {
  try {
    const user = await usersService.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function listUsers(req, res, next) {
  try {
    const users = await usersService.list();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function getUserTodos(req, res, next) {
  try {
    const todos = await usersService.getUserTodos(req.params.id, req.query);
    res.json(todos);
  } catch (error) {
    next(error);
  }
}