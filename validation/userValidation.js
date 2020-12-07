const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    nama: Joi.string().min(3).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: {
        allow: ["com", "net", "id"]
      },
    }),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(6),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: {
        allow: ["com", "net", "id"]
      },
    }),
    password: Joi.string().min(6),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;