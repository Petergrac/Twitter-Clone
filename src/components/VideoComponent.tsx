"use client";
import { Video as IKVideo } from "@imagekit/next";
interface VideoType {
  path: string;
  className: string;
}
export default function Video({ path, className }: VideoType) {
  const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
  return (
    <IKVideo
      urlEndpoint={urlEndpoint}
      src={path}
      controls
      className={className}
      transformation={[
        { width: 1920, height: 1080, quality: 90 },
        {
          raw: "l-text,i-Peter,fs-100,co-white,l-end"
        },
      ]}
    />
  );
}
