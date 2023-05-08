import Image from "next/image";
import { FC } from "react";

const Avatar: FC<{ src: string; dimensions: number }> = ({
  src,
  dimensions,
}) => (
  <div className="avatar">
    <div className="w-8 sm:w-12 rounded-full">
      <Image src={src} alt="" width={dimensions} height={dimensions} />
    </div>
  </div>
);

export default Avatar;
