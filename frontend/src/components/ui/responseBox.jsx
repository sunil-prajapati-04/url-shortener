import { useState } from "react";
import { useUrlStore } from "../../store/urlStore";
import { BookCopy, Check } from "lucide-react";

const ResponseBox = () => {
  const { yourUrl } = useUrlStore();
  const [copy, setCopy] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(yourUrl);
      setCopy(true);
      setTimeout(() => setCopy(false), 2000);
    } catch (error) {
      console.log("failed to copy", error);
    }
  };

  return (
    <div className="mt-6 w-full max-w-lg">
      <div className="flex items-center justify-between bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-md rounded-xl px-4 py-3 transition-all hover:shadow-lg">
        
        {/* Short URL text */}
        <div className="truncate text-blue-600 dark:text-blue-400 font-medium text-sm sm:text-base max-w-[80%]">
          {yourUrl}
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          title={copy ? "Copied!" : "Copy URL"}
        >
          {copy ? (
            <Check className="text-green-500 w-5 h-5" />
          ) : (
            <BookCopy className="text-gray-600 dark:text-gray-300 w-5 h-5" />
          )}
        </button>
      </div>

      {/* Copy confirmation text */}
      {copy && (
        <p className="text-green-600 dark:text-green-400 text-xs mt-2 text-center">
          ✅ Link copied to clipboard
        </p>
      )}
    </div>
  );
};

export default ResponseBox;
