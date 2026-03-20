import React, { useEffect, useState, useCallback } from "react";

import {
  FaUserShield,
  FaMapMarkedAlt,
  FaUsers,
  FaSearch,
  FaTrashAlt,
  FaShieldAlt,
  FaCheckCircle,
  FaWeightHanging,
  FaEye,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

import {
  getAllUsers,
  deleteUser,
  toggleUserRole,
  manualVerifyUser
} from "../../api/userAPI";

import { isLoggedIn } from "../../api/authAPI";
import { Link } from "react-router-dom";

const UsersListPage = () => {

  const { token, user: currentUser } = isLoggedIn();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [sortField, setSortField] = useState("username");
  const [sortOrder, setSortOrder] = useState("asc");

  const [page, setPage] = useState(1);

  const rowsPerPage = 8;

  const fetchUsers = useCallback(() => {

    setLoading(true);

    getAllUsers(token)
      .then((data) => {

        const userData = data.success ? data.data : data;

        if (userData.error) {
          console.error(userData.error);
        } else {
          setUsers(userData);
          setFilteredUsers(userData);
        }

        setLoading(false);

      })
      .catch(() => setLoading(false));

  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  /* ======================
     SEARCH FILTER
  ====================== */

  useEffect(() => {

    const results = users.filter((user) => {

      const s = searchTerm.toLowerCase();

      const roleName =
        user.role === 1
          ? "administrator admin"
          : user.role === 2
          ? "guide"
          : user.role === 3
          ? "porter"
          : "client user";

      return (
        user.username?.toLowerCase().includes(s) ||
        user.email?.toLowerCase().includes(s) ||
        roleName.includes(s)
      );

    });

    setFilteredUsers(results);
    setPage(1);

  }, [searchTerm, users]);

  /* ======================
     SORTING
  ====================== */

  const handleSort = (field) => {

    const order =
      sortField === field && sortOrder === "asc"
        ? "desc"
        : "asc";

    setSortField(field);
    setSortOrder(order);

    const sorted = [...filteredUsers].sort((a, b) => {

      const valA = a[field] || "";
      const valB = b[field] || "";

      if (order === "asc")
        return valA > valB ? 1 : -1;

      return valA < valB ? 1 : -1;

    });

    setFilteredUsers(sorted);

  };

  /* ======================
     PAGINATION
  ====================== */

  const startIndex = (page - 1) * rowsPerPage;

  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  /* ======================
     STATS
  ====================== */

  const stats = {
    admins: users.filter((u) => u.role === 1).length,
    guides: users.filter((u) => u.role === 2).length,
    porters: users.filter((u) => u.role === 3).length,
    clients: users.filter((u) => u.role === 0).length
  };

  /* ======================
     ACTION HANDLERS
  ====================== */

  const handleRoleToggle = (id, role) => {

    if (id === currentUser._id) {
      alert("You cannot change your own permissions.");
      return;
    }

    const nextRole = role === 1 ? 0 : 1;

    toggleUserRole(id, token, nextRole)
      .then(() => fetchUsers())
      .catch(() => alert("Server error"));

  };

  const handleDelete = (id) => {

    if (id === currentUser._id) return;

    if (window.confirm("Delete this user?")) {

      deleteUser(id, token).then(() => fetchUsers());

    }

  };

  const handleManualVerify = (id) => {

    manualVerifyUser(id, token)
      .then(() => fetchUsers());

  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <div className="max-w-7xl mx-auto">

        {/* ======================
           STATS
        ====================== */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          <StatCard title="Administrators" value={stats.admins} icon={<FaUserShield />} />
          <StatCard title="Guides" value={stats.guides} icon={<FaMapMarkedAlt />} />
          <StatCard title="Porters" value={stats.porters} icon={<FaWeightHanging />} />
          <StatCard title="Clients" value={stats.clients} icon={<FaUsers />} />

        </div>

        {/* ======================
           SEARCH
        ====================== */}

        <div className="bg-white p-5 rounded-xl shadow mb-6 flex justify-between">

          <h2 className="font-bold text-lg">
            User Management ({filteredUsers.length})
          </h2>

          <div className="relative">

            <FaSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              type="text"
              className="pl-10 border rounded-lg px-3 py-2"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

          </div>

        </div>

        {/* ======================
           TABLE
        ====================== */}

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-100 text-sm">

              <tr>

                <th className="p-4">#</th>
                <th className="p-4 cursor-pointer" onClick={() => handleSort("username")}>Profile</th>
                <th className="p-4">Role</th>
                <th className="p-4">Verification</th>
                <th className="p-4 text-center">Actions</th>

              </tr>

            </thead>

            <tbody>

              {paginatedUsers.map((user, i) => (

                <tr key={user._id} className="border-t hover:bg-gray-50">

                  <td className="p-4 text-sm text-gray-400">
                    {startIndex + i + 1}
                  </td>

                  {/* PROFILE */}
                  <td className="p-4">

                    <div className="flex items-center gap-3">

                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold overflow-hidden">

                        {user.image ? (
                          <img
                            src={`http://localhost:8000/uploads/${user.image}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          user.username?.charAt(0)
                        )}

                      </div>

                      <div>
                        <div className="font-semibold text-sm">{user.username}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>

                    </div>

                  </td>

                  {/* ROLE */}
                  <td className="p-4 text-sm">

                    {user.role === 1 && <Badge color="indigo">Administrator</Badge>}
                    {user.role === 2 && <Badge color="emerald">Guide</Badge>}
                    {user.role === 3 && <Badge color="orange">Porter</Badge>}
                    {user.role === 0 && <Badge color="slate">Client</Badge>}

                  </td>

                  {/* VERIFY */}
                  <td className="p-4">

                    {user.isVerified ? (
                      <Badge color="green">Verified</Badge>
                    ) : (
                      <Badge color="rose">Pending</Badge>
                    )}

                  </td>

                  {/* ACTIONS */}
                  <td className="p-4">

                    <div className="flex justify-center gap-2">

                      <Link
                        to={`/admin/profile/${user._id}`}
                        className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg"
                      >
                        <FaEye />
                      </Link>

                      {!user.isVerified && (
                        <button
                          onClick={() => handleManualVerify(user._id)}
                          className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg"
                        >
                          <FaCheckCircle />
                        </button>
                      )}

                      <button
                        onClick={() => handleRoleToggle(user._id, user.role)}
                        className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg"
                      >
                        <FaShieldAlt />
                      </button>

                      <button
                        onClick={() => handleDelete(user._id)}
                        className="p-2 hover:bg-rose-50 text-rose-600 rounded-lg"
                      >
                        <FaTrashAlt />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );

};

/* ======================
   COMPONENTS
====================== */

const StatCard = ({ title, value, icon }) => (

  <div className="bg-white p-6 rounded-xl shadow flex justify-between">

    <div>
      <p className="text-xs text-gray-400 uppercase">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>

    <div className="text-2xl text-gray-500">
      {icon}
    </div>

  </div>

);

const Badge = ({ children, color }) => (

  <span
    className={`px-3 py-1 text-xs rounded-full bg-${color}-50 text-${color}-700`}
  >
    {children}
  </span>

);

export default UsersListPage;