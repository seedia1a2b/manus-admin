import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  PlusCircle, 
  FileText, 
  MessageCircle, 
  Settings,
  User,
  LogOut
} from 'lucide-react';




const Sidebar = () => {

  const [adminData, setAdminData] = useState([]);


  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login')
  }

  console.log(adminData)


  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: PlusCircle, label: 'Add Blog', path: '/add-blog' },
    { icon: FileText, label: 'All Blogs', path: '/all-blogs' },
    { icon: MessageCircle, label: 'Comments', path: '/comments' },
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(()=>{
    if(localStorage.getItem('AdminData')){
      setAdminData(localStorage.getItem('AdminData'));
    }
  },[])

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? 'w-20' : 'w-64'
    } max-sm:w-20 min-h-screen flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center max-sm:justify-end space-x-2 max-sm:space-x-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="font-semibold text-gray-900 max-sm:hidden">QuickBlog</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-md hover:bg-gray-100 max-sm:hidden"
          >
            <div className="w-4 h-4 flex flex-col justify-center space-y-1">
              <div className="w-full h-0.5 bg-gray-600"></div>
              <div className="w-full h-0.5 bg-gray-600"></div>
              <div className="w-full h-0.5 bg-gray-600"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20}/>
                  {!isCollapsed && <span className="font-medium max-sm:hidden">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 max-sm:p-2 border-t border-gray-200">
        <div className="flex items-center space-x-3 max-sm:justify-center max-sm:space-x-0">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User size={16} className="text-gray-600" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 max-sm:hidden">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              {/* <p className="text-xs text-gray-500">{adminData[0].email}</p> */}
            </div>
          )}
        </div>
        {!isCollapsed && (
          <div className="mt-3 flex space-x-2 max-sm:space-x-0 max-sm:flex-col gap-y-2">
            <button className="flex-1 flex items-center justify-center  space-x-1 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 rounded">
              <Settings size={12} />
              <span className='max-sm:hidden'>Settings</span>
            </button>
            <button onClick={()=> handleLogout ()} className="flex-1 cursor-pointer flex items-center justify-center space-x-1 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 rounded">
              <LogOut size={12} />
              <span className='max-sm:hidden'>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

