import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
  
    const handleLogout = async () => {
      await logout();
      navigate('/'); // Navigate to the login page after logging out
    };
  
    return (
      <Link to="/" onClick={handleLogout}>
        Log out
      </Link>
    );
  };
