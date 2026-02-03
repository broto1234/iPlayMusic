import Image from "next/image";

interface Props {
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  width: number;
  height: number;
}

export default function FeaturedCard({ image, alt, title, subtitle, width, height }: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <Image
        src={image}
        alt={alt}
        title={title}
        width={width}
        height={height}
        className="object-cover"
      />

      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black/40" /> */}

      {/* Text */}
      <div className="absolute bottom-30 left-10 text-white">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-sm opacity-80">{subtitle}</p>
      </div>
    </div>
  );
}
