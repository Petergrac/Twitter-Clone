"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post";

// Fetching the data from the api endpoint
const fetchPosts = async (pageParams: number, userProfileId?: string) => {
  const res = await fetch(
    `http://localhost:3000/api/posts?cursor=${pageParams}&user=${userProfileId}`
  );
  return res.json();
};

const InfiniteFeed = ({ userProfileId }: { userProfileId?: string }) => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam = 2 }) => fetchPosts(pageParam, userProfileId),
      initialPageParam: 2,
      getNextPageParam: (lastPage, pages) =>
        lastPage.hasMore ? pages.length + 2 : undefined,
    });
  if (isLoading) {
    return <div className="">Loading...</div>;
  }
  if (error) {
    return <div className="">Error occurred and data could not be fetched</div>;
  }
  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];
  return (
    <InfiniteScroll
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<div>Loading....</div>}
      dataLength={allPosts.length}
      endMessage={<p>All posts have been loaded</p>}
    >
      {allPosts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </InfiniteScroll>
    
  );
};

export default InfiniteFeed;
