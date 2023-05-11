import { useEffect, useState } from "react"
import { GetAllProjects } from "../modules/projectManager"
import { Link } from "react-router-dom";
import { GetAllCategories } from "../modules/categoryManager";
import { GetAllProjectTags, GetAllTags } from "../modules/tagManager";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { GetAllTasks } from "../modules/taskManager";

export default function ProjectView() {
    const [projects, setProjects] = useState([]),
        [list, setList] = useState([]),
        [categories, setCategories] = useState([]),
        [tags, setTags] = useState([]),

        [filterOptions, setFilterOptions] = useState({
            Deadline: '',
            CategoryId: 0,
            // TagId: 0,
        });

    useEffect(() => {
        let list = []
        GetAllProjects()
            .then((res) => {
                res.map(CUP => {
                    if (CUP.userId == 1) {
                        list.push(CUP)
                    }
                })
                setProjects(list)
            })
        GetAllCategories().then(cat => setCategories(cat))
        GetAllTags().then((res) => { setTags(res) })
    }, [])

    useEffect(() => {
        setList(projects)

        // GetAllProjectTags().then((data) => {
        //     let list = []
        //     data.map(d => {
        //         projects.map(p => {
        //             if (d.projectId == p.id) {
        //                 list.push(d)
        //             }

        //         })
        //         setTasks(list)
        //     })
        // })
    }, [projects])

    return <>
        <div className="project_container m-4">
            <div className="project_filter ">
                <h3>Filter Options</h3>
                <div>

                    <select onChange={(evt) => {
                        let copy = { ...filterOptions }
                        copy.Deadline = evt.target.value
                        setFilterOptions(copy);

                    }} >
                        <option>Select Date</option>
                        {
                            projects.map(c => {
                                return <option value={c.deadline} key={`proj--${c.id}`}>{new Date(c.deadline).toLocaleDateString()}</option>
                            })
                        }
                    </select>
                </div>

                <div>

                    <select className="m-4" onChange={(evt) => {
                        let copy = { ...filterOptions }
                        copy.CategoryId = parseInt(evt.target.value)
                        setFilterOptions(copy);

                    }} >
                        <option> Select Category</option>
                        {
                            categories.map(c => {
                                return <option value={c.id} key={`cat--${c.id}`}>{c.name}</option>
                            })
                        }
                    </select>
                </div>

                {/* {
                    tags.map(c => {

                        return (
                            <div className="m-4" key={`tag--${c.id}`} >
                                < Input type="checkbox" checked={filterOptions.TagId === c.id} value={c.id} onChange={(evt) => {
                                    let copy = { ...filterOptions }
                                    copy.TagId = parseInt(evt.target.value)
                                    setFilterOptions(copy);
                                }} />
                                {c.name}
                            </div>
                        )

                    })
                } */}

                <Button className="m-4" onClick={() => {
                    let list = []
                    projects.map(p => {


                        if (p.deadline == filterOptions.Deadline || p.categoryId == filterOptions.CategoryId) {
                            list.push(p)
                        }
                        setList(list)


                    })
                }}>Search Projects</Button>
                <Button className="m-4" onClick={() => {
                    setFilterOptions({
                        Deadline: '',
                        CategoryId: 0,
                        TagId: 0,
                    })
                    setList(projects)
                }}>Clear Filters</Button>

            </div>
            <div className="project_list">
                <h3>Project List</h3>
                {
                    list.map(p => {
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