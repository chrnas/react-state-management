import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";

export function MainPage() {
  
    const { setUser } = useUserStore();
    const { isAuthenticated, setAuthenticated } = useAuthStore();

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
            setUser(null); // Reset user on error
        });
    }, []);

    const navigate = useNavigate();

    function handleAuthenticate() {
        setAuthenticated(true);
    }

    function handleNavigate() {
        if (isAuthenticated) {
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