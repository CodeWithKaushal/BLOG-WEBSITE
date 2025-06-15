import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { Spinner } from "flowbite-react";

export default function OnlyAdminPrivateRoute() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const [checkingPermission, setCheckingPermission] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [adminStatus, setAdminStatus] = useState(null);

  useEffect(() => {
    const verifyAdminStatus = async () => {
      setCheckingPermission(true);

      try {
        // If we have a currentUser and they're marked as admin in Redux store
        if (currentUser && currentUser.isAdmin) {
          // Optionally, we could verify with the backend here for extra security
          // const res = await fetch('/api/user/verify-admin');
          // const data = await res.json();
          // setHasPermission(res.ok && data.isAdmin);

          // For now, we'll just use the Redux state
          setHasPermission(true);
          setAdminStatus("granted");
        } else {
          setHasPermission(false);
          setAdminStatus(currentUser ? "denied" : "unauthenticated");
        }
      } catch (error) {
        console.error("Error verifying admin status:", error);
        setHasPermission(false);
        setAdminStatus("error");
      } finally {
        setCheckingPermission(false);
      }
    };

    verifyAdminStatus();
  }, [currentUser]);

  if (loading || checkingPermission) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <Spinner size="xl" className="mb-4" />
          <p className="text-gray-500 animate-pulse">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (adminStatus === "error") {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-red-500 mb-2">
            Authentication Error
          </h1>
          <p className="mb-4 text-gray-600">
            There was a problem verifying your credentials.
          </p>
          <a href="/sign-in" className="text-blue-500 hover:underline">
            Return to sign in
          </a>
        </div>
      </div>
    );
  }

  if (adminStatus === "denied") {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="text-yellow-500 text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold mb-2">Access Restricted</h1>
          <p className="mb-4 text-gray-600">
            You don't have permission to access this area.
          </p>
          <a href="/" className="text-blue-500 hover:underline">
            Return to homepage
          </a>
        </div>
      </div>
    );
  }

  return hasPermission ? <Outlet /> : <Navigate to="/sign-in" />;
}
