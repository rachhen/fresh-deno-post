/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { userCollection } from "@db";
import {
  setCookie,
  getCookies,
} from "https://deno.land/std@0.147.0/http/cookie.ts";

type ErrorData = {
  email: string | null;
  password: string | null;
};

type SignupFormProps = {
  defaultValues?: {
    email?: string;
    password?: string;
  };
  errors?: ErrorData;
  formError?: string;
};

export const handler: Handlers = {
  async POST(req, ctx) {
    const formData = await req.formData();

    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string") {
      throw new Error("Email must be a string");
    }

    if (typeof password !== "string") {
      throw new Error("Password must be a string");
    }

    const errors: ErrorData = {
      email: email ? null : "Email is required",
      password: password ? null : "Password is required",
    };

    const hasErrors = Object.values(errors).some(
      (errorMessage) => errorMessage
    );
    if (hasErrors) {
      return ctx.render({ errors, defaultValues: { email, password } });
    }

    const user = await userCollection.findOne({ email });

    console.log(req.headers);

    if (!user) {
      return ctx.render({
        errors,
        defaultValues: { email, password },
        formError: "Email or password is incorrect",
      });
    }

    // const user = await userCollection.insertOne({
    //   name,
    //   email,
    //   password,
    //   createdAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString(),
    // });

    return new Response(undefined, {
      status: 302,
      headers: { location: "/posts" },
    });
  },
};

export default function Login({ data }: PageProps<SignupFormProps>) {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-sm`}>
      <title>Login</title>
      <h1 class={tw`font-bold text-3xl my-3`}>Login</h1>
      <a href="/posts" class={tw`block my-3 hover:underline`}>
        Posts
      </a>
      <form method="POST">
        {data?.formError ? (
          <em class={tw`text-red-500 text-xs`}>{data.formError}</em>
        ) : null}
        <div class={tw`mb-3 flex flex-col`}>
          <label for="email" class={tw`text-sm text-gray-500`}>
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            class={tw`border px-3 py-2 rounded`}
            defaultValue={data?.defaultValues?.email}
          />
          {data?.errors?.email ? (
            <em class={tw`text-red-500 text-xs`}>{data.errors.email}</em>
          ) : null}
        </div>
        <div class={tw`mb-3 flex flex-col`}>
          <label for="password" class={tw`text-sm text-gray-500`}>
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            defaultValue={data?.defaultValues?.password}
            class={tw`border px-3 py-2 rounded`}
          />
          {data?.errors?.password ? (
            <em class={tw`text-red-500 text-xs`}>{data.errors.password}</em>
          ) : null}
        </div>
        <div class={tw`flex flex-row items-center`}>
          <button
            type="submit"
            class={tw`bg-blue-500 px-5 py-2 rounded text-white`}
          >
            Login
          </button>
          <a href="/signup" class={tw`ml-5 hover:underline`}>
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
}
