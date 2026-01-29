import React, { useState } from "react";

export const Members = () => {
  // --- Sample Members and Media ---
  const [members, setMembers] = useState({
    Deepak: [
      { id: 1, url: "1.mp4", type: "video", date: "2025-10-10" },
      { id: 2, url: "2.mp4", type: "video", date: "2025-10-10" },
      { id: 3, url: "3.jpg", type: "image", date: "2025-10-10" },
      { id: 4, url: "4.mp4", type: "video", date: "2025-10-10" },
      { id: 5, url: "5.jpg", type: "image", date: "2025-10-10" },
    ],
    Riya: [
      { id: 6, url: "6.jpg", type: "image", date: "2025-10-10" },
      { id: 7, url: "7.jpg", type: "image", date: "2025-10-10" },
      { id: 8, url: "8.jpg", type: "image", date: "2025-10-10" },
      { id: 9, url: "9.jpg", type: "image", date: "2025-10-10" },
    ],
    Arjun: [
      { id: 10, url: "10.jpg", type: "image", date: "2025-10-10" },
      { id: 11, url: "11.mp4", type: "video", date: "2025-10-10" },
      { id: 12, url: "12.jpg", type: "image", date: "2025-10-10" },
    ],
  });

  // --- UI States ---
  const [expandedMembers, setExpandedMembers] = useState({});
  const [newMember, setNewMember] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [newFile, setNewFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // --- Toggle a member’s album open/close ---
  const toggleMember = (name) => {
    setExpandedMembers((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // --- Add new member ---
  const handleAddMember = () => {
    if (!newMember) return alert("Enter member name!");
    if (members[newMember]) return alert("Member already exists!");
    setMembers((prev) => ({ ...prev, [newMember]: [] }));
    setNewMember("");
  };

  // --- Add media for selected member ---
  const handleAddMedia = (e) => {
    e.preventDefault();
    if (!selectedMember || !newFile)
      return alert("Select a member and file first!");

    const url = URL.createObjectURL(newFile);
    const type = newFile.type.startsWith("video") ? "video" : "image";

    setMembers((prev) => ({
      ...prev,
      [selectedMember]: [...(prev[selectedMember] || []), { id: Date.now(), url, type }],
    }));

    setNewFile(null);
  };

  // --- Filter members by search ---
  const filteredMembers = Object.keys(members).filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-20 px-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Members Gallery</h1>

      {/* Add Member */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <input
          type="text"
          placeholder="New Member Name"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
        />
        <button
          onClick={handleAddMember}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Member
        </button>
      </div>

      {/* Upload Media */}
      <form
        onSubmit={handleAddMedia}
        className="flex flex-wrap gap-3 mb-8 items-center"
      >
        <select
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
        >
          <option value="">Select Member</option>
          {Object.keys(members).map((member) => (
            <option key={member} value={member}>
              {member}
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

      {/* Search Box */}
      <input
        type="text"
        placeholder="🔍 Search member..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-2 rounded-md w-full max-w-md mb-8"
      />

      {/* Members List */}
      <div className="space-y-6">
        {filteredMembers.length === 0 ? (
          <p className="text-gray-500 italic">No member found.</p>
        ) : (
          filteredMembers.map((member) => (
            <div key={member} className="bg-white rounded-lg shadow-md">
              {/* Member Header */}
              <div
                className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-gray-100 transition"
                onClick={() => toggleMember(member)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    {expandedMembers[member] ? "📂" : "📁"}
                  </span>
                  <span className="font-semibold text-gray-800">{member}</span>
                </div>
                <span className="text-gray-500">
                  {expandedMembers[member] ? "−" : "+"}
                </span>
              </div>

              {/* Media Grid */}
              {expandedMembers[member] && (
                <div className="p-4 masonry">
                  {members[member].length === 0 ? (
                    <p className="text-gray-500 italic">No uploads yet.</p>
                  ) : (
                    members[member].map((item) => (
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
                    ))
                  )}
                </div>
              )}
            </div>
          ))
        )}
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
