const JOI = require('joi')

const validateUser = (user) => {
    const schema = JOI.object({
      firstName: JOI.string().required(),
      lastName: JOI.string().required(),
      email: JOI.string().email().required(),
      password: JOI.string().required(),
      phone: JOI.string().optional()
    });
  
    return schema.validate(user, { abortEarly: false });
  };

  const validateLogin = (user)=>{
    const schema = JOI.object({
      email: JOI.string().email().required(),
      password: JOI.string().required()
    });
    return schema.validate(user, { abortEarly: false });
  }

  module.exports = {validateUser, validateLogin};
  