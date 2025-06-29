
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Mail, Building, Shield, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface UserDetails {
  id: string;
  username: string;
  password: string; // In real app, this would be hashed and not displayed
  role: string;
  email: string;
  business: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive';
  lastLogin?: string;
}

// Mock data - in real app this would come from API
const mockUserDetails: { [key: string]: UserDetails } = {
  '1': {
    id: '1',
    username: 'john_doe',
    password: '••••••••', // Never show actual password
    role: 'admin',
    email: 'john@example.com',
    business: 'Tech Solutions Inc',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-06-20T14:22:00Z',
    status: 'active',
    lastLogin: '2024-06-27T09:15:00Z'
  },
  '2': {
    id: '2',
    username: 'jane_smith',
    password: '••••••••',
    role: 'manager',
    email: 'jane@example.com',
    business: 'Digital Marketing Co',
    createdAt: '2024-02-20T08:45:00Z',
    updatedAt: '2024-05-15T11:30:00Z',
    status: 'active',
    lastLogin: '2024-06-26T16:45:00Z'
  },
  '3': {
    id: '3',
    username: 'bob_wilson',
    password: '••••••••',
    role: 'user',
    email: 'bob@example.com',
    business: 'Retail Store',
    createdAt: '2024-03-10T13:20:00Z',
    updatedAt: '2024-04-05T09:10:00Z',
    status: 'inactive'
  }
};

const User: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDetails | null>(
    userId ? mockUserDetails[userId] : null
  );

  if (!user) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link to="/users">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Users
            </Button>
          </Link>
        </div>
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">User not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      case 'user':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  const handleDeleteUser = () => {
    // In real app, show confirmation dialog
    if (window.confirm('Are you sure you want to delete this user?')) {
      // Delete user logic here
      navigate('/users');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/users">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Users
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
            <p className="text-gray-600">User Details</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link to={`/users/${user.id}/edit`}>
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit User
            </Button>
          </Link>
          <Button 
            variant="destructive"
            onClick={handleDeleteUser}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete User
          </Button>
        </div>
      </div>

      {/* User Details Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>User Information</CardTitle>
            <div className="flex items-center space-x-2">
              <Badge className={getRoleBadgeColor(user.role)}>
                {user.role}
              </Badge>
              <Badge className={getStatusBadgeColor(user.status)}>
                {user.status}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{user.username}</p>
                  <p className="text-sm text-gray-500">Username</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">{user.email}</p>
                  <p className="text-sm text-gray-500">Email Address</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Building className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">{user.business}</p>
                  <p className="text-sm text-gray-500">Business</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium capitalize">{user.role}</p>
                  <p className="text-sm text-gray-500">Role</p>
                </div>
              </div>
            </div>

            {/* System Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">System Information</h3>
              
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">
                    {new Date(user.createdAt).toLocaleDateString()} at{' '}
                    {new Date(user.createdAt).toLocaleTimeString()}
                  </p>
                  <p className="text-sm text-gray-500">Account Created</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">
                    {new Date(user.updatedAt).toLocaleDateString()} at{' '}
                    {new Date(user.updatedAt).toLocaleTimeString()}
                  </p>
                  <p className="text-sm text-gray-500">Last Updated</p>
                </div>
              </div>

              {user.lastLogin && (
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">
                      {new Date(user.lastLogin).toLocaleDateString()} at{' '}
                      {new Date(user.lastLogin).toLocaleTimeString()}
                    </p>
                    <p className="text-sm text-gray-500">Last Login</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Information */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Password and security settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Password</p>
              <p className="text-sm text-gray-500">{user.password}</p>
            </div>
            <Button variant="outline" size="sm">
              Reset Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default User;
