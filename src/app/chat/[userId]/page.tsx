"use client";

export default function Conversation({
  params,
}: {
  params: { userId: string };
}) {
  return <div>Conversation with {params.userId}</div>;
}
