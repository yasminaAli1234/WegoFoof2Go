// import React from "react";

// const UserHomePage = () => {
//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <header className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 shadow-md rounded-lg mb-6">
//         <div>
//           <h1 className="text-2xl font-semibold">Welcome back, [User Name]!</h1>
//           <p className="text-gray-200">Here’s an overview of your dashboard</p>
//         </div>
//         <button className="bg-white text-blue-600 px-5 py-2 rounded shadow hover:bg-gray-200 transition">
//           Create Store
//         </button>
//       </header>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {/* Subscription Plan Section */}
//         <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
//           <h2 className="text-lg font-semibold text-gray-700 mb-2">Your Plan</h2>
//           <p className="text-gray-500 mb-4">Plan: <strong>Basic</strong> (Expires in 10 days)</p>
//           <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
//             Upgrade Plan
//           </button>
//         </div>

//         {/* Store Overview */}
//         <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
//           <h2 className="text-lg font-semibold text-gray-700 mb-2">Your Stores</h2>
//           <ul className="space-y-2 mb-4">
//             <li className="flex justify-between text-gray-600">
//               <span>Store Name 1</span>
//               <button className="text-blue-500 hover:underline">Manage</button>
//             </li>
//             <li className="flex justify-between text-gray-600">
//               <span>Store Name 2</span>
//               <button className="text-blue-500 hover:underline">Manage</button>
//             </li>
//           </ul>
//           <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
//             Create New Store
//           </button>
//         </div>

//         {/* Domain Requests */}
//         <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
//           <h2 className="text-lg font-semibold text-gray-700 mb-2">Domain Requests</h2>
//           <p className="text-gray-500 mb-4">You have <strong>1</strong> pending request</p>
//           <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
//             Request New Domain
//           </button>
//         </div>

//         {/* Extra Products */}
//         <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
//           <h2 className="text-lg font-semibold text-gray-700 mb-4">Extra Products</h2>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="flex flex-col items-center">
//               <img
//                 src="https://via.placeholder.com/150"
//                 alt="Product"
//                 className="w-20 h-20 mb-2"
//               />
//               <button className="text-blue-500 hover:underline">Buy Now</button>
//             </div>
//             <div className="flex flex-col items-center">
//               <img
//                 src="https://via.placeholder.com/150"
//                 alt="Product"
//                 className="w-20 h-20 mb-2"
//               />
//               <button className="text-blue-500 hover:underline">Buy Now</button>
//             </div>
//           </div>
//         </div>

//         {/* Tutorials */}
//         <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
//           <h2 className="text-lg font-semibold text-gray-700 mb-4">Learn and Grow</h2>
//           <ul className="space-y-2">
//             <li className="text-blue-500 hover:underline">How to set up your store</li>
//             <li className="text-blue-500 hover:underline">Best practices for marketing</li>
//             <li className="text-blue-500 hover:underline">Managing domains effectively</li>
//           </ul>
//           <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition">
//             Explore Tutorials
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserHomePage;


import React from "react";

const UserHomePage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 shadow-md rounded-lg mb-6">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-semibold">Welcome back, [User Name]!</h1>
          <p className="text-gray-200">Here’s an overview of your dashboard</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
          <button className="bg-white text-blue-600 px-5 py-2 rounded shadow hover:bg-gray-200 transition">
            Create Store
          </button>
          <button className="bg-mainColor text-white px-5 py-2 rounded shadow hover:bg-blue-600 transition">
            Request Demo
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Subscription Plan Section */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Your Plan</h2>
          <p className="text-gray-500 mb-4">Plan: <strong>Basic</strong> (Expires in 10 days)</p>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
            Upgrade Plan
          </button>
        </div>

        {/* Store Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Your Stores</h2>
          <ul className="space-y-2 mb-4">
            <li className="flex justify-between text-gray-600">
              <span>Store Name 1</span>
              <button className="text-blue-500 hover:underline">Manage</button>
            </li>
            <li className="flex justify-between text-gray-600">
              <span>Store Name 2</span>
              <button className="text-blue-500 hover:underline">Manage</button>
            </li>
          </ul>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Create New Store
          </button>
        </div>

        {/* Domain Requests */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Domain Requests</h2>
          <p className="text-gray-500 mb-4">You have <strong>1</strong> pending request</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Request New Domain
          </button>
        </div>

        {/* Extra Products */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Extra Products</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Product"
                className="w-20 h-20 mb-2"
              />
              <button className="text-blue-500 hover:underline">Buy Now</button>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Product"
                className="w-20 h-20 mb-2"
              />
              <button className="text-blue-500 hover:underline">Buy Now</button>
            </div>
          </div>
        </div>

        {/* Tutorials */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Learn and Grow</h2>
          <ul className="space-y-2">
            <li className="text-blue-500 hover:underline">How to set up your store</li>
            <li className="text-blue-500 hover:underline">Best practices for marketing</li>
            <li className="text-blue-500 hover:underline">Managing domains effectively</li>
          </ul>
          <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition">
            Explore Tutorials
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
