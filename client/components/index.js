/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
// TODO: alphabetize? (is there an extension for this?)
export { default as Main } from './main';
export { default as UserHome } from './user-home';
export { Login, Signup } from './auth-form';
export { default as AllProducts } from './AllProducts';
export { default as SingleProduct } from './SingleProduct';
export { default as About } from './About';
export { default as Careers } from './Careers';
export { default as ContactUs } from './ContactUs';
export { default as FAQs } from './FAQs';
export { default as Orders } from './Orders';
export { default as MyAccount } from './MyAccount';
export { default as Cart } from './Cart';
export { default as SingleReview } from './SingleReview';
export { default as ThankYou } from './ThankYou';
export { default as AddReviewForm } from './AddReviewForm';
export { default as SingleOrder } from './SingleOrder';
export { default as Users } from './Users';
export { default as SingleUser } from './SingleUser';
export { default as AddProductForm } from './AddProductForm';
