import createHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';

const history =
  process.env.NODE_ENV === 'test' ? createMemoryHistory() : createHistory();
if (history.location.hash === '#_=_') {
  history.replace(history.location.pathname + '?' + history.location.search);
}

export default history;
