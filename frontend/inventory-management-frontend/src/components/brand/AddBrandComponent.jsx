import React, { Component } from 'react'
import BrandService from '../../services/BrandService'

export default class AddBrandComponent extends Component {

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
        this.saveBrand = this.saveBrand.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount(){
        if (this.state.id === 'new'){
            return
        }else{
            BrandService.getBrandById(this.state.id).then((response) => {
                let brand = response.data;
                this.setState({name: brand.name,
                    description: brand.description});
            });
        }
    }

    getTitle(){
        if(this.state.id === 'new'){
            return <h3 className="text-center">Marka Ekle</h3>;
        }else{
            return <h3 className="text-center">Marka Güncelle</h3>
        }
    }

    // event handlers
    changeNameHandler = (event) => {
        this.setState({name: event.target.value});
    }

    changeDescriptionHandler = (event) => {
        this.setState({description: event.target.value});
    }

    // TODO add loading animation for save button event show info added or not
    saveBrand = (event) => {
        event.preventDefault();

        // get data from the state
        let brand = {name: this.state.name,
            description: this.state.description};

        if(this.state.id === 'new'){
            BrandService.addBrand(brand).then((response) => {
                // if new brand successfuly added, show success message and clear state
                if(response.status === 200){
                    window.alert("Ekleme işlemi başarılı")
                    this.props.history.push('/brands');
                }else{  // TODO if new brand add fails, show error message
                    console.log("Brand add failed with error code: ", response.status);
                }
                
            });
        }else{
            BrandService.updateBrand(brand, this.state.id).then((response) => {
                // if brand updated successfuly, show success message and return to brand list
                if(response.status === 200){
                    window.alert("Güncelleme işlemi başarılı")
                    this.props.history.push('/brands');
                }else{  // TODO if new brand add fails, show error message
                    console.log("Brand add failed with error code: ", response.status);
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
                                <form onSubmit={this.saveBrand}>
                               
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

                                    <input type="submit" className="btn btn-success" value="Kaydet"></input>
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
