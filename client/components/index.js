/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Main } from './main';
export { default as UserHome } from './user-home';
export { Login, Signup } from './auth-form';
export { AllProducts } from './AllProducts';
export { About } from './About';
export { Careers } from './Careers';
export { ContactUs } from './ContactUs';
export { FAQs } from './FAQs';
export { Orders } from './Orders';
export { AccountInfo } from './AccountInfo';
export { Cart } from './Cart';
export { SingleReview } from './SingleReview';
export { ThankYou } from './ThankYou';
