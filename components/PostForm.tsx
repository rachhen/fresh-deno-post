/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export type ErrorData = {
  title: null | string;
  content: null | string;
};

export type PostFormProps = {
  defaultValues?: {
    title?: string;
    content?: string;
  };
  errors?: ErrorData;
};

export function PostForm({ errors, defaultValues }: PostFormProps) {
  return (
    <form method="POST">
      <div class={tw`mb-3 flex flex-col`}>
        <label for="title" class={tw`text-sm text-gray-500`}>
          Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={defaultValues?.title}
          class={tw`border px-3 py-2 rounded`}
        />
        {errors?.title ? (
          <em class={tw`text-red-500 text-xs`}>{errors.title}</em>
        ) : null}
      </div>
      <div class={tw`mb-3 flex flex-col`}>
        <label for="content" class={tw`text-sm text-gray-500`}>
          Content
        </label>
        <textarea
          rows={20}
          id="content"
          name="content"
          class={tw`border px-3 py-2 rounded`}
          defaultValue={defaultValues?.content}
        ></textarea>
        {errors?.content ? (
          <em class={tw`text-red-500 text-xs`}>{errors.content}</em>
        ) : null}
      </div>
      <button
        type="submit"
        class={tw`bg-blue-500 px-5 py-2 rounded text-white`}
      >
        Submit
      </button>
    </form>
  );
}
