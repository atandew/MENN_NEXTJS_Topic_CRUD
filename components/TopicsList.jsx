// "use client";
import Link from "next/link";
import RemoveBTN from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    const resj = await res.json();
    //console.log("topics =>", resj);
    return resj;
  } catch (err) {
    console.log("err =>", err);
  }
};

export default async function TopicsList() {
  const { topics } = await getTopics();
  return (
    <div>
      <h1>Topics</h1>
      {topics?.map((t, i) => (
        <div
          className="p-4 border border-slate-300 my-3 flex justify-between
gap-5 items-start"
          key={i}
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>
          <div className="flex gap-2">
            <RemoveBTN id={t._id} />
            <Link href={`/edit-topic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
