import React, { useEffect, useState, useCallback } from "react";
import styles from "@/styles/UserManagement.module.scss";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/Button";
import { Select, SelectItem } from "@/components/ui/Select";
import { getAllUsers, deleteUser, updateUserRole } from "@/api/authAPI";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllUsers();
      setUsers(res.data || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Could not load user list.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      await loadUsers();
    } catch (err) {
      console.error("Failed to update role:", err);
      alert("Role update failed.");
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(userId);
      await loadUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
      alert("User deletion failed.");
    }
  };

  return (
    <div className={styles.userManagement}>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {loading ? (
        <p className="text-gray-500">Loading users...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="grid gap-4">
          {users.map((user) => (
            <Card key={user.id} className={styles.userCard}>
              <CardContent className="flex flex-col gap-3">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Current Role:</strong> {user.role}</p>

                <Select
                  defaultValue={user.role}
                  onValueChange={(value) => handleRoleChange(user.id, value)}
                >
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="patient">Patient</SelectItem>
                </Select>

                <Button variant="destructive" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserManagement;
