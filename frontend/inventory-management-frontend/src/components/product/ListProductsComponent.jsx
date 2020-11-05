import React, { Component } from 'react'
import ProductService from '../../services/ProductService';

export default class ListProductsComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            products: []
        }

        this.updateProduct = this.updateProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    componentDidMount(){
        ProductService.getProducts().then((response) => {
            this.setState({products: response.data, rowCount: 0})
        });
    }

    // event handlers
    updateProduct(id){
        this.props.history.push(`/add-product/${id}`);
    }

    // TODO add tier-2 control (e.g dialog-box)
    // TODO check delete successful, show error if necessary
    deleteProduct(id){
        ProductService.deleteProduct(id).then((response) => {
            this.setState({products: this.state.products.filter(product => product.id !== id)});
        })
    }



    render() {
        return (
            <div>
                <h2 className="text-center">Ürün Listesi</h2>
     
                <div className="row">
                    <table className="table table-striped table-bordered">
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
                                    <tr key = {product.id}>
                                        <th scope="row">{count+1}</th>
                                        <td>{product.name}</td>
                                        <td>{product.category.name}</td>
                                        <td>{product.brand.name}</td>
                                        <td>{product.location}</td>
                                        <td>{product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.description}</td>

                                        <td>
                                            <button style={{marginLeft: "10px"}} className="btn btn-info" onClick={ () => this.updateProduct(product.id)}>Güncelle</button>
                                            <button style={{marginLeft: "10px"}} className="btn btn-danger" onClick={ () => this.deleteProduct(product.id)}>Sil</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>


            </div>
        )
    }
}
