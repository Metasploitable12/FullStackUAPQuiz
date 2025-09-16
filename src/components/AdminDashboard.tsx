import React, { useState, useEffect } from 'react';
import { Shield, Users, BarChart3, Activity, Download, Eye, UserCheck, UserX } from 'lucide-react';
import { AuthService } from '../lib/auth';
import { QuizService } from '../lib/quiz';
import type { UserProfile, QuizAttempt } from '../lib/supabase';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'attempts' | 'reports'>('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [usersData, attemptsData, statsData] = await Promise.all([
        AuthService.getAllUsers(),
        QuizService.getAllAttempts(),
        QuizService.getQuizStatistics()
      ]);

      setUsers(usersData);
      setAttempts(attemptsData);
      setStatistics(statsData);
    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: 'player' | 'admin') => {
    try {
      await AuthService.updateUserRole(userId, newRole);
      await loadData(); // Refresh data
    } catch (error) {
      console.error('Failed to update user role:', error);
    }
  };

  const handleDeactivateUser = async (userId: string) => {
    try {
      await AuthService.deactivateUser(userId);
      await loadData(); // Refresh data
    } catch (error) {
      console.error('Failed to deactivate user:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-orange-500 text-white py-4 px-8 rounded-lg mb-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <button
              onClick={onLogout}
              className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="flex border-b">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'attempts', label: 'Quiz Attempts', icon: Activity },
              { id: 'reports', label: 'Reports', icon: Download }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-orange-500 text-orange-600'
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && statistics && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Users</p>
                    <p className="text-3xl font-bold text-gray-800">{users.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Quiz Attempts</p>
                    <p className="text-3xl font-bold text-gray-800">{statistics.totalAttempts}</p>
                  </div>
                  <Activity className="w-8 h-8 text-orange-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Pass Rate</p>
                    <p className="text-3xl font-bold text-gray-800">{statistics.passRate}%</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Average Score</p>
                    <p className="text-3xl font-bold text-gray-800">{statistics.averageScore}/15</p>
                  </div>
                  <Shield className="w-8 h-8 text-purple-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {attempts.slice(0, 5).map((attempt: any) => (
                  <div key={attempt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">
                        {attempt.user_profiles?.first_name} {attempt.user_profiles?.last_name} 
                        ({attempt.user_profiles?.email})
                      </p>
                      <p className="text-sm text-gray-600">
                        Score: {attempt.score}/{attempt.total_questions} - 
                        {attempt.passed ? ' ✅ Passed' : ' ❌ Failed'}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(attempt.completed_at || attempt.started_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold text-gray-800">User Management</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.first_name} {user.last_name}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value as 'player' | 'admin')}
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="player">Player</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.last_login_at 
                          ? new Date(user.last_login_at).toLocaleDateString()
                          : 'Never'
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        {user.status === 'active' ? (
                          <button
                            onClick={() => handleDeactivateUser(user.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <UserX className="w-4 h-4" />
                          </button>
                        ) : (
                          <button className="text-gray-400 cursor-not-allowed">
                            <UserCheck className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Quiz Attempts Tab */}
        {activeTab === 'attempts' && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold text-gray-800">Quiz Attempts</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Result
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time Taken
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attempts.map((attempt: any) => (
                    <tr key={attempt.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {attempt.user_profiles?.first_name} {attempt.user_profiles?.last_name}
                        </div>
                        <div className="text-sm text-gray-500">{attempt.user_profiles?.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {attempt.score}/{attempt.total_questions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          attempt.passed 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {attempt.passed ? 'Passed' : 'Failed'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {attempt.time_taken ? `${Math.floor(attempt.time_taken / 60)}:${(attempt.time_taken % 60).toString().padStart(2, '0')}` : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(attempt.completed_at || attempt.started_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-orange-600 hover:text-orange-900">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Reports & Analytics</h3>
            <div className="space-y-4">
              <button className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                <span>Export User Results</span>
              </button>
              <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                <span>Export Activity Logs</span>
              </button>
              <button className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                <span>Export Compliance Report</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;