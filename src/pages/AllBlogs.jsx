import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Search, Filter, Edit, Trash2, Eye, MoreHorizontal } from 'lucide-react';

const AllBlogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with React Hooks',
      category: 'Technology',
      status: 'Published',
      views: 1234,
      comments: 23,
      date: '2024-01-15',
      author: 'John Doe',
      image: '/src/assets/blog-placeholder.jpg'
    },
    {
      id: 2,
      title: 'Advanced JavaScript Concepts',
      category: 'Technology',
      status: 'Draft',
      views: 0,
      comments: 0,
      date: '2024-01-14',
      author: 'Jane Smith',
      image: '/src/assets/blog-placeholder.jpg'
    },
    {
      id: 3,
      title: 'CSS Grid vs Flexbox',
      category: 'Web Design',
      status: 'Published',
      views: 856,
      comments: 12,
      date: '2024-01-13',
      author: 'Mike Johnson',
      image: '/src/assets/blog-placeholder.jpg'
    },
    {
      id: 4,
      title: 'Building Responsive Websites',
      category: 'Web Design',
      status: 'Published',
      views: 2341,
      comments: 45,
      date: '2024-01-12',
      author: 'Sarah Wilson',
      image: '/src/assets/blog-placeholder.jpg'
    },
    {
      id: 5,
      title: 'Introduction to Node.js',
      category: 'Backend',
      status: 'Scheduled',
      views: 0,
      comments: 0,
      date: '2024-01-20',
      author: 'Tom Brown',
      image: '/src/assets/blog-placeholder.jpg'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout title="All Blog Posts" subtitle="Manage and organize your blog content">
      <div className="space-y-6">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              Showing {filteredPosts.length} of {blogPosts.length} posts
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Image */}
              <div className="h-48 bg-gray-200 relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(post.status)}`}>
                    {post.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreHorizontal size={16} className="text-gray-400" />
                  </button>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-sm text-gray-500 mb-3">
                  By {post.author} • {post.date}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Eye size={14} />
                      <span>{post.views.toLocaleString()}</span>
                    </span>
                    <span>{post.comments} comments</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Edit size={14} />
                    <span>Edit</span>
                  </button>
                  <button className="flex items-center justify-center px-3 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-500">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AllBlogs;

