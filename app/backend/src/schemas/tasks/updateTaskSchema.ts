import * as joi from 'joi';

const updateTaskSchema = joi.object({
  title: joi.string(),
  description: joi.string(),
  obs: joi.string()
});

export default updateTaskSchema;