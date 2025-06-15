import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Dropdown, Avatar, Badge, Toast } from "flowbite-react";
import {
  HiBell,
  HiX,
  HiCheck,
  HiOutlineUser,
  HiDocumentText,
  HiAnnotation,
  HiExclamation,
} from "react-icons/hi";
import { Link } from "react-router-dom";

export default function AdminNotifications() {
  const { currentUser } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!currentUser?.isAdmin) return;

      setIsLoading(true);

      try {
        // In a real app, you'd fetch from your API
        // Mock data for demonstration
        const mockNotifications = [
          {
            id: "1",
            type: "comment",
            message: "New comment needs approval",
            createdAt: new Date(Date.now() - 15 * 60000), // 15 mins ago
            read: false,
            link: "/dashboard?tab=comments",
          },
          {
            id: "2",
            type: "post",
            message: "New post was published by user567",
            createdAt: new Date(Date.now() - 60 * 60000), // 1 hour ago
            read: false,
            link: "/dashboard?tab=posts",
          },
          {
            id: "3",
            type: "user",
            message: "New user registered: example@example.com",
            createdAt: new Date(Date.now() - 3 * 60 * 60000), // 3 hours ago
            read: true,
            link: "/dashboard?tab=users",
          },
          {
            id: "4",
            type: "report",
            message: "Content was reported for violation",
            createdAt: new Date(Date.now() - 12 * 60 * 60000), // 12 hours ago
            read: true,
            link: "/dashboard?tab=moderation",
          },
        ];

        setNotifications(mockNotifications);
        const unread = mockNotifications.filter((n) => !n.read).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();

    // In a real app, you might set up a WebSocket or polling here
    const interval = setInterval(fetchNotifications, 60000); // Poll every minute

    return () => clearInterval(interval);
  }, [currentUser]);

  const markAsRead = (id) => {
    // In a real app, you'd call your API to update the notification status
    const updated = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updated);
    const unread = updated.filter((n) => !n.read).length;
    setUnreadCount(unread);

    setToastMessage("Notification marked as read");
    setShowToast(true);
  };

  const markAllAsRead = () => {
    // In a real app, you'd call your API to update all notifications
    const updated = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifications(updated);
    setUnreadCount(0);

    setToastMessage("All notifications marked as read");
    setShowToast(true);
  };

  const deleteNotification = (id) => {
    // In a real app, you'd call your API to delete the notification
    const updated = notifications.filter(
      (notification) => notification.id !== id
    );
    setNotifications(updated);
    const unread = updated.filter((n) => !n.read).length;
    setUnreadCount(unread);

    setToastMessage("Notification removed");
    setShowToast(true);
  };

  const getIcon = (type) => {
    switch (type) {
      case "user":
        return <HiOutlineUser className="text-blue-500" />;
      case "post":
        return <HiDocumentText className="text-green-500" />;
      case "comment":
        return <HiAnnotation className="text-purple-500" />;
      case "report":
        return <HiExclamation className="text-red-500" />;
      default:
        return <HiBell className="text-gray-500" />;
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) {
      return "just now";
    }
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min${diffInMinutes !== 1 ? "s" : ""} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  };

  if (!currentUser?.isAdmin) {
    return null;
  }

  return (
    <div className="relative">
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <div className="relative">
            <HiBell className="text-xl" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">{unreadCount}</span>
              </div>
            )}
          </div>
        }
      >
        <Dropdown.Header>
          <div className="flex justify-between items-center">
            <span className="block text-sm font-medium">Notifications</span>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-blue-500 hover:text-blue-700"
              >
                Mark all as read
              </button>
            )}
          </div>
        </Dropdown.Header>

        <div className="max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="px-4 py-2 text-center">
              <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-blue-500 rounded-full mx-auto"></div>
              <p className="text-xs mt-1 text-gray-500">
                Loading notifications...
              </p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="px-4 py-2 text-sm text-gray-500 text-center">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <Dropdown.Item
                key={notification.id}
                className={`${
                  !notification.read ? "bg-blue-50 dark:bg-gray-700" : ""
                }`}
              >
                <Link
                  to={notification.link}
                  className="flex items-start gap-2 w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!notification.read) {
                      markAsRead(notification.id);
                    }
                    window.location.href = notification.link;
                  }}
                >
                  <div className="mt-1">{getIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm ${
                        !notification.read ? "font-medium" : "text-gray-500"
                      }`}
                    >
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatTime(notification.createdAt)}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {!notification.read && (
                      <button
                        className="text-gray-400 hover:text-blue-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification.id);
                        }}
                        title="Mark as read"
                      >
                        <HiCheck />
                      </button>
                    )}
                    <button
                      className="text-gray-400 hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      title="Delete notification"
                    >
                      <HiX />
                    </button>
                  </div>
                </Link>
              </Dropdown.Item>
            ))
          )}
        </div>

        <Dropdown.Divider />
        <Dropdown.Item>
          <Link
            to="/dashboard?tab=settings"
            className="text-sm text-center block w-full"
          >
            Manage notifications
          </Link>
        </Dropdown.Item>
      </Dropdown>

      {showToast && (
        <div className="fixed bottom-4 right-4">
          <Toast onClose={() => setShowToast(false)}>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{toastMessage}</div>
            <Toast.Toggle onClose={() => setShowToast(false)} />
          </Toast>
        </div>
      )}
    </div>
  );
}
