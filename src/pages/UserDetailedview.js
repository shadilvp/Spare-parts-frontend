import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificUser } from '../serveces/userService';
import { useQuery } from '@tanstack/react-query';

const UserDetailedview = () => {
    const navigate = useNavigate();
    const { userId } = useParams();

    const { data: userData, isLoading, error } = useQuery({
        queryKey: ["getspecificuser",userId],
        queryFn:()=> getSpecificUser(userId),
      });

      console.log("user",userData)

  return (
<div className="flex justify-center items-center min-h-screen ">
  <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center">
    <h1 className="text-2xl font-bold text-gray-800 mb-6">User Detailed View</h1>
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">{userData?.name}</h2>
      <p className="text-gray-600">{userData?.email}</p>
      <p className="text-gray-500">Role: {userData?.roll}</p>
    </div>
  </div>
</div>

  )
}

export default UserDetailedview
