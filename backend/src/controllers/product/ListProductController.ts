import { type Request, type Response } from "express";
import { ListProductService } from "../../services/products/listProductService.js";

class ListProductController{
    async handle(req: Request, res: Response){
        const listProductService = new ListProductService();

        const products = await listProductService.execute();

        return res.json(products);
    }
}

export { ListProductController }