import React, { useState } from "react";
import { CircleUser } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

function ProfilePopup() {
  const { authUser, checkAuth } = useAuthStore();
  const [showBox, setShowBox] = useState(false);

  const handleToggle = () => {
    checkAuth(); // optional, refresh authUser
    setShowBox(!showBox);
  };

  return (
    <div className="relative">
      {/* Circle Button */}
      <button
        onClick={handleToggle}
        className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center shadow-lg transition-all"
      >
        <CircleUser className="w-6 h-6" />
      </button>

      {/* Popup Box */}
      {showBox && authUser && (
        <div className="absolute top-14 right-0 w-56 bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 flex flex-col gap-2 animate-fadeIn z-50">
          <h2 className="font-semibold text-gray-800 dark:text-white text-lg">
            {authUser.username}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{authUser.email}</p>
        </div>
      )}

      {/* Tailwind Animation */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default ProfilePopup;
