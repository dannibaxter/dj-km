import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import SearchFilter from './SearchFilter';

class ProductsHome extends React.Component {
  constructor(){
    super();
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
  }

   addToCart(event,obj){
    event.preventDefault();
    this.props.addToCart_func(obj)
  }

  render() {
    let prod = this.props.products;

    return(
      <div>
        <h1>Welcome to DJKM!</h1>
        <strong><p>Hire a DJ (or <a href="/addProduct">Become a DJ</a>)</p></strong>
        <div className="well well-sm">
          <SearchFilter />
        </div>
        <div className="row">
        {
          prod.products && prod.products.length>0 && prod.products.map((curr, i) => {
            return i<this.props.currIndex ? (
              <div key={i}>
                <div className="col-md-4">

                    <Link
                      onClick={()=>this.props.selectProduct(curr)}
                      to={`/products/${curr.id}`}
                      >
                      <h4>{curr.artistName}</h4>
                    </Link>

                    <div className="thumbnail">

                      <Link
                        onClick={()=>this.props.selectProduct(curr)}
                        to={`/products/${curr.id}`}
                        >
                        <img src={curr.image==='' ? '/default.png' : curr.image} />
                      </Link>

                      <div className="caption">
                        <h4>{curr.artistName}</h4>
                        <p>{curr.description}</p>
                        <div className="row">
                          <div className="col-md-6">
                              <p>$ {curr.price}</p>
                          </div>
                          <div className="col-md-6">
                              <a className="btn btn-success" href="" onClick={(event)=>this.addToCart(event, curr)}>Add to cart</a>
                          </div>
                        </div>
                      </div>

                    </div>

                </div>
              </div>
            ) : null
          })
        }
      </div>

      <div className="text-center">
        {
          this.props.currIndex < prod.products.length ?
          <Link onClick={(event) => this.props.loadMore(event)}
            className="btn btn-default btn-sm"
            href=""
            >
            Load More...
          </Link>
          :
          null
        }
      </div>
    </div>
    );
  }
}

export default ProductsHome;
