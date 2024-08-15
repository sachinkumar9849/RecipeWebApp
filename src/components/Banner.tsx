import React from "react";
import BannerImg from "../../public/image/banner.jpg";
import Image from "next/image";

interface BannerProps {
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
}

const Banner: React.FC<BannerProps> = ({
  searchQuery,
  onSearchChange,
  loading,
}) => {
  return (
    <div className="relative">
      <div className="bannerWraps relative">
        <Image
          src={BannerImg}
          alt="Logo"
          objectFit="cover"
          className="banner-image"
        />
      </div>

      <input
        type="text"
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search for recipes..."
        className="searchBox px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
        disabled={loading}
      />
    </div>
  );
};

export default Banner;
