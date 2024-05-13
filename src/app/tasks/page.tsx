import Link from 'next/link'

async function getTasks() {
    const res = await fetch('http://127.0.0.1:8090/api/collections/tasks/records?page=1&perPage=30', {cache: 'no-store'});
    const data = await res.json();
    return data?.items as any[];
}

export default async function WelcomPage(){
    const tasks = await getTasks();    

    return(

        <div>
            <h1>Tasks</h1>
            <div>
                {tasks?.map((task) => {
                    return <Task key={task.id} task={task} />;
                })}
            </div>
        </div>
    );
}

function Task({ task }: any){
    const {id, title, content, created} = task || {}

    return (
        <Link href={`/tasks/${id}`}>
            <div>
                <h2 className="text-white">{title}</h2>
                <h5 className="text-white">{content}</h5>
                <p className="text-white">{created}</p>
            </div>
        </Link>
    )
}