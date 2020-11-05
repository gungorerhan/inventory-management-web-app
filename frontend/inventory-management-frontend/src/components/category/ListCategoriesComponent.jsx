import React, { Component } from 'react'
import CategoryService from '../../services/CategoryService';

export default class ListCategoriesComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            categories: []
        }

        this.updateCategory = this.updateCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    componentDidMount(){
        CategoryService.getCategories().then((response) => {
            this.setState({categories: response.data})
        });
    }

    // event handlers
    updateCategory(id){
        this.props.history.push(`/add-category/${id}`);
    }

    // TODO add tier-2 control (e.g dialog-box)
    deleteCategory(id){
        CategoryService.deleteCategory(id).then((response) => {
            this.setState({categories: this.state.categories.filter(category => category.id !== id)});
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Kategori Listesi</h2>
     
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
                                this.state.categories.map(
                                    (category, count) =>
                                    <tr key = {category.id}>
                                        <th scope="row">{count+1}</th>
                                        <td>{category.name}</td>
                                        <td>{category.description}</td>
                                        <td>Kategori Son Güncelleme</td>

                                        <td>
                                            <button style={{marginLeft: "10px"}} className="btn btn-info" onClick={ () => this.updateCategory(category.id)}>Güncelle</button>
                                            <button style={{marginLeft: "10px"}} className="btn btn-danger" onClick={ () => this.deleteCategory(category.id)}>Sil</button>
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
