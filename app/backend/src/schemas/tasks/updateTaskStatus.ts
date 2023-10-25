import * as joi from 'joi';

const updateTaskSchema = joi.object({
  dailyTaskId: joi.number().required(),
  taskId: joi.number().required()
});

export default updateTaskSchema;