import axios from 'axios';

//const CATEGORY_API_BASE_URL = "http://localhost:8080/api/v1/categories";
const CATEGORY_API_BASE_URL = "http://192.168.1.45:8080/api/v1/categories";

class CategoryService {

    getCategories(){
        return axios.get(CATEGORY_API_BASE_URL);
    }

    addCategory(category){
        return axios.post(CATEGORY_API_BASE_URL, category);
    }

    // TODO may be useless delete later
    getCategoryById(categoryId){
        return axios.get(CATEGORY_API_BASE_URL + "/" + categoryId);
    }

    updateCategory(category, categoryId){
        return axios.put(CATEGORY_API_BASE_URL + "/" + categoryId, category);
    }

    deleteCategory(categoryId){
        return axios.delete(CATEGORY_API_BASE_URL + "/" + categoryId);
    }
}

export default new CategoryService();