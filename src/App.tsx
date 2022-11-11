import RoutesApp from './routes/Routes';
import './App.css';
import 'antd/dist/antd.css';
import { UserContext } from './contexts/UserContext';
import { useState } from 'react';


function App() {
  const [user, setUser] = useState({ nome: 'Paulo', email: 'tete@gmail.com', autorizado: true })
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RoutesApp />
    </UserContext.Provider>
  );
}

export default App;
