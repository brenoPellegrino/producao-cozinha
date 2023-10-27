import * as joi from 'joi';

const createDailyTaskSchema = joi.object({
  date: joi.string().regex(/^\d{4}-\d{2}-\d{2}$/).required(),
  tasks: joi.array().items(
    joi.object({
      taskId: joi.number().required(),
      responsibleIds: joi.array().items(joi.number())
    }).required()
  ).required()
});

export default createDailyTaskSchema;