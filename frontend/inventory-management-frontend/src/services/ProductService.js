import axios from 'axios';

const PRODUCT_API_BASE_URL = "http://localhost:8080/api/v1/products";

class ProductService {
    //http://localhost:8080/api/v1/products/?searchWord=asd&pageNumber=1
    getProducts(searchWord, pageNumber){
        return axios.get(PRODUCT_API_BASE_URL + "/?searchWord=" + searchWord + "&/pageNumber=" + pageNumber);
    }

    addProduct(product){
        return axios.post(PRODUCT_API_BASE_URL, product);
    }

    getProductById(productId){
        return axios.get(PRODUCT_API_BASE_URL + "/" + productId);
    }

    updateProduct(product, productId){
        return axios.put(PRODUCT_API_BASE_URL + "/" + productId, product);
    }

    deleteProduct(productId){
        return axios.delete(PRODUCT_API_BASE_URL + "/" + productId);
    }
}

export default new ProductService();