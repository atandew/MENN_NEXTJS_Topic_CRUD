"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

//to make this component interact with client and make it client component instead of server renedered
export default function AddTopic() {
  console.log("Hi from add topic"); //this line will work only if use client is used
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Title and description are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to add topic");
      }
    } catch (err) {
      console.log("Error =>", err);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Topic
      </button>
    </form>
  );
}
