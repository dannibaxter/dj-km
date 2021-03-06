const crypto = require('crypto');
const faker = require('faker');

const db = require('APP/db')

const seedUsers = () => db.Promise.map([
 {name: 'Alec Baldwin', admin: false, email: 'god@example.com', password: '1234'},
 {name: 'Barack Obama', admin: true, email: 'barack@example.gov', password: '1234'},
], user => db.model('users').create(user));

const fakeProducts = [];
// NYC
for(let i=0; i<20; i++) {
  fakeProducts[i] = {
    artistName: faker.name.findName(),
    description: faker.commerce.productName(),
    price: faker.commerce.price(),
    genre: i%2===0 ? 'FUNK': 'RAP',
    email: faker.internet.email(),
    location: 'NYC',
    image: faker.image.people(),
    quantity: faker.random.number()%100
  }
}

// SF
for(let i=20; i<40; i++) {
  fakeProducts[i] = {
    artistName: faker.name.findName(),
    description: faker.commerce.productName(),
    price: faker.commerce.price(),
    genre: i%2===0 ? 'FUNK': 'RAP',
    email: faker.internet.email(),
    location: 'San Francisco',
    image: faker.image.people(),
    quantity: faker.random.number()%100
  }
}

const seedProducts = () => db.Promise.map(fakeProducts, product => db.model('products').create(product));
// const seedProducts = () => db.Promise.map([
//   {artistName: 'DJ GET MONEY$', description: 'A HOT DJ WITH MONEY', price: '100.00',genre:'FUNK',email:'email@money.com', location:'NYC', quantity:1},
//   {artistName: 'Big Boi', description: 'Fat jams all day', price: '104.00',genre:'RAP',email:'bigboi@money.com', location:'NYC', quantity:1}
// ], product => db.model('products').create(product));

const seedReviews = () => db.Promise.map([
  {text: 'This DJ had great jams!', rating: '5', product_id: '1', user_id: '1'},
  {text: 'He was really rude!', rating: '1', product_id: '2', user_id: '1'},
  {text: 'Amazing vibes all night!', rating: '5', product_id: '3', user_id: '1'},
  {text: 'He was so polite and professional.', rating: '4', product_id: '1', user_id: '2'},
  {text: 'Great for kids.', rating: '3', product_id: '5', user_id: '2'},
  {text: 'Not the best.', rating: '1', product_id: '6', user_id: '2'}
], review => db.model('reviews').create(review));


const seedOrderProduct = () => db.Promise.map([
  {order_id: '1', product_id: '1'},
  {order_id: '1', product_id: '2'}
], entry => db.model('order_products').create(entry));


const seedOrders = () => db.Promise.map([
  {orderNumber: crypto.randomBytes(5).toString('hex').toUpperCase(),
  user_id: '1',
  deliveryAddress: "Times Square"
}
], order => db.model('orders').create(order));


db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(seedProducts)
  .then(products => console.log(`Seeded ${products.length} products OK`))
  .then(seedReviews)
  .then(reviews => console.log(`Seeded ${reviews.length} reviews OK`))
  .then(seedOrders)
  .then(orders => console.log(`Seeded ${orders.length} orders OK`))
  .then(seedOrderProduct)
  .then(entries => console.log(`Seeded ${entries.length} entries OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
