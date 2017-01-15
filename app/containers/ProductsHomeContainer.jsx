import React from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../reducers/productsHome.jsx';
import ProductsHome from '../components/ProductsHome.jsx';

function mapStateToProps (state) {
  return {
    products: state.products
  };
};

function mapDispatchToProps (dispatch) {
  return {
    receiveProducts () {
      dispatch(getProducts());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsHome);

// (class extends Component {
//
//   constructor (props) {
//     super(props);
//     this.state = { artistQuery: '', songQuery: '' };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//
//   handleChange (type, value) {
//     this.setState({ [`${type}Query`]: value });
//   }
//
//   handleSubmit (evt) {
//     evt.preventDefault();
//     if (this.state.artistQuery && this.state.songQuery)
//       this.props.searchLyrics(this.state)
//   }
//
//   render () {
//     return (
//       <Lyrics
//         {...this.state}
//         {...this.props}
//         handleChange={this.handleChange}
//         handleSubmit={this.handleSubmit}
//       />
//     );
//   }
// });