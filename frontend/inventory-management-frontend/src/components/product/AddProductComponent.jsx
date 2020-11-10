import React, { Component } from 'react'
import CategoryService from '../../services/CategoryService';
import BrandService from '../../services/BrandService';
import ProductService from '../../services/ProductService';

class AddProductComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            // product info
            id: this.props.match.params.id,
            name: '',
            category: {},
            brand: {},
            location: '',
            price: '',
            quantity: '',
            description: '',

            // for dropdown menus
            categories: [],
            brands: []
        }

        // field change handlers
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeCategoryHandler = this.changeCategoryHandler.bind(this);
        this.changeBrandHandler = this.changeBrandHandler.bind(this);
        this.changeLocationHandler = this.changeLocationHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changeQuantityHandler = this.changeQuantityHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);

        // button handlers
        this.saveProduct = this.saveProduct.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount(){
        // get all categories and update the state
        CategoryService.getCategories().then((response) => {
            this.setState({categories: response.data});
        });

        // get all brands and update the state
        BrandService.getBrands().then((response) => {
            this.setState({brands: response.data})
        });

        if (this.state.id === 'new'){
            this.setState({
                category: this.state.categories[0],
                brand: this.state.brands[0]
            })
            return;
        }else{
            ProductService.getProductById(this.state.id).then((response) => {
                let product = response.data;
                this.setState({
                    name: product.name,
                    category: product.category,
                    brand: product.brand,
                    location: product.location,
                    price: product.price,
                    quantity: product.quantity,
                    description: product.description
                })
            });
        }

    }

    getTitle(){
        if(this.state.id === 'new'){
            return <h3 className="text-center">Ürün Ekle</h3>;
        }else{
            return <h3 className="text-center">Ürün Güncelle</h3>
        }
    }

    // event handlers
    changeNameHandler = (event) => {
        this.setState({name: event.target.value});
    }

   changeCategoryHandler = (event) => {
        if (event.target.value !== ''){
            const category = JSON.parse(event.target.value);
            this.setState({
                category: category
            });
            
        }
    }

    changeBrandHandler = (event) => {
        if (event.target.value !== ''){
            const brand = JSON.parse(event.target.value);
            this.setState({
                brand: brand
            });
        }
    }

    changeLocationHandler = (event) => {
        this.setState({location: event.target.value});
    }

    changePriceHandler = (event) => {
        this.setState({price: event.target.value});
    }

    changeQuantityHandler = (event) => {
        this.setState({quantity: event.target.value});
    }

    changeDescriptionHandler = (event) => {
        this.setState({description: event.target.value});
    }

    // TODO add loading animation for save button event, show info added or not
    saveProduct = (event) => {
        event.preventDefault();

        // get data from the state
        let product = {
            name: this.state.name,
            category: this.state.category,
            brand: this.state.brand,
            location: this.state.location,
            price: this.state.price,
            quantity: this.state.quantity,
            description: this.state.description
        }

        // add product
        if (this.state.id === 'new'){
            ProductService.addProduct(product).then((response) => {
                // TODO show succes message on screen
                if (response.status === 200){
                    window.location.reload();
                }else{ // TODO if new product add fails, show error message
                    console.log("Product add failed with error code: ", response.status);
                }
            });
        }else{  // update product
            ProductService.updateProduct(product, this.state.id).then((response) => {
                // TODO show succes message on screen
                if (response.status === 200){
                    this.props.history.push('/products');
                }else{ // TODO if new product update fails, show error message
                    console.log("Product update failed with error code: ", response.status);
                }
            });
        }
    }

    cancel = (event) => {
        this.props.history.push('/products');
    }

    render() {
        if (!this.state.id & this.state.name === ''){
            return <div></div>
        }

        return (
            <div>  
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3">
                            {this.getTitle()}
                            <div className="card-body">
                                <form onSubmit={this.saveProduct} >
                               
                                    <div className="form-group">
                                        <label>Adı: </label>
                                        <input className="form-control" placeholder="Ürün adı" name="name" type="text" required
                                            value={this.state.name} onChange={this.changeNameHandler}/>
                                    </div>

                                    <div className="form-group">
                                        <label>Kategori: </label>
                                        <select className="form-control"
                                        value={JSON.stringify(this.state.category)} onChange={this.changeCategoryHandler}>
                                            <option>.....</option>
                                            {
                                                this.state.categories.map(category =>
                                                    <option
                                                        key={category.id}
                                                        name={category.id}
                                                        value={JSON.stringify(category)}>
                                                        {category.name}
                                                    </option>
                                            )}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Marka: </label>
                                        <select className="form-control" value={JSON.stringify(this.state.brand)}
                                            onChange={this.changeBrandHandler} name="brand" >
                                            <option>.....</option>
                                            {
                                                this.state.brands.map(brand=>
                                                    <option
                                                        key={brand.id}
                                                        name={brand.id}
                                                        value={JSON.stringify(brand)}>
                                                        {brand.name}
                                                    </option>
                                                )
                                            }
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Konum: </label>
                                        <input className="form-control" placeholder="Konum" name="location" type="text" required
                                            value={this.state.location} onChange={this.changeLocationHandler}/>
                                    </div>

                                    <div className="form-group">
                                        <label>Fiyat: </label>
                                        <input type="number" className="form-control" placeholder="Fiyat" name="price"
                                            value={this.state.price} onChange={this.changePriceHandler}/>
                                    </div>

                                    <div className="form-group">
                                        <label>Adet: </label>
                                        <input className="form-control" placeholder="Adet" name="quantity" type="number" required
                                            value={this.state.quantity} onChange={this.changeQuantityHandler}/>
                                    </div>
           
                                    <div className="form-group">
                                        <label>Açıklama: </label>
                                        <input className="form-control" placeholder="Açıklama" name="description"
                                            value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                    </div>

                                    <input className="btn btn-success" type="submit" value="Kaydet"></input>  
                                    <button className="btn btn-danger" onClick={this.cancel} style={{marginLeft: "10px"}}>İptal</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddProductComponent