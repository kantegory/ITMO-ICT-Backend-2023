import ProductService from "~/services/products/Product";
import CrudController from "~/controllers/CrudController";

class ProductController extends CrudController {
    providerService = new ProductService();
    readonly name = "Product";
}

export default ProductController;
