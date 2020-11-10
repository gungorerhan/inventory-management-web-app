import React, { Component } from 'react'
import ProductService from '../../services/ProductService';
import '../../styles/list.css';
import Pagination from './Pagination';

export default class ListProductsComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            // table data
            products: [],

            // query db
            searchWord: '',

            // pagination
            pageNumber: 0,
            pageSize: 10,
            pageCount: 10,

            // waiting for data?
            loading: true
        }

        this.updateProduct = this.updateProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.changeSearchWordHandler = this.changeSearchWordHandler.bind(this);
        this.searchProduct = this.searchProduct.bind(this);
        this.paginate = this.paginate.bind(this);
    }

    componentDidMount(){
        ProductService.getProducts(this.state.searchWord, this.state.pageNumber, this.state.pageSize).then((response) => {
            this.setState({products: response.data.content, pageCount: response.data.totalPages, loading:false});
        });
    }

    componentDidUpdate(){
        if (this.state.loading){
            ProductService.getProducts(this.state.searchWord, this.state.pageNumber, this.state.pageSize).then((response) => {
                this.setState({products: response.data.content, pageCount: response.data.totalPages, loading: false});
            });
        }
    }

    // event handlers
    updateProduct(id){
        this.props.history.push(`/add-product/${id}`);
    }

    // TODO add tier-2 control (e.g dialog-box)
    // TODO check delete successful, show error if necessary
    deleteProduct(id){
        ProductService.deleteProduct(id).then((response) => {
            if (response.status === 200){
                this.setState({loading: true});
            }
        });
    }

    changeSearchWordHandler = (event) => {
        this.setState({searchWord: event.target.value});
    }

    searchProduct(){
        this.setState({loading: true});
    }

    paginate(pageNumber){
        this.setState({pageNumber: pageNumber, loading: true});
    }

    render() {
        // add loading animation here !!
        if (this.state.loading) {
            return <h2>Loading</h2>
        }

        return (
            <div>
                <h2 className="text-center">Ürün Listesi</h2>

                <div className="search-bar md-form mb-3 input-group">
                    <input className="form-control" type="text" placeholder="Ara" aria-label="Ara"
                        value={this.state.searchWord} onChange={this.changeSearchWordHandler} />
                    <div className="input-group-btn">
                        <button className="btn btn-info" onClick={ () => this.searchProduct() }>Ara</button>
                    </div>
                    
                </div>

                <div className="row">
                    <table className="table table-hover table-bordered table-products table-sm">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Ürün Adı</th>
                                <th scope="col">Kategori</th>
                                <th scope="col">Marka</th>
                                <th scope="col">Konum</th>
                                <th scope="col">Fiyat</th>
                                <th scope="col">Adet</th>
                                <th scope="col">Açıklama</th>
                                <th scope="col">Eylemler</th>
                            </tr>
                        </thead>

                        <tbody>
                            {   
                                this.state.products.map(
                                    (product, count) =>
                                    <tr className="table-row" key = {product.id}>
                                        <th className="count-col" scope="row">{count+1}</th>
                                        <td className="name-col">{product.name}</td>
                                        {product.category ? (<td className="category-col">{product.category.name}</td>):(<td className="category-col"></td>)}
                                        {product.brand ? (<td className="brand-col">{product.brand.name}</td>):(<td className="brand-col"></td>)}
                                        <td className="location-col">{product.location}</td>
                                        <td className="price-col">{product.price}</td>
                                        <td className="quantity-col">{product.quantity}</td>
                                        <td className="desc-col">{product.description}</td>

                                        <td className="buttons">
                                            <button className="btn btn-info" onClick={ () => this.updateProduct(product.id) }>Güncelle</button>
                                            <button className="btn btn-danger" onClick={ () => this.deleteProduct(product.id) }>Sil</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                
                <div id="pagination">
                    <Pagination pageNumber={this.state.pageNumber} pageCount={this.state.pageCount} paginate={this.paginate}/>
                </div>

            </div>
        )
    }
}
