import axios from 'axios';

//const PRODUCT_API_BASE_URL = "http://localhost/api/v1/products";
const PRODUCT_API_BASE_URL = "http://192.168.1.45:8080/api/v1/products";

class ProductService {

    getProducts(searchWord, pageNumber, pageSize){
        return axios.get(PRODUCT_API_BASE_URL + "/?searchWord=" + searchWord + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize);
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