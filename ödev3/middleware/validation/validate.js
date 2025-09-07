import { ZodError } from "zod";

export const validate = (schema) => (req, res, next) => {
  try {
    // Mevcut değerleri kopyala
    const body = { ...req.body };
    const query = { ...req.query };
    const params = { ...req.params };

    // Zod doğrulama
    const result = schema.parse({
      body,
      query,
      params
    });

    // Değerleri doğrudan değiştirmek yerine, içeriklerini güncelle
    if (result.body) {
      // req.body'yi tamamen değiştirmek yerine içindeki özellikleri güncelle
      Object.keys(req.body).forEach(key => {
        delete req.body[key];
      });
      Object.assign(req.body, result.body);
    }
    
    // query ve params nesneleri Express tarafından kilitlendiği için
    // bunları değiştiremeyiz, ancak bu noktada zaten doğrulanmış oldukları için
    // controller'a geçebiliriz

    return next();
  } catch (error) {
    // Sadece Zod hatalarını formatla
    if (error instanceof ZodError) {
      const formattedErrors = {};
      
      error.errors.forEach(err => {
        const path = err.path.slice(1).join('.');
        formattedErrors[path] = err.message;
      });

      return res.status(400).json({
        message: "Validation failed",
        errors: formattedErrors
      });
    }
    
    // Diğer hataları genel hata yakalayıcıya ilet
    return next(error);
  }
};