import React, { Component } from 'react'
import CategoryService from '../../services/CategoryService';
import '../../styles/list.css'

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

    addCategory(){
        this.props.history.push('/add-category/new');
    }

    updateCategory(id){
        this.props.history.push(`/add-category/${id}`);
    }

    // TODO add tier-2 control (e.g dialog-box)
    deleteCategory(id){
        if (window.confirm('Silmek istediğinize emin misiniz?')) {
            // Delete from db
            CategoryService.deleteCategory(id).then((response) => {
                if (response.status === 200){
                    this.setState({categories: this.state.categories.filter(category => category.id !== id)});
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
                    <h2 className="text-center title">Kategori Listesi</h2>
                    <button className="btn btn-info btn-add" onClick={ () => this.addCategory() }>Ekle</button>
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
                                this.state.categories.map(
                                    (category, count) =>
                                    <tr key = {category.id}>
                                        <th className="count-col" scope="row">{count+1}</th>
                                        <td className="name-col">{category.name}</td>
                                        <td className="desc-col" >{category.description}</td>

                                        <td className="buttons">
                                            <button className="btn btn-info" onClick={ () => this.updateCategory(category.id) }>Güncelle</button>
                                            <button className="btn btn-danger" onClick={ () => this.deleteCategory(category.id) }>Sil</button>
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
