import prismaClient from "../../prisma/index.js";

interface ProductRequest {
  id: string;
}

class ListProductService {
  async execute() {
    const products = await prismaClient.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        banner: true,
        category_id: true,
      },
      orderBy: {
        created_at: "desc", // Opcional: ordena pelos mais novos
      },
    });

    return products;
  }
}

export { ListProductService };
