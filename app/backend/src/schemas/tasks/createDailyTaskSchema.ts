import * as joi from 'joi';

const createDailyTaskSchema = joi.object({
  date: joi.string().required(),
  tasks: joi.array().items(
    joi.object({
      taskId: joi.number().required(),
      responsibleIds: joi.array().items(joi.number()).required()
    })
  )
});

export default createDailyTaskSchema;