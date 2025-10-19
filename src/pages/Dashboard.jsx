import { useAppContext } from '@/context/ContentProvider';
import Layout from '../components/layout/Layout';
import { Eye, MessageCircle, ThumbsUp, TrendingUp } from 'lucide-react';
import { useEffect } from 'react';
import moment from 'moment';

const Dashboard = () => {

  const {fetchDarshboardData, darshboardData, blogs} = useAppContext();


  const stats = [
    {
      title: 'Total Views',
      value: '12,345',
      change: '+12%',
      icon: Eye,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Posts',
      value: blogs.length,
      change: '+5%',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'Comments',
      value: `${darshboardData.comments}`,
      change: '+8%',
      icon: MessageCircle,
      color: 'bg-yellow-500'
    },
    {
      title: 'Likes',
      value: '1,234',
      change: '+15%',
      icon: ThumbsUp,
      color: 'bg-purple-500'
    }
  ];

  const recentPosts = [
    {
      id: 1,
      title: 'Getting Started with React Hooks',
      status: 'Published',
      views: 1234,
      comments: 23,
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Advanced JavaScript Concepts',
      status: 'Draft',
      views: 0,
      comments: 0,
      date: '2024-01-14'
    },
    {
      id: 3,
      title: 'CSS Grid vs Flexbox',
      status: 'Published',
      views: 856,
      comments: 12,
      date: '2024-01-13'
    },
    {
      id: 4,
      title: 'Building Responsive Websites',
      status: 'Published',
      views: 2341,
      comments: 45,
      date: '2024-01-12'
    }
  ];

  useEffect(()=> {
    fetchDarshboardData();
  },[blogs])

  return (
    <Layout title="Dashboard" subtitle="Welcome back! Here's what's happening with your blog.">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="text-white" size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Posts</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 max-[530px]:hidden py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 max-lg:hidden py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 max-lg:hidden py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comments
                  </th>
                  <th className="px-6 max-lg:hidden py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y max-sm:text-xs divide-gray-200">
                {darshboardData.recentBlogs.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{post.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap max-[530px]:hidden">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-[5xl] ${
                        post.isPublished 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.isPublished ? 'Published' : 'Unpublished'}
                      </span>
                    </td>
                    <td className="px-6 max-lg:hidden py-4 whitespace-nowrap text-sm text-gray-900">
                      {0}
                    </td>
                    <td className="px-6 max-lg:hidden py-4 whitespace-nowrap text-sm text-gray-900">
                      {darshboardData.comments}
                    </td>
                    <td className="px-6 max-lg:hidden py-4 whitespace-nowrap text-sm text-gray-500">
                      {moment(post.createdAt).fromNow()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

