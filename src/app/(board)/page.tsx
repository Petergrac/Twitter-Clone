import Feed from "@/components/Feed";
import Shared from "@/components/Shared";
import Link from "next/link";

export default function HomePage() {

  return (
    <div>
      <div className="flex justify-around  md:justify-between text-textGray font-bold border-b-[1px] border-borderGray">
        <Link
          href="/"
          className="pb-3 pt-4 flex items-center border-b-4 border-iconBlue"
        >
          For you
        </Link>
        <Link href="/" className="pb-3 pt-4 flex  items-center">
          Following
        </Link>
        <Link href="/" className="pb-3 hidden md:flex pt-4 items-center">
          ReactJS
        </Link>
        <Link href="/" className="pb-3 hidden md:flex pt-4 items-center">
          CSS
        </Link>
        <Link href="/" className="pb-3 hidden md:flex pt-4 items-center">
          JavaScript
        </Link>
      </div>
      <Shared />
      <Feed />
    </div>
  );
}
