import { type Request, type Response } from "express";
import { ListByCategoryService } from "../../services/products/ListByCategoryService.js";

class ListByCategoryController{
    async handle(req: Request, res: Response){
        const category_id = req.query.category_id as string;

        const listByCategoryService = new ListByCategoryService();

        const products = await listByCategoryService.execute({
            category_id
        });

        return res.json(products);
    }
}

export { ListByCategoryController }