import { ZodError } from "zod";

export const validate = (schema) => (req, res, next) => {
  try {
   
    const result = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params
    });

   
    if (result.body) {
      Object.keys(req.body).forEach(key => {
        delete req.body[key];
      });
      Object.assign(req.body, result.body);
    }
    
    return next();
  } catch (error) {
    
    if (error instanceof ZodError) {
      const formattedErrors = {};
      
      
      if (error.errors && Array.isArray(error.errors)) {
        error.errors.forEach(err => {
          
          if (err.path && Array.isArray(err.path)) {
            const path = err.path.slice(1).join('.');
            formattedErrors[path] = err.message;
          }
        });
      }

      return res.status(400).json({
        message: "Validation failed",
        errors: formattedErrors
      });
    }
    

    return next(error);
  }
};