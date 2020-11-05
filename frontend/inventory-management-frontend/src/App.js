import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import HomeComponent from './components/HomeComponent';

import ListProductsComponent from './components/product/ListProductsComponent';
import AddProductComponent from './components/product/AddProductComponent';

import ListCategoriesComponent from './components/category/ListCategoriesComponent';
import AddCategoryComponent from './components/category/AddCategoryComponent';

import ListBrandsComponent from './components/brand/ListBrandComponent';
import AddBrandComponent from './components/brand/AddBrandComponent';


function App() {
  return (
    <div>
      <Router>
       
       <HeaderComponent/>

        <div className="container">
          <Switch>
            <Route path="/" exact component={HomeComponent}></Route>
            
            <Route path="/products" exact component={ListProductsComponent}></Route>
            <Route path="/add-product/:id" exact component={AddProductComponent}></Route> 

            <Route path="/categories" exact component={ListCategoriesComponent}></Route>
            <Route path="/add-category/:id" exact component={AddCategoryComponent}></Route>

            <Route path="/brands" exact component={ListBrandsComponent}></Route>
            <Route path="/add-brand/:id" exact component={AddBrandComponent}></Route>
          </Switch>
        </div>

        <FooterComponent/>
    
      </Router>
    </div>
  );
}

export default App;
