import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../state-management/hooks/useAuthStore";
import { useUserStore } from "../state-management/hooks/useUserStore";

export function MainPage() {

    const [auth, setAuthenticated] = useAuthStore();
    const [, setUser, clearUser] = useUserStore();

    useEffect(() => {
        fetch("http://localhost:4000/users/1").then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch user: ${response.status} ${response.statusText}`);
            }
            return response.json();
        }
        ).then(user => {
            console.log('Fetched user:', user);
            setUser(user);
        }).catch((error: Error | any) => {
            console.log('Unknown error occurred, message:', error.message);
            clearUser(); // Reset user on error
        });
    }, []);

    const navigate = useNavigate();

    function handleAuthenticate() {
        setAuthenticated(true);
        console.log('User authenticated');
    }

    function handleNavigate() {
        if (auth) {
            navigate('/profile');
        }
    }

    return (
    <div>
      <h1>Main Page</h1>
      <div>Here the user is retrieved and set on load with useEffect.</div>
      <button onClick={handleAuthenticate}>Authenticate</button>
      <button onClick ={handleNavigate}>Navigate to Profile page to see global state used</button>
    </div>
  );
}