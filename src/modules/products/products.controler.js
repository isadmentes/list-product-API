import { makeProductService } from './product.service.js';
export const makeProductController = () => {

    const service = makeProductService();
    const create = async (req, res, next) => {
        try {
            const { name, price } = req.body;
            const product = await service.create({
                name, price, userId: req.user.id
            });

            return res.status(201).json(product);

        } catch (err) { return next(err); }
    };

    const list = async (req, res, next) => {
        try {
            const data = await service.list(req.query);
            return res.json(data);
        } catch (err) { return next(err); }
    };

    const get = async (req, res, next) => {
        try { return res.json(await service.get(Number(req.params.id))); }
        catch (err) { return next(err); }
    };
    
    const patch = async (req, res, next) => {
        try {
            return res.json(await service.patch(Number(req.params.id), req.body));
        } catch (err) { return next(err); }
    };

    const remove = async (req, res, next) => {
        try {
            await service.remove(Number(req.params.id)); return res.status(204).send();
        } catch (err) { return next(err); }

    };
    return { create, list, get, patch, remove };
};