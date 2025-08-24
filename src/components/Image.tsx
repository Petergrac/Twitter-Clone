import { Image, ImageKitProvider } from "@imagekit/next";
type ImageType = {
  src: string;
  w?: number;
  h?: number;
  alt: string;
  className?: string;
  tr?: boolean;
};
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const CustomImage = ({ src, w, h, alt, className, tr }: ImageType) => {
  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>
      <Image
        src={src}
        alt={alt}
        width={w}
        height={h}
        className={className}
        {...(tr
          ? { transformation: [{ width: `${w}`, height: `${h}` }] }
          : { width: w, h: h })}
      />
    </ImageKitProvider>
  );
};

export default CustomImage;
