import { Router } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AbstractRouter = (controller: any) => {
    const router = Router();

    // Add
    router.post('/', controller.agregar);

    // Browse
    router.get('/', controller.listar);

    // Read
    router.get('/:id', controller.buscar);

    // Edit
    router.put('/:id', controller.actualizar);

    // Delete
    router.delete('/:id', controller.borrar);

    return router;
};
