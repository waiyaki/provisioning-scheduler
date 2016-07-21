import rootDev from './Root.dev';
import rootProd from './Root.prod';

if (process.env.NODE_ENV !== 'production') {
  module.exports = rootDev;
} else {
  module.exports = rootProd;
}
