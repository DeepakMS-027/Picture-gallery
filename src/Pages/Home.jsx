import React, { useState } from "react";

export const Home = () => {
  const [mediaByMonth, setMediaByMonth] = useState({
    "October 2025": [
      { id: 1, url: "1.mp4", type: "video", date: "2025-10-10" },
      { id: 2, url: "2.mp4", type: "video", date: "2025-10-10" },
      { id: 3, url: "3.jpg", type: "image", date: "2025-10-10" },
      { id: 4, url: "4.mp4", type: "video", date: "2025-10-10" },
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

  const [newFile, setNewFile] = useState(null);
  const [newDate, setNewDate] = useState("");

  const formatMonthYear = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  const handleAddMedia = (e) => {
    e.preventDefault();
    if (!newFile || !newDate) return alert("Select a file and date!");

    const url = URL.createObjectURL(newFile);
    const type = newFile.type.startsWith("video") ? "video" : "image";
    const monthYear = formatMonthYear(newDate);

    setMediaByMonth((prev) => ({
      ...prev,
      [monthYear]: [...(prev[monthYear] || []), { id: Date.now(), url, type, date: newDate }],
    }));

    setNewFile(null);
    setNewDate("");
  };

  return (
    <div className="pt-20 px-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        Your Photos & Videos
      </h1>

      {/* Upload Form */}
      <form
        onSubmit={handleAddMedia}
        className="flex flex-wrap gap-3 mb-8 items-center"
      >
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setNewFile(e.target.files[0])}
          className="border border-gray-300 p-2 rounded-md"
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Media
        </button>
      </form>

      {/* Display Section */}
      <div className="space-y-10">
        {Object.keys(mediaByMonth)
          .sort((a, b) => new Date(b) - new Date(a))
          .map((monthYear) => (
            <div key={monthYear}>
              <h2 className="text-xl font-semibold mb-3 text-gray-700">
                {monthYear}
              </h2>

              {/* Masonry Grid using CSS Columns */}
              <div className="masonry">
                {mediaByMonth[monthYear].map((item) => (
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
            </div>
          ))}
      </div>

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
