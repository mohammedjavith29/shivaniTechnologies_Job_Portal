import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../../services/userService";

function UserList() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        try {

            const response = await getUsers();

            setUsers(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const removeUser = async (id) => {

        try {

            await deleteUser(id);

            loadUsers();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="container mt-4">

            <h2>User List</h2>

            <table className="table table-bordered">

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {users.map((user) => (

                        <tr key={user.id}>

                            <td>{user.id}</td>

                            <td>{user.username}</td>

                            <td>{user.email}</td>

                            <td>{user.role}</td>

                            <td>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => removeUser(user.id)}
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

export default UserList;