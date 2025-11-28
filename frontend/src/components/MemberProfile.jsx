import { useState } from "react";

export default function MemberProfile({
  initialName = "Member Name",
  initialEmail = "email@example.com",
  initialAvatar = "",
}) {
  const [name] = useState(initialName);
  const [email] = useState(initialEmail);
  const [avatar, setAvatar] = useState(initialAvatar);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setAvatar(imageUrl);
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center">
      {/* Avatar */}
      <div className="relative">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center text-gray-500 text-xl">
            {name.charAt(0).toUpperCase()}
          </div>
        )}

        {/* Hidden file input */}
        <label className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-blue-700">
          Edit
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Name & email */}
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold text-gray-800">{name}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
    </div>
  );
}
