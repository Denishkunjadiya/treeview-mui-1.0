import './App.css';
import TreeViewReact from './pages/treeView';
import dataReducer from './reducer/dataReducer'
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';

const store = createStore(dataReducer);

function App() {
  return (
    <Provider store={store}>
      <TreeViewReact />
    </Provider>
  );
}

export default App;
