"use client";
import { upvoteAction } from "@/actions";
import Image from "next/image";

import { useFormState, useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-purple-951 min-w-[120px]"
      type="submit"
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? (
        <Image
          src="/static/icons/loading-spinner.svg"
          alt="loading"
          width={"30"}
          height={"30"}
          className="m-auto"
        />
      ) : (
        "Up vote!"
      )}
    </button>
  );
}
export default function Upvote({ voting, id }: { voting: number; id: string }) {
  const initialState = {
    id,
    voting,
  };

  const [state, dispatch] = useFormState(upvoteAction, initialState);
  // const { pending } = useFormStatus();

  return (
    <form action={dispatch}>
      <div className="mb-6 flex">
        <Image
          src="/static/icons/star.svg"
          alt="star icon"
          width={"24"}
          height={"24"}
        />
        <p className="pl-2">{state.voting} </p>
      </div>
      <SubmitButton />
    </form>
  );
}
