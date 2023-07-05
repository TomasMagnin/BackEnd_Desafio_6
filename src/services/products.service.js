import { ProductModel  } from "../DAO/models/products.model.js";

export class ProductService  {

    validate(title, description, price, thumbnail, code, stock, category){
        if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
            console.log("validation error: please complete all fields.");
            throw new Error("validation error: please complete all fields.");
        }
    }

    async get(queryParams){
        const { limit = 10, page = 1, sort, query } = queryParams;
        const filter = {};

        if (query) {
            filter.$or = [
                {category: query},
                {availability: query}, /* ? */
            ];
        }

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: sort === "desc" ? "-price" : "price",
        };

        const result = await ProductModel.paginate(filter, options);

        const response = {
            status: "success",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.hasPrevPage ? result.prevPage : null,
            nextPage: result.hasNextPage ? result.nextPage : null,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/api/products?limit=${limit}&page=${result.prevPage}` : null,
            nextLink: result.hasNextPage ? `/api/products?limit=${limit}&page=${result.nextPage}` : null,
        };
        return response;
    }

    async createOne(title, description, price, thumbnail, code, stock, category){
        this.validate(title, description, price, thumbnail, code, stock, category);
        const productCreated = await ProductModel.create({title, description, price, thumbnail, code, stock, category});
        return productCreated;
    }

    async deleteOne(_id){
        const deleted = await ProductModel.deleteOne({_id});
        if (deleted.deletedCount === 1) {
            return true;
        } else {
            throw new Error("Product not found");
        }
    }

    async updateOne(id, title, description, price, thumbnail, code, stock, category){
            this.validate(title, description, price, thumbnail, code, stock, category);
            const productUptaded = await ProductModel.updateOne({ _id: id }, {title, description, price, thumbnail, code, stock, category});
            return productUptaded;
    }
}
