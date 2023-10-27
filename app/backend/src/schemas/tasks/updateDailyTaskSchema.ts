import * as joi from 'joi';

const updateDailyTaskSchema = joi.object({
  dailyTaskId: joi.number().required(),
  tasks: joi.array().items(
    joi.object({
      taskId: joi.number().required(),
      responsibleIds: joi.array().items(joi.number())
    }).required()
  ).required()
});

export default updateDailyTaskSchema;