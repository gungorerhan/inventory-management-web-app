import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ListProductsComponent from './components/ListProductsComponent';
import HomeComponent from './components/HomeComponent';
import ListCategoriesComponent from './components/ListCategoriesComponent';
import AddCategoryComponent from './components/AddCategoryComponent';

function App() {
  return (
    <div>
      <Router>
       
       <HeaderComponent/>

        <div className="container">
          <Switch>
            <Route path="/" exact component={HomeComponent}></Route>
            <Route path="/products" exact component={ListProductsComponent}></Route>

            <Route path="/categories" exact component={ListCategoriesComponent}></Route>
            <Route path="/add-category/:id" exact component={AddCategoryComponent}></Route>

          </Switch>
        </div>

        <FooterComponent/>
    
      </Router>
    </div>
  );
}

export default App;
