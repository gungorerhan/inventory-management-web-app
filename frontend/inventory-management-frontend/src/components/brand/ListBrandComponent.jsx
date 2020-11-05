import React, { Component } from 'react'
import BrandService from '../../services/BrandService';

export default class ListBrandsComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            brands: []
        }

        this.updateBrand = this.updateBrand.bind(this);
        this.deleteBrand = this.deleteBrand.bind(this);
    }

    componentDidMount(){
        BrandService.getBrands().then((response) => {
            this.setState({brands: response.data})
        });
    }

    // event handlers
    updateBrand(id){
        this.props.history.push(`/add-brand/${id}`);
    }

    // TODO add tier-2 control (e.g dialog-box)
    // TODO check delete successful, show error if necessary
    deleteBrand(id){
        BrandService.deleteBrand(id).then((response) => {
            this.setState({brands: this.state.brands.filter(brand => brand.id !== id)});
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Marka Listesi</h2>
     
                <div className="row">
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Adı</th>
                                <th scope="col">Açıklama</th>
                                <th scope="col">Son Güncelleme</th>
                                <th scope="col">Eylemler</th>
                            </tr>
                        </thead>

                        <tbody>
                            {   
                                this.state.brands.map(
                                    (brand, count) =>
                                    <tr key = {brand.id}>
                                        <th scope="row">{count+1}</th>
                                        <td>{brand.name}</td>
                                        <td>{brand.description}</td>
                                        <td>Marka Son Güncelleme</td>

                                        <td>
                                            <button style={{marginLeft: "10px"}} className="btn btn-info" onClick={ () => this.updateBrand(brand.id)}>Güncelle</button>
                                            <button style={{marginLeft: "10px"}} className="btn btn-danger" onClick={ () => this.deleteBrand(brand.id)}>Sil</button>
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
