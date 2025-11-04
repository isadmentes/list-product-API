import { makeUserService } from './user.service.js';
import { ensureAuth } from '../../middlewares/auth.js';

export const makeUserController = () => {
    const service = makeUserService();
    const register = async (req, res, next) => {
        try {
            const { name, email, password } = req.body;
            const user = await service.register({ name, email, password });

            return res.status(201).json({
                id: user.id, name: user.name, email: user.email
            });
        } catch (err) { return next(err); }
    };

    const login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const tokens = await service.login({ email, password });

            return res.json(tokens);
        } catch (err) { return next(err); }
    };
    // rota protegida via array: [ensureAuth, handler]
    const me = [ensureAuth, async (req, res) => res.json({
        userId: req.user.id
    })];
    
    return { register, login, me };
};