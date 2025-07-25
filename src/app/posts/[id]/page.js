"use client";

import { useParams } from "next/navigation";
import PostImageSelector from "@/components/images/PostImageSelector";
import { Posts } from "@/data/posts/posts";

export default function PostPage() {
  const params = useParams(); // Get params correctly in Next.js
  const id = params?.id; // Ensure `params` exists

  // Find the post by ID safely
  const post = Posts.find((post) => String(post.id) === String(id));

  if (!post) {
    return (
      <div className="text-center text-red-500 text-2xl mt-12">
        Post not found
      </div>
    );
  }

  return (
    <div className="post-details bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center flex flex-col items-center gap-4">
          <h1 className="text-xl md:text-4xl font-bold">{post.titleAr}</h1>
          <p className="text-gray-600 text-sm md:text-base">
            {post.shortDescriptionAr}
          </p>
          <div className="w-full">
            <PostImageSelector
              imageId={post.imageId}
              alt={post.titleAr}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div
            className="prose prose-sm md:prose-lg mt-6 w-full text-start"
            dangerouslySetInnerHTML={{ __html: post.descriptionAr }}
          />
        </div>
      </div>
    </div>
  );
}
