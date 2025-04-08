import prisma from "../prisma/client.js";

export const getTasks = async (req, res) => {
  const userId = req.user.id;
  const tasks = await prisma.task.findMany({ where: { userId } });
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  const task = await prisma.task.create({
    data: { title, description, userId, status: "pending" },
  });

  res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const task = await prisma.task.update({
    where: { id: Number(id) },
    data: { title, description, status },
  });

  res.json(task);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  await prisma.task.delete({ where: { id: Number(id) } });

  res.status(204).send();
};
