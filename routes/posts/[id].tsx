/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { IPost, postCollection, ObjectId } from "@db";
import EditPost, { ErrorData } from "../../islands/EditPost.tsx";

export const handler: Handlers<IPost | ErrorData> = {
  async GET(req, ctx) {
    const id = ctx.params.id;

    if (!ObjectId.isValid(id)) {
      return new Response("Invalid ID", { status: 400 });
    }

    if (!id) {
      return new Response("Invalid ID", { status: 400 });
    }

    const post = await postCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!post) {
      return new Response(`Post ${id} not found`, { status: 404 });
    }

    return ctx.render(post);
  },
  async DELETE(req, ctx) {
    const id = ctx.params.id;

    if (!ObjectId.isValid(id)) {
      return new Response("Invalid ID", { status: 400 });
    }

    if (!id) {
      return new Response("Invalid ID", { status: 400 });
    }

    const post = await postCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!post) {
      return new Response(`Post ${id} not found`, { status: 404 });
    }

    await postCollection.deleteOne({ _id: new ObjectId(id) });

    return new Response(undefined, {
      status: 200,
    });
  },
  async POST(req, ctx) {
    const id = ctx.params.id;

    if (!ObjectId.isValid(id)) {
      return new Response("Invalid ID", { status: 400 });
    }

    if (!id) {
      return new Response("Invalid ID", { status: 400 });
    }

    const postExist = await postCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!postExist) {
      return new Response(`Post ${id} not found`, { status: 404 });
    }

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
      content: content ? null : "Markdown is required",
    };

    const hasErrors = Object.values(errors).some(
      (errorMessage) => errorMessage
    );
    if (hasErrors) {
      return ctx.render(errors);
    }

    await postCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title,
          content,
          updatedAt: new Date().toISOString(),
        },
      }
    );

    return new Response(undefined, {
      status: 302,
      headers: { location: `/posts/${id}` },
    });
  },
};

export default function Post({ data }: PageProps<IPost>) {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <title>{data.title}</title>
      <a href="/posts" class={tw`text-blue-500 hover:underline`}>
        Back
      </a>
      <div>
        <h2 class={tw`text-3xl my-3`}>{data.title}</h2>
        <p>{data.content}</p>
      </div>
      <div class={tw`mt-3`}>
        <EditPost
          defaultValues={{ title: data.title, content: data.content }}
        />
      </div>
    </div>
  );
}
