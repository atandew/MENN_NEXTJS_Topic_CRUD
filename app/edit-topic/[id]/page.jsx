import EditTopicForm from "@/components/EditTopicForm";

const getTopicById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }
    const resj = await res.json();
    console.log("resj =>", resj);
    return resj;
  } catch (err) {
    console.log("err =>", err);
  }
};

export default async function EditTopics({ params }) {
  const { id } = params;
  console.log("id=>", id);
  const { topic } = await getTopicById(id);
  const { title, description } = topic;
  console.log("topic out =>", topic);
  // const { title, description } = topic;

  return <EditTopicForm id={id} title={title} description={description} />;
}
