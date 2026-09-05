import { UserProvider } from './context/UserContext';
import Home from './pages/Home';

export default function App() {
  return (
    <UserProvider>
      <Home />
    </UserProvider>
  );
}