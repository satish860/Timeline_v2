export default function Loading() {
  // Stack uses React Suspense, which will render this page while user data is being fetched.
  // See: https://nextjs.org/docs/app/api-reference/file-conventions/loading
  return <>
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="flex space-x-2">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="w-4 h-4 bg-green-400 rounded-full animate-grow"
            style={{ animationDelay: `${index * 0.15}s` }}
          ></div>
        ))}
      </div>
      <p className="mt-4 text-lg font-semibold text-gray-700">
        Loading Page...
      </p>
    </div>
  </>;
}
