/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@twind";
import { PostForm, PostFormProps } from "../components/PostForm.tsx";

export type ErrorData = PostFormProps["errors"];

export default function EditPost(props: PostFormProps) {
  const [isUpdate, setIsUpdate] = useState(false);

  return (
    <div>
      <div class={tw`mb-3 flex flex-row`}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await fetch(window.location.href, { method: "DELETE" });
            if (res.ok) {
              window.location.href = "/posts";
            }
          }}
        >
          <button class={tw`bg-red-500 px-5 py-2 text-white rounded`}>
            Delete
          </button>
        </form>
        <button
          class={tw`border px-5 py-2 rounded ml-3`}
          onClick={() => setIsUpdate(!isUpdate)}
        >
          Update
        </button>
      </div>
      {isUpdate && <PostForm {...props} />}
    </div>
  );
}
