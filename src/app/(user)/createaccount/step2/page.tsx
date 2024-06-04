"use client";
import { Button } from "~/components/common/Button/Button";
import { useRouter } from "next/navigation";
export default function Step2() {
  const router = useRouter();
  return (
    <div className="mt-100 m-auto mt-20 w-60 justify-center ">
      <h1 className="mb-10 text-center">Czy jesteś artystą?</h1>
      <div className="flex flex-row gap-5 ">
        <Button
          className="mt-1.5"
          onClick={() => router.push("/createaccount/step2/step3")}
        >
          Tak
        </Button>
        <Button className="mt-1.5">Nie</Button>
      </div>
    </div>
  );
}
