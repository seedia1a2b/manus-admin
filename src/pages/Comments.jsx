import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Search, Filter, Check, X, Reply, Flag, User } from 'lucide-react';

const Comments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const comments = [
    {
      id: 1,
      author: 'Alice Johnson',
      email: 'alice@example.com',
      content: 'Great article! This really helped me understand React hooks better. Looking forward to more content like this.',
      postTitle: 'Getting Started with React Hooks',
      status: 'approved',
      date: '2024-01-15 10:30 AM',
      avatar: '/src/assets/user-avatar.jpg'
    },
    {
      id: 2,
      author: 'Bob Smith',
      email: 'bob@example.com',
      content: 'I disagree with some points mentioned here. The approach seems outdated.',
      postTitle: 'Advanced JavaScript Concepts',
      status: 'pending',
      date: '2024-01-14 3:45 PM',
      avatar: '/src/assets/user-avatar.jpg'
    },
    {
      id: 3,
      author: 'Carol Davis',
      email: 'carol@example.com',
      content: 'This is spam content with promotional links.',
      postTitle: 'CSS Grid vs Flexbox',
      status: 'spam',
      date: '2024-01-13 8:20 AM',
      avatar: '/src/assets/user-avatar.jpg'
    },
    {
      id: 4,
      author: 'David Wilson',
      email: 'david@example.com',
      content: 'Excellent tutorial! The examples are very clear and easy to follow. Thank you for sharing this knowledge.',
      postTitle: 'Building Responsive Websites',
      status: 'approved',
      date: '2024-01-12 2:15 PM',
      avatar: '/src/assets/user-avatar.jpg'
    },
    {
      id: 5,
      author: 'Eva Brown',
      email: 'eva@example.com',
      content: 'Could you please elaborate more on the performance implications?',
      postTitle: 'Getting Started with React Hooks',
      status: 'pending',
      date: '2024-01-11 11:00 AM',
      avatar: '/src/assets/user-avatar.jpg'
    }
  ];

  const filteredComments = comments.filter(comment => {
    const matchesSearch = comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.postTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || comment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'spam':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = (commentId) => {
    console.log('Approve comment:', commentId);
  };

  const handleReject = (commentId) => {
    console.log('Reject comment:', commentId);
  };

  const handleReply = (commentId) => {
    console.log('Reply to comment:', commentId);
  };

  const handleFlag = (commentId) => {
    console.log('Flag comment:', commentId);
  };

  return (
    <Layout title="Comments" subtitle="Manage and moderate blog comments">
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
                  placeholder="Search comments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-44"
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
                  <option value="all">All Comments</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="spam">Spam</option>
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              Showing {filteredComments.length} of {comments.length} comments
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {filteredComments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <User size={20} className="text-gray-600" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2 max-lg:flex-col max-lg:gap-y-2 max-lg:items-start">
                    <div className="flex items-center space-x-2 max-lg:flex-col max-lg:items-start max-lg:gap-y-2">
                      <h4 className="text-sm font-medium text-gray-900">{comment.author}</h4>
                      <div className='flex gap-2'>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{comment.email}</span>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(comment.status)}`}>
                        {comment.status}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{comment.date}</span>
                  </div>

                  <p className="text-gray-700 mb-3 text-wrap">{comment.content}</p>

                  <div className="flex items-center justify-between max-lg:flex-col max-lg:items-start">
                    <div className="text-sm text-gray-500">
                      On: <span className="font-medium">{comment.postTitle}</span>
                    </div>

                    {/* Actions */}
                    <div className={`flex space-x-2 ${comment.status === 'pending ' ? 'flex-col items-start gap-y-2': ''}`}>
                      {comment.status === 'pending' && (
                        <div className='flex gap-2 mt-2'>
                          <div>
                            <button
                              onClick={() => handleApprove(comment.id)}
                              className="flex items-center space-x-1 px-3 py-1 text-sm text-green-600 border border-green-300 rounded-lg hover:bg-green-50 transition-colors"
                            >
                              <Check size={14} />
                              <span>Approve</span>
                            </button>
                          </div>
                          <div>
                            <button
                              onClick={() => handleReject(comment.id)}
                              className="flex items-center space-x-1 px-3 py-1 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                            >
                              <X size={14} />
                              <span>Reject</span>
                            </button>
                          </div>
                        </div>
                      )}
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredComments.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No comments found</h3>
            <p className="text-gray-500">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Comments;

