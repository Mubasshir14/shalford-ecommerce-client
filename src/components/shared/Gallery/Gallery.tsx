/* eslint-disable @typescript-eslint/no-unused-vars */

// "use client";

// import { getAllGallerys } from "@/components/Services/Gallery";
// import React, { useEffect, useState } from "react";
// import { RowsPhotoAlbum, RowsPhotoAlbumProps } from "react-photo-album";
// import "react-photo-album/rows.css";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";

// interface GalleryItem {
//   id: string;
//   image: string;
// }

// interface Photo {
//   src: string;
//   width: number;
//   height: number;
//   alt?: string;
// }

// // Extend RowsPhotoAlbumProps to include renderPhoto
// interface CustomRowsPhotoAlbumProps extends RowsPhotoAlbumProps<Photo> {
//   renderPhoto?: (props: {
//     photo: Photo;
//     imageProps: { src: string; alt?: string; style: React.CSSProperties };
//   }) => React.JSX.Element;
// }

// const Gallery = () => {
//   const [photos, setPhotos] = useState<Photo[]>([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchGallery = async () => {
//       try {
//         const res = await getAllGallerys();
//         if (res?.data?.length > 0) {
//           const first14 = res.data.slice(0, 14) as GalleryItem[];
//           const loadImages = await Promise.all(
//             first14.map(
//               (item: GalleryItem) =>
//                 new Promise<Photo>((resolve) => {
//                   const img = new window.Image();
//                   img.src = item.image;
//                   img.onload = () => {
//                     resolve({
//                       src: item.image,
//                       width: img.naturalWidth,
//                       height: img.naturalHeight,
//                       alt: `Gallery image ${item.id}`,
//                     });
//                   };
//                   img.onerror = () => {
//                     resolve({
//                       src: item.image,
//                       width: 800,
//                       height: 600,
//                       alt: `Gallery image ${item.id}`,
//                     });
//                   };
//                 })
//             )
//           );
//           setPhotos(loadImages);
//         }
//       } catch (err) {
//         console.error("Gallery load error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGallery();
//   }, []);

//   // Custom render function for photos to add click and hover effects
//   const renderPhoto = ({
//     photo,
//     imageProps: { src, alt, style },
//   }: {
//     photo: Photo;
//     imageProps: { src: string; alt?: string; style: React.CSSProperties };
//   }) => (
//     <div
//       className="relative overflow-hidden rounded-lg cursor-pointer group"
//       onClick={() => router.push("/products")}
//       onKeyDown={(e) => {
//         if (e.key === "Enter" || e.key === " ") {
//           router.push("/products");
//         }
//       }}
//       tabIndex={0}
//       role="button"
//       aria-label={`View products for ${alt || "gallery image"}`}
//     >
//       <Image
//         src={src}
//         alt={alt || "Gallery image"}
//         width={photo.width}
//         height={photo.height}
//         className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg"
//         style={{ ...style, transformOrigin: "center" }}
//       />
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto  px-2 md:px-6">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {Array.from({ length: 8 }).map((_, index) => (
//             <Link
//               href={"/products"}
//               key={index}
//               className="w-full h-48 bg-gray-200 animate-pulse rounded-lg"
//             ></Link>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto  px-2 md:px-6 rounded-xl font-sansita">
//       <h1 className="text-3xl font-bold mb-8 text-center text-amber-700 tracking-wide">
//        Gallery
//       </h1>
//       <Link href={"/products"}>
//         <RowsPhotoAlbum
//           photos={photos}
//           // renderPhoto={renderPhoto as any}
//           sizes={{
//             size: "1168px",
//             sizes: [
//               { viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" },
//             ],
//           }}
//         />
//         {/* Global styles to ensure hover effect */}
//         <style jsx global>{`
//           .react-photo-album--photo img {
//             transition: transform 0.3s ease-in-out !important;
//             border-radius: 14px;
//           }
//           .react-photo-album--photo:hover img {
//             transform: scale(1.05) !important;
//             box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
//           }
//         `}</style>
//       </Link>
//     </div>
//   );
// };

// export default Gallery;

"use client";

import { getAllGallerys } from "@/components/Services/Gallery";
import React, { useEffect, useState } from "react";
import { RowsPhotoAlbum, RowsPhotoAlbumProps } from "react-photo-album";
import "react-photo-album/rows.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface GalleryItem {
  id: string;
  image: string;
  link?: string; // optional popup link
}

interface Photo {
  src: string;
  width: number;
  height: number;
  alt?: string;
  link?: string; // optional link per photo
}

// Extend RowsPhotoAlbumProps to include renderPhoto
interface CustomRowsPhotoAlbumProps extends RowsPhotoAlbumProps<Photo> {
  renderPhoto?: (props: {
    photo: Photo;
    imageProps: { src: string; alt?: string; style: React.CSSProperties };
  }) => React.JSX.Element;
}

const Gallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await getAllGallerys();
        if (res?.data?.length > 0) {
          const first14 = res.data.slice(0, 14) as GalleryItem[];
          const loadImages = await Promise.all(
            first14.map(
              (item: GalleryItem) =>
                new Promise<Photo>((resolve) => {
                  const img = new window.Image();
                  img.src = item.image;
                  img.onload = () => {
                    resolve({
                      src: item.image,
                      width: img.naturalWidth,
                      height: img.naturalHeight,
                      alt: `Gallery image ${item.id}`,
                      link: item.link,
                    });
                  };
                  img.onerror = () => {
                    resolve({
                      src: item.image,
                      width: 800,
                      height: 600,
                      alt: `Gallery image ${item.id}`,
                      link: item.link,
                    });
                  };
                })
            )
          );
          setPhotos(loadImages);
        }
      } catch (err) {
        console.error("Gallery load error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Custom render function for photos to handle click & hover
  const renderPhoto = ({
    photo,
    imageProps: { src, alt, style },
  }: {
    photo: Photo;
    imageProps: { src: string; alt?: string; style: React.CSSProperties };
  }) => (
    <div
      className="relative overflow-hidden rounded-lg cursor-pointer group"
      onClick={() => router.push(photo.link?.trim() ? photo.link : "/products")}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          router.push(photo.link?.trim() ? photo.link : "/products");
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View products for ${alt || "gallery image"}`}
    >
      <Image
        src={src}
        alt={alt || "Gallery image"}
        width={photo.width}
        height={photo.height}
        className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg"
        style={{ ...style, transformOrigin: "center" }}
      />
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-2 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-48 bg-gray-200 animate-pulse rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-6 rounded-xl font-sansita">
      <h1 className="text-3xl font-bold mb-8 text-center text-amber-700 tracking-wide">
        Gallery
      </h1>
      <RowsPhotoAlbum
        photos={photos}
        // renderPhoto={renderPhoto as any} // typecasting
        sizes={{
          size: "1168px",
          sizes: [{ viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" }],
        }}
      />
      {/* Global styles for hover effect */}
      <style jsx global>{`
        .react-photo-album--photo img {
          transition: transform 0.3s ease-in-out !important;
          border-radius: 14px;
        }
        .react-photo-album--photo:hover img {
          transform: scale(1.05) !important;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default Gallery;

