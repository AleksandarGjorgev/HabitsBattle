import Link from 'next/link'

async function getHabits() {
    const res = await fetch('http://127.0.0.1:8090/api/collections/habits/records?page=1&perPage=30');
    const data = await res.json();
    return data?.items as any[];
}

export default async function WelcomPage(){
    const habits = await getHabits();    

    return(

        <div>
            <h1>Habits</h1>
            <div>
                {habits?.map((habit) => {
                    return <Habit key={habit.id} habit={habit} />;
                })}
            </div>
        </div>
    );
}

function Habit({ habit }: any){
    const {id, title, content, created} = habit || {}

    return (
        <Link href={`/habits/${id}`}>
            <div>
                <h2 className="text-white">{title}</h2>
                <h5 className="text-white">{content}</h5>
                <p className="text-white">{created}</p>
            </div>
        </Link>
    )
}