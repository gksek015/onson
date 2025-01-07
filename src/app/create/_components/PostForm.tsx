interface Props {
    categories: string[];
  }

const PostForm= ({categories} : Props) => {
    return (
        <form className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              제목
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
    
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              주소
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="지역 선택"
              readOnly
            />
          </div>
    
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              봉사 종류
            </label>
            <select
              id="category"
              name="category"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {categories?.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
    
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              날짜
            </label>
            <input
              type="text"
              id="date"
              name="date"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="날짜 선택"
              readOnly
            />
          </div>
    
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              본문 (500자 이내)
            </label>
            <textarea
              id="content"
              name="content"
              rows={4}
              maxLength={500}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          
    
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center border border-gray-300"
            >
              📷
            </button>
          </div>
        </form>
      );
}

export default PostForm