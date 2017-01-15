import React from 'react'
import ProductsHomeContainer from '../containers/ProductsHomeContainer.jsx';
import NavBarContainer from '../containers/NavBarContainer';
import SearchFilter from './SearchFilter';
import { Link } from 'react-router';

const App = (props)=>{
  console.log("props in app",props)
  return(
    <div>
      <NavBarContainer />
      <SearchFilter />
      <Link to="/product">Click here for demo product detail page</Link>
        {
            props.children && React.cloneElement(props.children, props)
        }
    </div>
  );
}

export default App;
