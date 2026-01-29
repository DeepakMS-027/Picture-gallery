import React, { useState } from "react";

export const Memories = () => {
  const [albums, setAlbums] = useState({
    "Vacation 2025": [
      { id: 1, url: "1.mp4", type: "video", date: "2025-10-10" },
      { id: 2, url: "2.mp4", type: "video", date: "2025-10-10" },
      { id: 3, url: "3.jpg", type: "image", date: "2025-10-10" },
      { id: 4, url: "4.mp4", type: "video", date: "2025-10-10" },
      { id: 5, url: "5.jpg", type: "image", date: "2025-10-10" },
      { id: 6, url: "6.jpg", type: "image", date: "2025-10-10" },
    ],
    "Festival": [
      { id: 5, url: "5.jpg", type: "image", date: "2025-10-10" },
      { id: 6, url: "6.jpg", type: "image", date: "2025-10-10" },
      { id: 7, url: "7.jpg", type: "image", date: "2025-10-10" },
      { id: 8, url: "8.jpg", type: "image", date: "2025-10-10" },
      { id: 9, url: "9.jpg", type: "image", date: "2025-10-10" },
      { id: 10, url: "10.jpg", type: "image", date: "2025-10-10" },
      { id: 11, url: "11.mp4", type: "video", date: "2025-10-10" },
      { id: 12, url: "12.jpg", type: "image", date: "2025-10-10" },
    ],
  });

  const [expandedAlbums, setExpandedAlbums] = useState({});
  const [newAlbumName, setNewAlbumName] = useState("");
  const [newFile, setNewFile] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState("");

  // Toggle album open/close
  const toggleAlbum = (albumName) => {
    setExpandedAlbums((prev) => ({
      ...prev,
      [albumName]: !prev[albumName],
    }));
  };

  const handleAddAlbum = () => {
    if (!newAlbumName) return alert("Enter album name!");
    setAlbums((prev) => ({ ...prev, [newAlbumName]: [] }));
    setNewAlbumName("");
  };

  const handleAddMedia = (e) => {
    e.preventDefault();
    if (!newFile || !selectedAlbum) return alert("Select file and album!");

    const url = URL.createObjectURL(newFile);
    const type = newFile.type.startsWith("video") ? "video" : "image";

    setAlbums((prev) => ({
      ...prev,
      [selectedAlbum]: [...prev[selectedAlbum], { id: Date.now(), url, type }],
    }));

    setNewFile(null);
  };

  return (
    <div className="pt-20 px-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Your Memories</h1>

      {/* Create Album */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <input
          type="text"
          placeholder="New Album Name"
          value={newAlbumName}
          onChange={(e) => setNewAlbumName(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
        />
        <button
          onClick={handleAddAlbum}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create Album
        </button>
      </div>

      {/* Upload Media */}
      <form
        onSubmit={handleAddMedia}
        className="flex flex-wrap gap-3 mb-8 items-center"
      >
        <select
          value={selectedAlbum}
          onChange={(e) => setSelectedAlbum(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
        >
          <option value="">Select Album</option>
          {Object.keys(albums).map((album) => (
            <option key={album} value={album}>
              {album}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setNewFile(e.target.files[0])}
          className="border border-gray-300 p-2 rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Media
        </button>
      </form>

      {/* Albums Display */}
      <div className="space-y-6">
        {Object.keys(albums).map((album) => (
          <div key={album} className="bg-white rounded-lg shadow-md">
            {/* Album Header */}
            <div
              className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-gray-100 transition"
              onClick={() => toggleAlbum(album)}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">
                  {expandedAlbums[album] ? "📂" : "📁"}
                </span>
                <span className="font-semibold text-gray-800">{album}</span>
              </div>
              <span className="text-gray-500">
                {expandedAlbums[album] ? "−" : "+"}
              </span>
            </div>

            {/* Album Content */}
            {expandedAlbums[album] && (
              <div className="p-4 masonry">
                {albums[album].map((item) => (
                  <div
                    key={item.id}
                    className="masonry-item overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition mb-3"
                  >
                    {item.type === "video" ? (
                      <video
                        src={item.url}
                        controls
                        className="w-full h-auto object-cover rounded-lg"
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt={`media-${item.id}`}
                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Masonry CSS */}
      <style jsx>{`
        .masonry {
          column-count: 3;
          column-gap: 16px;
        }
        .masonry-item {
          break-inside: avoid;
        }
        @media (max-width: 1024px) {
          .masonry {
            column-count: 2;
          }
        }
        @media (max-width: 640px) {
          .masonry {
            column-count: 1;
          }
        }
      `}</style>
    </div>
  );
};
