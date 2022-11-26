import './App.css';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes/Routes';

function App() {
  return (
    <div className='max-w-screen-xl	mx-auto'>
      <RouterProvider router={routes} className="">
        <h1>Development Start</h1>
        <Toaster />
      </RouterProvider>
    </div>
  );
}

export default App;
