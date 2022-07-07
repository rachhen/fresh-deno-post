/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { postCollection } from "@db";
import { Handlers, PageProps } from "$fresh/server.ts";
import { ErrorData, PostForm, PostFormProps } from "@components/PostForm.tsx";

export const handler: Handlers = {
  async POST(req, ctx) {
    const formData = await req.formData();

    const title = formData.get("title");
    const content = formData.get("content");

    if (typeof title !== "string") {
      throw new Error("Title must be a string");
    }

    if (typeof content !== "string") {
      throw new Error("content must be a string");
    }

    const errors: ErrorData = {
      title: title ? null : "Title is required",
      content: content ? null : "Content is required",
    };

    const hasErrors = Object.values(errors).some(
      (errorMessage) => errorMessage
    );
    if (hasErrors) {
      return ctx.render({ errors, defaultValues: { title, content } });
    }

    const post = await postCollection.insertOne({
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return new Response(undefined, {
      status: 302,
      headers: { location: `/posts/${post.toString()}` },
    });
  },
};

export default function NewPost({ data }: PageProps<PostFormProps>) {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <title>New Post</title>
      <a href="/posts">Back</a>
      <h1 class={tw`font-bold text-3xl my-3`}>New Post</h1>
      <PostForm errors={data.errors} defaultValues={data.defaultValues} />
    </div>
  );
}
