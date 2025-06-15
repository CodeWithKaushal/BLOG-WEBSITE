import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Table,
  Modal,
  Select,
  TextInput,
  Badge,
  Spinner,
} from "flowbite-react";
import {
  HiCheck,
  HiOutlineExclamationCircle,
  HiOutlineUserGroup,
  HiShieldCheck,
  HiX,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { createApiUrl } from '../utils/apiConfig';

export default function DashUserRoles() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(createApiUrl("api/user/getusers?limit=50"));
        const data = await res.json();
        if (res.ok) {
          // In a real implementation, you'd handle pagination properly
          setUsers(data.users);
          setFilteredUsers(data.users);
        } else {
          setError(data.message || "Failed to fetch users");
        }
      } catch (error) {
        setError(error.message || "An error occurred");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.isAdmin) {
      fetchUsers();
    }
  }, [currentUser?.isAdmin]);

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = users.filter(
        (user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleUpdateRole = async () => {
    try {
      setLoading(true);

      // In a real implementation, you would call your API here
      // For now, we'll simulate the API call and update the UI directly
      const updatedUsers = users.map((user) => {
        if (user._id === selectedUser._id) {
          return {
            ...user,
            isAdmin: !user.isAdmin,
          };
        }
        return user;
      });

      setUsers(updatedUsers);
      setFilteredUsers(
        updatedUsers.filter(
          (user) =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

      setShowModal(false);
      setLoading(false);
      // In a real app, you would show a success message here
    } catch (error) {
      console.error(error);
      setLoading(false);
      // In a real app, you would show an error message here
    }
  };

  if (!currentUser?.isAdmin) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <p className="text-xl text-gray-500 mb-2">
          You don't have permission to access this page
        </p>
        <Link to="/" className="text-teal-500 hover:underline">
          Go back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-3">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold flex items-center">
            <HiShieldCheck className="mr-2 text-indigo-500" />
            User Role Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage user roles and permissions in your application
          </p>
        </div>

        <div className="w-full sm:w-64">
          <TextInput
            id="searchUsers"
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={HiOutlineUserGroup}
          />
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center min-h-[40vh]">
          <Spinner size="xl" />
        </div>
      )}

      {error && (
        <div className="min-h-[40vh] flex flex-col items-center justify-center">
          <p className="text-red-500 mb-2">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      )}

      {!loading && !error && filteredUsers.length === 0 && (
        <div className="min-h-[40vh] flex flex-col items-center justify-center">
          <p className="text-xl text-gray-500 mb-2">No users found</p>
        </div>
      )}

      {!loading && !error && filteredUsers.length > 0 && (
        <div className="overflow-x-auto">
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>User</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Role</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {filteredUsers.map((user) => (
                <Table.Row
                  key={user._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="flex items-center">
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                      />
                      <div>
                        <p className="font-medium">@{user.username}</p>
                        <p className="text-xs text-gray-500">
                          Joined {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    {user.isAdmin ? (
                      <Badge color="indigo" className="flex items-center w-fit">
                        <HiShieldCheck className="mr-1" /> Admin
                      </Badge>
                    ) : (
                      <Badge color="gray" className="flex items-center w-fit">
                        User
                      </Badge>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <Badge color="success" className="flex items-center w-fit">
                      <HiCheck className="mr-1" /> Active
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex space-x-2">
                      <Button
                        size="xs"
                        color={user.isAdmin ? "failure" : "success"}
                        onClick={() => handleOpenModal(user)}
                      >
                        {user.isAdmin ? "Remove Admin" : "Make Admin"}
                      </Button>
                      <Button size="xs" color="light">
                        View Profile
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              {selectedUser?.isAdmin
                ? `Are you sure you want to remove admin rights from ${selectedUser?.username}?`
                : `Are you sure you want to make ${selectedUser?.username} an admin?`}
            </h3>
            {selectedUser?.isAdmin && (
              <p className="mb-5 text-sm text-gray-500">
                This will remove their ability to manage content, users, and
                settings.
              </p>
            )}
            {!selectedUser?.isAdmin && (
              <p className="mb-5 text-sm text-gray-500">
                This will give them full access to manage content, users, and
                settings.
              </p>
            )}
            <div className="flex justify-center gap-4">
              <Button
                color={selectedUser?.isAdmin ? "failure" : "success"}
                onClick={handleUpdateRole}
              >
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
