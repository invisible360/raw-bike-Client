import './App.css';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/Routes';
function App() {
  return (
    <div className='max-w-screen-xl	mx-auto'>
      <RouterProvider router={routes}></RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
