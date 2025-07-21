// src/App.tsx
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Removed unused import: import type { User } from "./models/userModel";
import { MainPage } from "./pages/MainPage";
import { ProfilePage } from "./pages/ProfilePage";
import { useAuthStore } from "./state-management/hooks/useAuthStore";
import { useUserStore } from "./state-management/hooks/useUserStore";

export default function App() {

  const BASE_URL = 'http://localhost:4000/users';
  const [, setAuthenticated ] = useAuthStore();
  const [, setUser, clearUser ] = useUserStore();

  useEffect(() => {
    setAuthenticated(false);
    fetchUserById(1);
  }, []);

  function fetchUserById(id: number) {
    fetch(`${BASE_URL}/${id.toString()}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch user: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(userData => {
        console.log('Fetched user:', userData);
        setUser(userData);
        return userData;
      })
      .catch((error: Error | any) => {
        console.log('Unknown error occurred, message:', error.message);
        clearUser(); // Reset user on error
        return null;
      });
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
  );
}
