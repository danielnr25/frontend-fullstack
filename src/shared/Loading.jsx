const Loading = ({message}) => {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-800 mb-3"></div>
        <p className="text-gray-700 font-medium">{message}</p>
      </div>
    </div>
  )
}

export default Loading