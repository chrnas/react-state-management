import { useUserStore } from "../state-management/hooks/useUserStore";

export function ProfilePage() {
    const [ user, setUser, clearUser ] = useUserStore();

    // Debug: Log the current user state
    console.log('ProfilePage - Current user from store:', user);

    if (!user) {
        return (
            <div>
                <h1>Profile Page</h1>
                <p>No user is currently logged in.</p>
                <p>Please login from the main page or another component.</p>
                <p><em>Debug: user value is {String(user)}</em></p>
            </div>
        );
    }

    return (
        <div>
            <h1>Profile Page</h1>
            <p>User profile information from global store:</p>
            <div>
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            <button onClick={() => clearUser()}>Logout</button>
        </div>
    );
}