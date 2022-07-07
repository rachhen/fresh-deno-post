/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { IPost, postCollection } from "@db";

export const handler: Handlers<IPost[]> = {
  async GET(_req, ctx) {
    const all_posts = await postCollection.find().toArray();

    return ctx.render(all_posts);
  },
};

export default function PostList({ data }: PageProps<IPost[]>) {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <title>Posts</title>
      <div class={tw`flex flex-row items-center justify-between`}>
        <h1 class={tw`font-bold text-3xl my-3`}>Posts</h1>
        <div>
          <a href="/login" class={tw`text-gray-700 mr-3 hover:underline`}>
            Login
          </a>
          <a href="/signup" class={tw`text-gray-700 hover:underline`}>
            Sign Up
          </a>
        </div>
      </div>
      <a href="/posts/new" class={tw`text-red-500 hover:underline`}>
        Create Post
      </a>
      <ul>
        {data.map((post) => (
          <li key={post._id.toString()}>
            <a
              href={`/posts/${post._id.toString()}`}
              class={tw`block border my-2 p-3 rounded`}
            >
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
