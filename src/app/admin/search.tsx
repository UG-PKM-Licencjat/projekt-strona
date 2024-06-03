"use client";

import { Input } from "~/components/ui/Input/Input";
import { Icon } from "~/components/ui/Icon/Icon";
import { useRouter } from "next/navigation";
import { useTransition, useEffect, useRef, useState } from "react";

export function Search(props: { value?: string }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(props.value);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    console.log("value", value);
    if (value === undefined) {
      return;
    } else if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      // All navigations are transitions automatically
      // But wrapping this allow us to observe the pending state
      router.replace(`/admin?${params.toString()}`);
    });
  }, [router, value]);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <Icon
        name="magnifier"
        className="absolute left-2.5 top-3 h-4 w-4 text-gray-500"
      />
      <Input
        ref={inputRef}
        value={value ?? ""}
        onInput={(e) => {
          setValue(e.currentTarget.value);
        }}
        spellCheck={false}
        className="w-full appearance-none bg-white pl-8 shadow-none"
        placeholder="Search users..."
      />
      {isPending && (
        <Icon name="spinner" className="m-32 h-8 w-8 animate-spin" />
      )}
    </div>
  );
}
