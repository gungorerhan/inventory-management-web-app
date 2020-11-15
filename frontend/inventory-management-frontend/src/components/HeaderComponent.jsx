import React, { Component } from 'react'

class HeaderComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div>
               <header>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="http://www.rufielektronik.com">Rufi Elektronik</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="/products">Ürün</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/categories">Kategori</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/brands">Marka</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Admin Girişi</a>
                            </li>
                            </ul>
                        </div>
                    </nav>
               </header>
            </div>
        )
    }
}

export default HeaderComponent