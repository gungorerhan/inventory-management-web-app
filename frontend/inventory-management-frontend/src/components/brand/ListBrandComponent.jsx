import React, { Component } from 'react'
import BrandService from '../../services/BrandService';
import '../../styles/list.css'

export default class ListBrandsComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            brands: []
        }

        this.addBrand = this.addBrand.bind(this);
        this.updateBrand = this.updateBrand.bind(this);
        this.deleteBrand = this.deleteBrand.bind(this);
    }

    componentDidMount(){
        BrandService.getBrands().then((response) => {
            this.setState({brands: response.data})
        });
    }

    // event handlers
    addBrand(){
        this.props.history.push("/add-brand/new");
    }

    updateBrand(id){
        this.props.history.push(`/add-brand/${id}`);
    }

    // TODO check delete successful, show error if necessary
    deleteBrand(id){
        if (window.confirm('Silmek istediğinize emin misiniz?')) {
            // Delete from db
            BrandService.deleteBrand(id).then((response) => {
                if (response.status === 200){
                    this.setState({brands: this.state.brands.filter(brand => brand.id !== id)});
                    window.alert("Silme işlemi başarılı!");
                }
            });
          } else {
            // Do nothing!
          }   
    }

    render() {
        return (
            <div>
                <div className="title-add-btn">
                    <h2 className="text-center title">Marka Listesi</h2>
                    <button className="btn btn-info btn-add" onClick={ () => this.addBrand() }>Ekle</button>
                </div>
     
                <div className="row">
                    <table className="table table-sm table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Adı</th>
                                <th scope="col">Açıklama</th>
                                <th scope="col">Eylemler</th>
                            </tr>
                        </thead>

                        <tbody>
                            {   
                                this.state.brands.map(
                                    (brand, count) =>
                                    <tr key = {brand.id}>
                                        <th className="count-col" scope="row">{count+1}</th>
                                        <td className="name-col">{brand.name}</td>
                                        <td className="desc-col">{brand.description}</td>

                                        <td className="buttons">
                                            <button className="btn btn-info" onClick={ () => this.updateBrand(brand.id) }>Güncelle</button>
                                            <button className="btn btn-danger" onClick={ () => this.deleteBrand(brand.id) }>Sil</button>
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
