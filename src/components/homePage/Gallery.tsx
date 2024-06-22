import React from "react";
import SectionTitle from "../SectionTitle";
import Image from "next/image";

function Gallery() {
  return (
    <div className=" px-16 lg:px-[100px]">
      <div className=" underline">
        <SectionTitle text="Our Gallery" colored />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-32">
        <Image
          className="galleryImg"
          width={300}
          height={200}
          style={{ objectFit: "contain" }}
          src={"/gallery1.png"}
          alt="gallery"
        />
        <Image
          className="galleryImg"
          width={300}
          height={200}
          style={{ objectFit: "contain" }}
          src={"/gallery2.png"}
          alt="gallery"
        />
        <Image
          className="galleryImg"
          width={300}
          height={200}
          style={{ objectFit: "contain" }}
          src={"/gallery3.png"}
          alt="gallery"
        />
        <Image
          className="galleryImg"
          width={300}
          height={200}
          style={{ objectFit: "contain" }}
          src={"/gallery3.png"}
          alt="gallery"
        />
        <Image
          className="galleryImg"
          width={300}
          height={200}
          style={{ objectFit: "contain" }}
          src={"/gallery3.png"}
          alt="gallery"
        />
        <Image
          className="galleryImg"
          width={300}
          height={200}
          style={{ objectFit: "contain" }}
          src={"/gallery3.png"}
          alt="gallery"
        />
        <Image
          className="galleryImg"
          width={300}
          height={200}
          style={{ objectFit: "contain" }}
          src={"/gallery3.png"}
          alt="gallery"
        />
      </div>
    </div>
  );
}

export default Gallery;
