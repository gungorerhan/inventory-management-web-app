import React, { Component } from 'react'
import CategoryService from '../../services/CategoryService'

export default class AddCategoryComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            description: ''
        }

        // field change handlers
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);

        // button handlers
        this.saveCategory = this.saveCategory.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount(){
        if (this.state.id === 'new'){
            return
        }else{
            CategoryService.getCategoryById(this.state.id).then((response) => {
                let category = response.data;
                this.setState({name: category.name,
                    description: category.description});
            });
        }
    }

    getTitle(){
        if(this.state.id === 'new'){
            return <h3 className="text-center">Kategori Ekle</h3>;
        }else{
            return <h3 className="text-center">Kategori Güncelle</h3>
        }
    }

    clearState(){
        this.setState({name: '', description: ''});
    }

    // event handlers
    changeNameHandler = (event) => {
        this.setState({name: event.target.value});
    }

    changeDescriptionHandler = (event) => {
        this.setState({description: event.target.value});
    }

    // TODO add loading animation for save button event
    saveCategory = (event) => {
        event.preventDefault();

        // get data from the state
        let category = {name: this.state.name,
            description: this.state.description};

        if(this.state.id === 'new'){
            CategoryService.addCategory(category).then((response) => {
                // if new category successfuly added, show success message and clear state
                if(response.status === 200){
                    this.clearState();
                }else{  // TODO if new category add fails, show error message
                    console.log("Category add failed with error code: ", response.status);
                }
                
            });
        }else{
            CategoryService.updateCategory(category, this.state.id).then((response) => {
                // if category updated successfuly, show success message and return to category list
                if(response.status === 200){
                    this.props.history.push('/categories');
                }else{  // TODO if new category add fails, show error message
                    console.log("Category add failed with error code: ", response.status);
                }
            });
        }
    }

    cancel = (event) => {
        this.props.history.push('/categories');
    }

    render() {
        return (
            <div>  
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3">
                            {this.getTitle()}
                            <div className="card-body">
                                <form>
                               
                                    <div className="form-group">
                                        <label>Adı: </label>
                                        <input className="form-control" placeholder="Kategori adı" name="name"
                                            value={this.state.name} onChange={this.changeNameHandler}/>
                                    </div>

                                    <div className="form-group">
                                        <label>Açıklama: </label>
                                        <input className="form-control" placeholder="Açıklama" name="description"
                                            value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveCategory}>Kaydet</button>
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
