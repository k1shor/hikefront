import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
    FaArrowLeft,
    FaCheckCircle,
    FaBackward,
} from "react-icons/fa";

import { getAllUsers, toggleUserRole, manualVerifyUser } from "../../api/userAPI";
import { isLoggedIn } from "../../api/authAPI";

const UserProfilePage = () => {

    const { id } = useParams();
    const { token } = isLoggedIn();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        getAllUsers(token)
            .then((data) => {

                const users = data.success ? data.data : data;
                const foundUser = users.find(u => u._id === id);

                setUser(foundUser);
                setLoading(false);

            })
            .catch(() => setLoading(false));

    }, [id, token]);

    const handleVerify = () => {
        manualVerifyUser(id, token)
            .then(() => window.location.reload());
    };



    if (loading) return <div className="p-10 text-center">Loading profile...</div>;
    if (!user) return <div className="p-10 text-center">User not found</div>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">

            <div className="max-w-5xl mx-auto">

                <Link
                    to="/admin/users"
                    className="flex items-center gap-2 text-sm text-gray-600 mb-6"
                >
                    <FaArrowLeft /> Back to Users
                </Link>

                <div className="bg-white shadow rounded-xl p-8">

                    {/* HEADER */}
                    <div className="flex items-center gap-6">

                        <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-3xl font-bold">

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

                            <h1 className="text-2xl font-bold">{user.username}</h1>

                            <p className="text-gray-500">{user.email}</p>

                            <div className="mt-2">

                                {user.role === 1 && <Badge color="indigo">Administrator</Badge>}
                                {user.role === 2 && <Badge color="emerald">Guide</Badge>}
                                {user.role === 3 && <Badge color="orange">Porter</Badge>}
                                {user.role === 0 && <Badge color="slate">Client</Badge>}

                                {user.isVerified ? (
                                    <Badge color="green">Verified</Badge>
                                ) : (
                                    <Badge color="rose">Pending Verification</Badge>
                                )}

                            </div>

                        </div>

                    </div>

                    {/* BASIC DETAILS */}

                    <Section title="Basic Information">

                        <Info label="User ID" value={user._id} />
                        <Info label="Username" value={user.username} />
                        <Info label="Email" value={user.email} />
                        <Info label="Age" value={user.age || "-"} />

                    </Section>

                    {/* GUIDE DETAILS */}

                    {user.role === 2 && (
                        <Section title="Guide Information">

                            <Info label="Experience" value={`${user.experience || 0} years`} />
                            <Info label="Daily Rate" value={`Rs.${user.dailyRate || 0}`} />
                            <Info label="Specialization" value={user.specialization || "-"} />

                        </Section>
                    )}

                    {/* PORTER DETAILS */}

                    {user.role === 3 && (
                        <Section title="Porter Information">

                            <Info label="Maximum Carry Weight" value={`${user.maxWeight || 0} kg`} />
                            <Info label="Daily Rate" value={`Rs.${user.dailyRate || 0}`} />

                        </Section>
                    )}

                    {/* BIO */}

                    {user.bio && (

                        <Section title="Biography">

                            <p className="text-gray-600 text-sm leading-relaxed">
                                {user.bio}
                            </p>

                        </Section>

                    )}

                    {/* ADMIN ACTIONS */}

                    <div className="mt-10 flex gap-3">

                        {!user.isVerified && (

                            <button
                                onClick={handleVerify}
                                className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm"
                            >
                                <FaCheckCircle /> Verify User
                            </button>

                        )}

                        <Link
                            to={`/admin/users`}
                            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
                        >
                            <FaBackward /> Back
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );

};

/* ============================
   COMPONENTS
============================ */

const Section = ({ title, children }) => (

    <div className="mt-8">

        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
            {title}
        </h3>

        <div className="grid grid-cols-2 gap-6 text-sm">
            {children}
        </div>

    </div>

);

const Info = ({ label, value }) => (

    <div>
        <p className="text-xs text-gray-400 uppercase">{label}</p>
        <p className="font-semibold">{value}</p>
    </div>

);

const Badge = ({ children, color }) => (

    <span className={`px-3 py-1 text-xs rounded-full bg-${color}-50 text-${color}-700 mr-2`}>
        {children}
    </span>

);

export default UserProfilePage;