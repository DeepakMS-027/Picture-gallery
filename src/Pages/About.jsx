import React from "react";

export const About = () => {
  return (
    <div className="pt-20 px-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">About This App</h1>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 leading-relaxed">
        <p className="text-gray-700 mb-4">
          Welcome to <span className="font-semibold text-blue-600">Your Photos & Videos</span> — 
          a simple and elegant web app that helps you store, view, and organize 
          your favorite moments effortlessly.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          🌟 Key Features
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Upload both photos and videos directly from your device.</li>
          <li>Automatically groups files by month and year.</li>
          <li>Displays media in a beautiful masonry-style layout.</li>
          <li>Responsive design — works smoothly on all screen sizes.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          🛠️ Built With
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>React.js for building fast and dynamic UI.</li>
          <li>Tailwind CSS for modern, responsive styling.</li>
          <li>Browser APIs (like <code>URL.createObjectURL</code>) for handling local uploads.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          💡 Future Improvements
        </h2>
        <p className="text-gray-700 mb-4">
          We plan to add cloud storage, login authentication, and the ability 
          to edit or delete uploads — making your gallery even more personalized.
        </p>

        <p className="text-gray-700 mt-6 italic text-center">
           by Deepak — October 2025
        </p>
      </div>
    </div>
  );
};
