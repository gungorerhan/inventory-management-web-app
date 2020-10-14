import React, { Component } from 'react'

export default class ListProductsComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            
        }
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
                            <tr>
                                <th scope="row">1</th>
                                <td>Kart adı</td>
                                <td>Kart Kategori</td>
                                <td>Kart Marka</td>
                                <td>Kart Konum</td>
                                <td>Kart Fiyat</td>
                                <td>Kart Adet</td>
                                <td>Kart Açıklama</td>
                                <td>Kart Eylemler</td>
                            </tr>

                            <tr>
                                <th scope="row">2</th>
                                <td>Kart adı</td>
                                <td>Kart Kategori</td>
                                <td>Kart Marka</td>
                                <td>Kart Konum</td>
                                <td>Kart Fiyat</td>
                                <td>Kart Adet</td>
                                <td>Kart Açıklama</td>
                                <td>Kart Eylemler</td>
                            </tr>

                            <tr>
                                <th scope="row">3</th>
                                <td>Kart adı</td>
                                <td>Kart Kategori</td>
                                <td>Kart Marka</td>
                                <td>Kart Konum</td>
                                <td>Kart Fiyat</td>
                                <td>Kart Adet</td>
                                <td>Kart Açıklama</td>
                                <td>Kart Eylemler</td>
                            </tr>
                        </tbody>
                    </table>
                </div>


            </div>
        )
    }
}
