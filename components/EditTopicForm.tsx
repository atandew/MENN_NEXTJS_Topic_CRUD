"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTopicForm({ id, title, description }) {
  const [newTitle, setTitle] = useState(title);
  const [newDescription, setDescription] = useState(description);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });
      if (!res.ok) {
        throw new Error("Failed to update topic");
      }
      router.refresh();
      router.push("/");
    } catch (err) {
      console.log("err =>", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Topic Title"
          onChange={(e) => setTitle(e.target.value)}
          value={newTitle}
        />

        <input
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Topic Description"
          onChange={(e) => setDescription(e.target.value)}
          value={newDescription}
        />

        <button
          type="submit"
          className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
        >
          Update Topic
        </button>
      </form>
    </div>
  );
}
