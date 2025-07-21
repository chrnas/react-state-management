// src/App.tsx
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useUserStore } from "./stores/userStore";
import type { User } from "./models/userModel";
import { MainPage } from "./pages/MainPage";
import { ProfilePage } from "./pages/ProfilePage";

export default function App() {

  const BASE_URL = 'http://localhost:4000/users';
  const { setUser } = useUserStore();

  useEffect(() => {
    fetchUserById(1);
  }, []);

  function fetchUserById(id: number) {
    fetch(`${BASE_URL}/${id.toString()}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch user: ${response.status} ${response.statusText}`)
        }
          const user: User | any =  response.json()
          console.log('Fetched user:', user);
          setUser(user);
          return user;
      })
      .catch((error: Error | any) => {
        console.log('Unknown error occurred, message:', error.message);
        setUser(null); // Reset user on error
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
