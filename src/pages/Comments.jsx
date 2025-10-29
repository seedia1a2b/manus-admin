import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { Search, Filter, Check, X, Reply, Flag, User, Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppContext } from '../context/ContentProvider';
import moment from 'moment';
import axios from 'axios';

const Comments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const {comments, fetchComments, backend_url, token} = useAppContext();
  const [isLoading, setIsLoading] = useState();
  const [isDeleting, setIsDeleting] = useState(false);

  // const comments = [
  //   {
  //     id: 1,
  //     author: 'Alice Johnson',
  //     email: 'alice@example.com',
  //     content: 'Great article! This really helped me understand React hooks better. Looking forward to more content like this.',
  //     postTitle: 'Getting Started with React Hooks',
  //     status: 'approved',
  //     date: '2024-01-15 10:30 AM',
  //     avatar: '/src/assets/user-avatar.jpg'
  //   },
  //   {
  //     id: 2,
  //     author: 'Bob Smith',
  //     email: 'bob@example.com',
  //     content: 'I disagree with some points mentioned here. The approach seems outdated.',
  //     postTitle: 'Advanced JavaScript Concepts',
  //     status: 'pending',
  //     date: '2024-01-14 3:45 PM',
  //     avatar: '/src/assets/user-avatar.jpg'
  //   },
  //   {
  //     id: 3,
  //     author: 'Carol Davis',
  //     email: 'carol@example.com',
  //     content: 'This is spam content with promotional links.',
  //     postTitle: 'CSS Grid vs Flexbox',
  //     status: 'spam',
  //     date: '2024-01-13 8:20 AM',
  //     avatar: '/src/assets/user-avatar.jpg'
  //   },
  //   {
  //     id: 4,
  //     author: 'David Wilson',
  //     email: 'david@example.com',
  //     content: 'Excellent tutorial! The examples are very clear and easy to follow. Thank you for sharing this knowledge.',
  //     postTitle: 'Building Responsive Websites',
  //     status: 'approved',
  //     date: '2024-01-12 2:15 PM',
  //     avatar: '/src/assets/user-avatar.jpg'
  //   },
  //   {
  //     id: 5,
  //     author: 'Eva Brown',
  //     email: 'eva@example.com',
  //     content: 'Could you please elaborate more on the performance implications?',
  //     postTitle: 'Getting Started with React Hooks',
  //     status: 'pending',
  //     date: '2024-01-11 11:00 AM',
  //     avatar: '/src/assets/user-avatar.jpg'
  //   }
  // ];



  const filteredComments = comments.filter(comment => {
    const matchesSearch = comment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || comment.isApproved === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case true:
        return 'bg-green-100 text-green-800';
      case false:
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = async (commentId) => {
    setIsLoading(true);
    console.log('test console')
    try {
      const { data } = await axios.post(backend_url + '/api/v1/comment/toggle-approve', {id: commentId}, {headers:{'token': token}});
      if(data.success){
        toast.success(data.message);
      }else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false);
      fetchComments();
    }
  };

  const handleReject = async (commentId) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(backend_url + '/api/v1/comment/toggle-approve', {id: commentId}, {headers:{'token': token}});
      if(data.success){
        toast.success(data.message);
      }else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false);
      fetchComments();
    }
    console.log('Reject comment:', commentId);
  };
  
  const deleteComment = async (id) => {
    setIsDeleting(true)
    try {
      const { data } = await axios.post(backend_url + '/api/v1/comment/delete-comment', {id}, {headers:{'token': token}});
      if(data.success){
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.message(error.message)
    }finally{
      fetchComments()
      setIsDeleting(false)
    }
  }

  useEffect(()=> {
    fetchComments();
  },[])

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
                  <option  value="all">All Comments</option>
                  <option value={true}>Approved</option>
                  <option value={false}>Pending</option>
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
            <div key={comment._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
                      <h4 className="text-sm font-medium text-gray-900">{comment.name}</h4>
                      <div className='flex gap-2'>
                        <span className="text-sm text-gray-500">•</span>
                        {/* <span className="text-sm text-gray-500">{comment.email}</span> */}
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(comment.isApproved)}`}>
                        {comment.isApproved ? 'Approved' : 'Pending'}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{moment(comment.createdAt).format('YYYY-MM-DD hh:mm A')}</span>
                  </div>

                  <p className="text-gray-700 mb-3 text-wrap">{comment.content}</p>

                  <div className="flex items-center justify-between max-lg:flex-col max-lg:items-start">
                    <div className="text-sm text-gray-500">
                      On: <span className="font-medium">{comment.blog.title}</span>
                    </div>

                    {/* Actions */}
                    <div className={`flex space-x-2 ${comment.isApproved ? 'items-end gap-y-2': ''}`}>
                      {
                        !comment.isApproved ? (
                          <div className='flex gap-2'>
                            <div>
                              <button
                                onClick={() => handleApprove(comment._id)}
                                className="flex items-center cursor-pointer hover:scale-105 active:scale-100 duration-100 space-x-1 px-3 py-1 text-sm text-green-600 border border-green-300 rounded-lg hover:bg-green-50 transition-colors"
                              >
                                <Check size={14} />
                                <span>{isLoading ? 'Approving...' : 'Approve'}</span>
                              </button>
                            </div>
                          </div>

                        ) : (
                          <div>
                            <button
                              onClick={() => handleReject(comment._id)}
                              className="flex cursor-pointer hover:scale-105 active:scale-100 duration-100 items-center space-x-1 px-3 py-1 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                            >
                              <X size={14} />
                              <span>{isLoading ? 'Disapproving...' : 'Reject'}</span>
                            </button>
                          </div>
                        )
                      }
                      <div>
                        <button disabled={isDeleting}  onClick={()=> deleteComment(comment._id)}>
                          {
                            isDeleting ? (
                              'deleting...'
                            ): (
                              <Trash className='w-4 cursor-pointer hover:scale-105 active:scale-100 duration-100' />
                            )
                          }
                        </button>
                      </div>
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

