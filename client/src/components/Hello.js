import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { GetAllProjects } from "../modules/projectManager";

export default function Hello() {

    const [projects, setProjects] = useState([])

    useEffect(() => {
        GetAllProjects()
            .then((res) => {
                setProjects(res)
            })
    }, [])

    const navigate = useNavigate();

    return <>

        <div className="home_container">


            <div className="home_project">
                <h3><Button onClick={() => { navigate("/project/new") }}>Create Project</Button></h3>
            </div>

            <div className="home_deadline">
                <h3>Deadlines</h3>
                {
                    projects.map(p => {
                        return <div key={p.id}>
                            <p>{p.title} - {p.deadline}</p>
                        </div>
                    })
                }
            </div>

        </div>
    </>
}