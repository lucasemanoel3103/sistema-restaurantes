import prismaClient from "../../prisma/index.js";

interface CategoryRequest{
    name: string;
}

class CreateCategoryService{
    async execute({name}: CategoryRequest){
       
        if(name === ''){
            throw new Error('O Campo não pode ser vazio!')
        }

        const category = await prismaClient.category.create({
            data: {
                name: name,
            },
            select: {
                id: true,
                name: true,
            }
        })

        return category;
    }
}

export {CreateCategoryService}