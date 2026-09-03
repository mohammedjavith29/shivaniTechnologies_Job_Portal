import React, { useEffect, useState } from "react";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../../services/userService";
import { getRoles } from "../../services/roleService";

function Users() {

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const [user, setUser] = useState({
    userId: "",
    username: "",
    email: "",
    password: "",
    mobile: "",
    enabled: true,
    role: {
      roleId: ""
    }
  });

  useEffect(() => {
    loadUsers();
    loadRoles();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadRoles = async () => {
    try {
      const response = await getRoles();
      setRoles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {

    if (e.target.name === "roleId") {
      setUser({
        ...user,
        role: {
          roleId: Number(e.target.value)
        }
      });
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value
      });
    }

  };

  const saveUser = async () => {

    try {

      if (user.userId === "") {
        await addUser(user);
        alert("User Added Successfully");
      } else {
        await updateUser(user.userId, user);
        alert("User Updated Successfully");
      }

      setUser({
        userId: "",
        username: "",
        email: "",
        password: "",
        mobile: "",
        enabled: true,
        role: {
          roleId: ""
        }
      });

      loadUsers();

    } catch (error) {
      console.log(error);
      alert("Error Saving User");
    }

  };

  const editUser = (u) => {

    setUser({
      userId: u.userId,
      username: u.username,
      email: u.email,
      password: u.password,
      mobile: u.mobile,
      enabled: u.enabled,
      role: {
        roleId: u.role?.roleId
      }
    });

  };

  const removeUser = async (id) => {

    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUser(id);
      loadUsers();
    } catch (error) {
      console.log(error);
    }

  };

  return (

    <div className="container mt-4">

      <h2 className="mb-4">Manage Users</h2>

      <div className="card mb-4">

        <div className="card-header bg-primary text-white">
          User Form
        </div>

        <div className="card-body">

          <div className="row">

            <div className="col-md-4 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                name="username"
                value={user.username}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Mobile"
                name="mobile"
                value={user.mobile}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-3">
              <select
                className="form-control"
                name="roleId"
                value={user.role.roleId}
                onChange={handleChange}
              >
                <option value="">Select Role</option>

                {roles.map((role) => (
                  <option
                    key={role.roleId}
                    value={role.roleId}
                  >
                    {role.roleName}
                  </option>
                ))}

              </select>
            </div>

            <div className="col-md-4 mb-3">

              <button
                className="btn btn-primary w-100"
                onClick={saveUser}
              >
                {user.userId === "" ? "Save User" : "Update User"}
              </button>

            </div>

          </div>

        </div>

      </div>

      <table className="table table-bordered table-striped">

        <thead className="table-dark">

          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Role</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {users.map((u) => (

            <tr key={u.userId}>

              <td>{u.userId}</td>

              <td>{u.username}</td>

              <td>{u.email}</td>

              <td>{u.mobile}</td>

              <td>{u.role?.roleName}</td>

              <td>

                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editUser(u)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeUser(u.userId)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default Users;