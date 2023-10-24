import { Router } from 'express';
import usersRouter from './UsersRouter';
import tasksRouter from './TasksRouter';
import dailyTaskRouter from './DailyTasksRouter';

const router = Router();

router.use('/users', usersRouter);
router.use('/tasks', tasksRouter);
router.use('/daily-tasks', dailyTaskRouter)


export default router;