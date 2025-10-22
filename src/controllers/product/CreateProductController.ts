import { type Request, type Response } from "express";
import { CreateProductService } from "../../services/products/CreateProductService.js";

class CreateProductController{
    async handle(req: Request, res: Response){
        const {name, price, description, category_id} = req.body;

        const createProductService = new CreateProductService();

        if(!req.file){
            throw new Error("Erro ao carregar o arquivo!")
        }else{

            const {originalname, filename} = req.file;

            const product = await createProductService.execute({
            name,
            price, 
            description,
            banner: '',
            category_id
        });

        return res.json(product)
        }

        
    }
}

export { CreateProductController }