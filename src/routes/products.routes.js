import { Router } from 'express';
import { ensureAuth } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { makeProductController } from '../modules/products/product.controller.js';
import { createProductSchema, listProductsQuery, productIdParams, patchProductSchema} from '../modules/products/product.schemas.js';

export const productRouter = () => {
    
    const r = Router();
    const ctrl = makeProductController();
    r.use(ensureAuth); // todas as rotas abaixo exigem JWT
    r.post('/', validate({ body: createProductSchema }), ctrl.create);
    r.get('/', validate({ query: listProductsQuery }), ctrl.list);
    r.get('/:id', validate({ params: productIdParams }), ctrl.get);
    r.patch('/:id', validate({
        params: productIdParams, body: patchProductSchema
    }), ctrl.patch);
    r.delete('/:id', validate({ params: productIdParams }), ctrl.remove);

    return r;
};
