import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Label,
  TextInput,
  Spinner,
  Alert,
  Card,
  ToggleSwitch,
  Tabs,
} from "flowbite-react";
import {
  HiCog,
  HiSave,
  HiMail,
  HiGlobeAlt,
  HiLockClosed,
  HiAnnotation,
  HiOutlineUsers,
} from "react-icons/hi";
import { Link } from "react-router-dom";

export default function DashSettings() {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // General Settings
  const [siteTitle, setSiteTitle] = useState("HackHub Blog");
  const [siteDescription, setSiteDescription] = useState(
    "A full-stack blog website built with the MERN stack"
  );
  const [postsPerPage, setPostsPerPage] = useState(9);
  const [allowRegistrations, setAllowRegistrations] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Email Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [adminEmail, setAdminEmail] = useState("admin@hackhub.com");
  const [emailFooterText, setEmailFooterText] = useState(
    "© 2025 HackHub Blog. All rights reserved."
  );

  // Comment Settings
  const [allowComments, setAllowComments] = useState(true);
  const [moderateComments, setModerateComments] = useState(false);
  const [allowAnonymousComments, setAllowAnonymousComments] = useState(false);

  // User Settings
  const [allowUserDeleteAccounts, setAllowUserDeleteAccounts] = useState(true);
  const [requireEmailVerification, setRequireEmailVerification] =
    useState(false);
  const [defaultUserRole, setDefaultUserRole] = useState("user");

  const handleSaveSettings = async (e) => {
    e.preventDefault();

    if (!currentUser?.isAdmin) {
      setError("You do not have permission to change settings");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // In a real app, you would call your API here
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess("Settings saved successfully");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Failed to save settings");
      setLoading(false);
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
    <div className="max-w-4xl mx-auto p-3">
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <HiCog className="mr-2 text-indigo-500" />
          System Settings
        </h1>
        <p className="text-gray-500 mt-1">
          Configure your blog settings and preferences
        </p>
      </div>

      {success && (
        <Alert color="success" className="mb-4">
          {success}
        </Alert>
      )}

      {error && (
        <Alert color="failure" className="mb-4">
          {error}
        </Alert>
      )}

      <Tabs aria-label="Settings tabs">
        <Tabs.Item active title="General" icon={HiGlobeAlt}>
          <Card className="mb-4">
            <form className="flex flex-col gap-4" onSubmit={handleSaveSettings}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="siteTitle" value="Site Title" />
                </div>
                <TextInput
                  id="siteTitle"
                  value={siteTitle}
                  onChange={(e) => setSiteTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="siteDescription" value="Site Description" />
                </div>
                <TextInput
                  id="siteDescription"
                  value={siteDescription}
                  onChange={(e) => setSiteDescription(e.target.value)}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="postsPerPage" value="Posts Per Page" />
                </div>
                <TextInput
                  id="postsPerPage"
                  type="number"
                  value={postsPerPage}
                  onChange={(e) => setPostsPerPage(Number(e.target.value))}
                  min={1}
                  max={50}
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <ToggleSwitch
                  checked={allowRegistrations}
                  onChange={setAllowRegistrations}
                  label="Allow New Registrations"
                />
              </div>

              <div className="flex items-center gap-2">
                <ToggleSwitch
                  checked={maintenanceMode}
                  onChange={setMaintenanceMode}
                  label="Maintenance Mode"
                />
                {maintenanceMode && (
                  <span className="text-sm text-yellow-500">
                    Site will be accessible only to admins
                  </span>
                )}
              </div>

              <Button
                type="submit"
                gradientDuoTone="purpleToPink"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <HiSave className="mr-2" />
                    <span>Save Settings</span>
                  </>
                )}
              </Button>
            </form>
          </Card>
        </Tabs.Item>

        <Tabs.Item title="Email" icon={HiMail}>
          <Card className="mb-4">
            <form className="flex flex-col gap-4" onSubmit={handleSaveSettings}>
              <div className="flex items-center gap-2">
                <ToggleSwitch
                  checked={emailNotifications}
                  onChange={setEmailNotifications}
                  label="Enable Email Notifications"
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="adminEmail" value="Admin Email Address" />
                </div>
                <TextInput
                  id="adminEmail"
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="emailFooterText" value="Email Footer Text" />
                </div>
                <TextInput
                  id="emailFooterText"
                  value={emailFooterText}
                  onChange={(e) => setEmailFooterText(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                gradientDuoTone="purpleToPink"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <HiSave className="mr-2" />
                    <span>Save Settings</span>
                  </>
                )}
              </Button>
            </form>
          </Card>
        </Tabs.Item>

        <Tabs.Item title="Comments" icon={HiAnnotation}>
          <Card className="mb-4">
            <form className="flex flex-col gap-4" onSubmit={handleSaveSettings}>
              <div className="flex items-center gap-2">
                <ToggleSwitch
                  checked={allowComments}
                  onChange={setAllowComments}
                  label="Allow Comments"
                />
              </div>

              <div className="flex items-center gap-2">
                <ToggleSwitch
                  checked={moderateComments}
                  onChange={setModerateComments}
                  label="Moderate Comments Before Publishing"
                  disabled={!allowComments}
                />
              </div>

              <div className="flex items-center gap-2">
                <ToggleSwitch
                  checked={allowAnonymousComments}
                  onChange={setAllowAnonymousComments}
                  label="Allow Anonymous Comments"
                  disabled={!allowComments}
                />
              </div>

              <Button
                type="submit"
                gradientDuoTone="purpleToPink"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <HiSave className="mr-2" />
                    <span>Save Settings</span>
                  </>
                )}
              </Button>
            </form>
          </Card>
        </Tabs.Item>

        <Tabs.Item title="Users" icon={HiOutlineUsers}>
          <Card className="mb-4">
            <form className="flex flex-col gap-4" onSubmit={handleSaveSettings}>
              <div className="flex items-center gap-2">
                <ToggleSwitch
                  checked={allowUserDeleteAccounts}
                  onChange={setAllowUserDeleteAccounts}
                  label="Allow Users to Delete Their Accounts"
                />
              </div>

              <div className="flex items-center gap-2">
                <ToggleSwitch
                  checked={requireEmailVerification}
                  onChange={setRequireEmailVerification}
                  label="Require Email Verification"
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="defaultUserRole" value="Default User Role" />
                </div>
                <select
                  id="defaultUserRole"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={defaultUserRole}
                  onChange={(e) => setDefaultUserRole(e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="contributor">Contributor</option>
                </select>
              </div>

              <Button
                type="submit"
                gradientDuoTone="purpleToPink"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <HiSave className="mr-2" />
                    <span>Save Settings</span>
                  </>
                )}
              </Button>
            </form>
          </Card>
        </Tabs.Item>

        <Tabs.Item title="Security" icon={HiLockClosed}>
          <Card className="mb-4">
            <form className="flex flex-col gap-4" onSubmit={handleSaveSettings}>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="maxLoginAttempts"
                    value="Max Login Attempts"
                  />
                </div>
                <TextInput
                  id="maxLoginAttempts"
                  type="number"
                  defaultValue={5}
                  min={1}
                  max={10}
                  required
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="sessionTimeout"
                    value="Session Timeout (minutes)"
                  />
                </div>
                <TextInput
                  id="sessionTimeout"
                  type="number"
                  defaultValue={60}
                  min={5}
                  max={1440}
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <ToggleSwitch
                  id="enforceStrongPassword"
                  defaultChecked={true}
                  label="Enforce Strong Passwords"
                />
              </div>

              <Button
                type="submit"
                gradientDuoTone="purpleToPink"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <HiSave className="mr-2" />
                    <span>Save Settings</span>
                  </>
                )}
              </Button>
            </form>
          </Card>
        </Tabs.Item>
      </Tabs>
    </div>
  );
}
