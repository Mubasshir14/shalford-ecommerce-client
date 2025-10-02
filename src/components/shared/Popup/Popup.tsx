/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import React, { useEffect, useState } from "react";
// import { X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { getAllPopups } from "@/components/Services/Popup";
// import { motion, AnimatePresence } from "framer-motion";

// const Popup = () => {
//   const [visible, setVisible] = useState(false);
//   const [showClose, setShowClose] = useState(false);
//   const [image, setImage] = useState<string | null>(null);

//   useEffect(() => {
//     setVisible(true);

//     const timer = setTimeout(() => {
//       setShowClose(true);
//     }, 5000);

//     const fetchPopups = async () => {
//       try {
//         const res = await getAllPopups();
//         if (res?.data?.length > 0) {
//           setImage(res.data[0].image);
//         }
//       } catch (err) {
//         console.error("Popup load error:", err);
//       }
//     };

//     fetchPopups();

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <AnimatePresence>
//       {visible && (
//         <motion.div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             className="relative rounded-2xl shadow-lg max-w-lg w-full p-4 "
//             initial={{ scale: 0.7, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.7, opacity: 0 }}
//             transition={{ duration: 0.4, ease: "easeInOut" }}
//           >
//             {image ? (
//               <Image
//                 src={image}
//                 alt="Popup"
//                 width={200}
//                 height={200}
//                 className="rounded-xl w-full h-auto object-cover"
//               />
//             ) : (
//               <p className="text-center text-lg font-semibold">
//                 Loading popup...
//               </p>
//             )}

//             {/* Close Button */}
//             {showClose && (
//               <Button
//                 onClick={() => setVisible(false)}
//                 className="absolute top-3 right-3 bg-amber-500 p-1 rounded-full shadow hover:bg-amber-800"
//               >
//                 <X size={20} />
//               </Button>
//             )}
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default Popup;

"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getAllPopups } from "@/components/Services/Popup";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import Link from "next/link";

interface PopupData {
  id: string;
  image: string;
  link?: string;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const popupVariants: Variants = {
  hidden: { scale: 0.7, opacity: 0, y: 50 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    } as Transition,
  },
};

const Popup = ({ closeDelay = 3000 }) => {
  const [visible, setVisible] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [popup, setPopup] = useState<PopupData | null>(null);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setShowClose(true);
    }, closeDelay);

    const fetchPopups = async () => {
      try {
        const res = await getAllPopups();
        const data: PopupData[] = res?.data;
        if (data?.length > 0) {
          setPopup(data[0]); 
        }
      } catch (err) {
        console.error("Popup load error:", err);
      }
    };

    fetchPopups();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setVisible(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeDelay]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="relative rounded-2xl shadow-xl max-w-lg w-full p-6 "
            variants={popupVariants}
          >
            {popup?.image ? (
              <Link href={popup.link && popup.link.trim() !== "" ? popup.link : "/"}>
                <Image
                  src={popup.image}
                  alt="Promotional popup"
                  width={300}
                  height={300}
                  className="rounded-xl object-cover w-full h-auto"
                  onError={() => setImage(null)}
                />
              </Link>
            ) : (
              <div className="w-full h-[300px] bg-gray-200 animate-pulse rounded-xl flex items-center justify-center">
                <p className="text-gray-500">Loading...</p>
              </div>
            )}

            {showClose && (
              <Button
                onClick={() => setVisible(false)}
                className="absolute top-3 right-3 bg-amber-500 p-1 rounded-full shadow hover:bg-amber-800"
                aria-label="Close popup"
              >
                <X size={20} />
              </Button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
