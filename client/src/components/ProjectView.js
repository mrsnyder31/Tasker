import { useEffect, useState } from "react"
import { GetAllProjects } from "../modules/projectManager"
import { Link } from "react-router-dom";
import { GetAllCategories } from "../modules/categoryManager";

export default function ProjectView() {
    const [projects, setProjects] = useState([]),
        [categories, setCategories] = useState([]);

    useEffect(() => {
        GetAllProjects().then((res) => { setProjects(res) })
        GetAllCategories().then(cat => setCategories(cat))
    }, [])

    return <>
        <div className="project_container">
            <div className="project_filter">
                <h3>Filter Options</h3>
                <div>

                    <select onChange={(evt) => {
                        // let copy = { ...project }
                        // copy.CategoryId = parseInt(evt.target.value)
                        // setProject(copy);

                    }} >
                        <option>Select Date</option>
                        {
                            projects.map(c => {
                                return <option value={c.id} key={`proj--${c.id}`}>{new Date(c.deadline).toLocaleDateString()}</option>
                            })
                        }
                    </select>
                </div>

                <div>

                    <select className="m-4" onChange={(evt) => {
                        // let copy = { ...project }
                        // copy.CategoryId = parseInt(evt.target.value)
                        // setProject(copy);

                    }} >
                        <option> Select Category</option>
                        {
                            categories.map(c => {
                                return <option value={c.id} key={`cat--${c.id}`}>{c.name}</option>
                            })
                        }
                    </select>
                </div>
                <p>Checkbox Tags</p>
                <div>

                </div>
            </div>
            <div className="project_list">
                <h3>Project List</h3>
                {
                    projects.map(p => {
                        return <div key={p.id}>
                            <Link to={`/project/${p.id}`}>
                                {p.title}
                            </Link>
                        </div>
                    })
                }
                <br></br>

            </div>
        </div>
    </>
}