async function getTask(taskId: string) {
    const rest = await fetch(
        `http://127.0.0.1:8090/api/collections/tasks/records/${taskId}`,
        {
            next: {revalidate: 10},
        }
    )
    const data = await rest.json();
    return data;
}

export default async function TasksPage({ params }: any) {
    const task = await getTask(params.id);
    return (
        <div className="px-4 py-4 w-max rounded-2xl mt-3">
            <h1 className="text-white text-center">Tasks</h1>
            <div className="text-white">
                <h3>{task.title}</h3>
                <h5>{task.task_type}</h5>
                <p>{task.created}</p>
            </div>
        </div>
    );
}