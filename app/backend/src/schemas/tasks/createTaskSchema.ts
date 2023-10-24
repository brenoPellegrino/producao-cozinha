import * as joi from 'joi';

const createTaskSchema = joi.object({
  title: joi.string().required(),
  description: joi.string(),
  obs: joi.string()
});

export default createTaskSchema;