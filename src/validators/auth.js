import { Router } from 'express'
import * as authController from '../controllers/authController.js'
import authenticate from '../middleware/authenticate.js'
import { validate, registerSchema, loginSchema } from '../validators/auth.js'

const router = Router()

router.post('/register', validate(registerSchema), authController.register)
router.post('/login', validate(loginSchema), authController.login)
router.post('/logout', authenticate, authController.logout)
router.get('/me', authenticate, authController.getMe)

export default router

export function validate(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const errorMessage = result.error?.errors?.[0].message || "Invalid request data";
            return next(new AppError(result.error.errors[0].message, 400));
        }
        req.body = result.data;
        next();
    };
}