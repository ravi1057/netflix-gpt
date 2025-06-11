import { Provider } from 'react-redux';
import Body from './components/Body';
import appStore from './utils/appStore';

/**
 * The root component of the application.
 *
 * Responsibilities:
 * - Sets up the Redux Provider, making the Redux store (`appStore`) available to all descendant components.
 * - Renders the main layout structure of the application, primarily through the `Body` component.
 *
 * This component does not accept any direct props.
 */
function App() {
  return (
       <Provider store={appStore}>
            <Body/>
       </Provider> 
  
  );
}

export default App;
