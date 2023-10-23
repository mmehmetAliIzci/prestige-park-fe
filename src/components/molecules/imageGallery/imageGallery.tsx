'use client'
import Image from "next/image";
import { useMemo, useState } from "react";
import { Modal } from "../modal/Modal";

function getFirstThreeImages(images: string[]) {
  let imagesToBeShown = [
    "./parking-placeholder.webp",
    "./parking-placeholder.webp",
    "./parking-placeholder.webp",
  ];

  for (let i = 0; i < imagesToBeShown.length; i++) {
    if (images[i] !== undefined) {
      imagesToBeShown[i] = images[i];
    }
  }
  return imagesToBeShown;
}

const ImageGallery = ({ images }: { images: string[] }) => {
  const firstThreeImages = useMemo(() => getFirstThreeImages(images), [images]);
  const [showModal, setShowModal] = useState(false);

  const handleImageClick = () => {
    console.warn('chai')
    setShowModal(true);
  }
  return (
    <>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-2 md:gap-2">
      <div className="h-32 md:h-full rounded-lg bg-gray-200 md:row-span-2 relative hover:bg-gray-300 cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300" onClick={handleImageClick}>
        <Image
          alt="first-parking-image"
          src={firstThreeImages[0]}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 rounded-lg"
        />
      </div>
      <div className="hidden md:h-32 md:rounded-lg md:bg-gray-200 md:relative md:hover:bg-gray-300 md:cursor-pointer md:hover:shadow-lg md:transform md:hover:scale-105 md:transition md:duration-300" onClick={handleImageClick} >
        <Image
          alt="second-parking-image"
          src={firstThreeImages[1]}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 rounded-lg"
        />
      </div>
      <div className="hidden md:h-32 md:rounded-lg md:bg-gray-200 md:relative md:hover:bg-gray-300 md:cursor-pointer md:hover:shadow-lg md:transform md:hover:scale-105 md:transition md:duration-300" onClick={handleImageClick}>
        <Image
          alt="third-parking-image"
          src={firstThreeImages[2]}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 rounded-lg"
        />
      </div>
    </div>
    <Modal show={true} onClose={function <T>(event?: T | undefined): void {
        throw new Error("Function not implemented.");
      }}>Is this working?</Modal>
    </>
    
  );
};

export default ImageGallery;
