import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Upload, Save, Eye } from 'lucide-react';
import axios from 'axios';
import { useAppContext } from '../context/ContentProvider';
import toast from 'react-hot-toast';

const AddBlog = () => {
  
  const {backend_url, token} = useAppContext();


  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [published, setPublish] = useState(false);
  const [image, setImage] = useState('');
  const [isAdding, setIsAdding] = useState(false);



  const handleSubmit = async(e) => {
    e.preventDefault()
    setIsAdding(true)
    try {
      const formData = new FormData();

      formData.append('title', title);
      formData.append('subTitle', subTitle);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('published', published); // If it's a boolean, consider converting to string
      formData.append('image', image); // Should be a File or Blob object

      const {data} = await axios.post(backend_url + '/api/v1/blog/create-blog', formData, {headers:{'token': token}});

      if(data.success){
        toast.success(data.message)
      }else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsAdding(false);
    }
  };

  return (
    <Layout title="Add New Blog Post" subtitle="Create and publish your blog content">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-">
          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 max-sm:p-2 p-6">
            <div className="space-y-6">
              {/* Title */}
              <div className='flex flex-col items-start w-full'>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                  placeholder="Enter your blog title..."
                  className="min-w-44 w-full flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Category and Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                    Sub-Title
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={subTitle}
                    onChange={(e)=>setSubTitle(e.target.value)}

                    placeholder="Enter blog sub-title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}
                    className="min-w-44 flex-1 text-sm w-full shrink px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    <option value="technology">Technology</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="business">Business</option>
                    <option value="health">Health</option>
                    <option value="travel">Travel</option>
                  </select>
                </div>

              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="image-upload" className="cursor-pointer flex justify-center flex-col gap-2">
                      {
                        image ? <img className='max-w-54 rounded-sm' src={URL.createObjectURL(image)} alt="" /> 
                        :
                        <>
                        <span className="mt-2 block text-sm font-medium text-gray-900">
                          Upload an image
                        </span>
                        <span className="mt-1 block text-sm text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </span>
                        </>
                      }
                      
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e)=>setImage(e.target.files[0])}
                      className="hidden"
                    />
                  </div>
                </div>
                {/* {formData.featuredImage && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected: {formData.featuredImage.name}
                  </p>
                )} */}
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}
                  rows={12}
                  placeholder="Write your blog description here..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                  required
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-end justify-between max-sm:flex-col gap-y-2 gap-2 max-sm:justify-start max-sm:items-start">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={published}
                  onChange={(e)=>setPublish(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option defaultValue={false} value={false}>unpublish</option>
                  <option value={true}>Publish</option>
                </select>
              </div>

              <div className="flex space-x-3 items-end">
                <button
                  type="button"
                  className=" hidden items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Eye size={16} />
                  <span>Preview</span>
                </button>
                <button
                  disabled={isAdding}
                  type="submit"
                  className="flex cursor-pointer items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Save size={16} />
                  <span className='text-sm'>{isAdding ? 'Uploading...' : 'Upload Blog'}</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddBlog;

