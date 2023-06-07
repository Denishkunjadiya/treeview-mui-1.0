import React, { useEffect, useState } from 'react'

import TreeView from '@mui/lab/TreeView';
import * as muIcon from '@mui/icons-material';
import * as mui from '@mui/material'
import * as yup from 'yup';

import TreeItem from '@mui/lab/TreeItem';
import { styled } from "@mui/material/styles";
import Data from './data';
import EditModel from './EditModel';
import { useFormik } from 'formik';

const schema = yup.object({
    name: yup.string().min(2).required('name is required'),
    parent: yup.string().required('select box is empty')
})


const TreeViewReact = () => {

    const [expanded, setExpanded] = useState(false);

    const [data, setData] = useState(Data)
    const [open, setOpen] = useState(false);

    const [chake, setChecked] = useState()
    const [id, setId] = useState()

    const [editName, setEditName] = useState('');

    const initialValues = {
        name: "",
        parent: ""
    }

    // -------------------- valid

    const { errors, touched, values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: schema,
        onSubmit: (values, { resetForm }) => {
            save()
            resetForm();

        }
    })

    // --------------- edit Data

    const edit = (editData) => {

        const edData = (ed) => {
            if (ed.id === id) {
                ed.name = editData
                setOpen(false)

            } else {
                ed?.child.map((item) => edData(item))
            }
        }
        edData(data)
    }


    const editdata = (id) => {
        setChecked(!chake)
        setOpen(true);
        setEditName(id.name)
        setId(id.id)
    }

    // ---------------------- remove

    const remove = () => {
        const deleteData = (id, removeData) => {
            if (removeData.id === id) {
                return null;
            }

            if (removeData.child && removeData.child.length > 0) {
                removeData.child = removeData.child.filter((child) => deleteData(id, child));
            }

            return removeData;
        };
        const updatedData = deleteData(id, { ...data });
        setData(updatedData);

        setOpen(false)
    }

    // --------------------- treeView

    const renderTree = (nodes) => (
        <TreeItem
            key={nodes.id}
            nodeId={nodes.id}
            label={<mui.FormControlLabel control={<mui.Checkbox
                onClick={() => editdata(nodes)}
                inputProps={{ "aria-label": "controlled" }}
                onChange={(e) => setChecked(e.target.checked)}
                checked={chake}
            />} label={nodes.name} />}
        >
            {Array.isArray(nodes.child)
                ? nodes.child.map((node) => renderTree(node))
                : null}
        </TreeItem>
    );

    // ========== option

    const optionTree = (nodes) => {
        const menuItems = [];
        menuItems.push(
            <mui.MenuItem key={nodes.id} value={nodes.name}>
                {nodes.name}
            </mui.MenuItem>
        );
        if (nodes.child) {
            nodes.child.forEach((node) => {
                menuItems.push(...optionTree(node));
            });
        }
        return menuItems;
    }

    // ------------------ Add Data

    const save = () => {
        if (values.parent) {

            let genId = Math.random().toString(10).slice(2)
            const info = { 'id': genId, "name": values.name, child: [] }

            const add = (aa) => {
                if (aa.name === values.parent) {
                    aa.child.push(info);
                    console.log("Add")
                } else {
                    aa.child.map((item) => add(item))
                }
            }
            add(data)

        } else {
            console.log('Parent Not Found')
        }

    }

    // -------------------- mui style

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <mui.IconButton {...other} />;
    })(({ theme, expand }) => ({
        borderRadius: '10px',
        margin: " 20px ",
        padding: '5px 20px',
        fontSize: '1rem',
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest
        })
    }));

    // ------------------- add btn expende
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        renderTree(data)
    }, [handleChange])

    return (

        <>
            <TreeView
                aria-label="rich object"
                defaultCollapseIcon={<muIcon.ExpandMore />}
                defaultExpanded={['root']}
                defaultExpandIcon={<muIcon.ChevronRight />}
                sx={{ height: 'auto', flexGrow: 1, maxWidth: 'auto' }}
            >
                {renderTree(data)}
            </TreeView>
            <hr style={{ marginTop: '20px ' }} />

            <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <muIcon.Add />Add
            </ExpandMore>

            <mui.Collapse in={expanded} timeout="auto" unmountOnExit>
                <mui.CardContent>

                    <form onSubmit={handleSubmit}>
                        <mui.Typography sx={{ margin: 'auto 30px' }}>
                            {/* <mui.TextField required name='name' defaultValue="" value={name} onChange={(e) => setName(e.target.value)} id="standard-basic" label="Name" variant="standard" /> */}
                            <mui.TextField name='name' defaultValue="" value={values.name} onChange={handleChange} onBlur={handleBlur} id="standard-basic" label="Name" variant="standard" />
                            {/* {console.log(erro)} */}
                            {touched.name && errors.name && <p style={{ color: 'red' }}>**{errors.name}</p>}
                        </mui.Typography>

                        <mui.Typography sx={{ margin: '10px 20px' }}>
                            <mui.FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>

                                <mui.InputLabel id="demo-simple-select-standard-label">parent</mui.InputLabel>
                                <mui.Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={values.parent}
                                    onChange={handleChange}
                                    name='parent'
                                    label="parent"
                                >
                                    {optionTree(data)}
                                </mui.Select>
                                {touched.parent && errors.parent && <p style={{ color: 'red' }}>**{errors.parent}</p>}
                            </mui.FormControl>

                        </mui.Typography>

                        <mui.Typography sx={{ margin: '10px 20px' }}>
                            <mui.Button variant="contained" type='submit' >Add Data</mui.Button>
                            {/* <mui.Button variant="contained" onClick={save} >Add Data</mui.Button> */}
                        </mui.Typography>
                    </form>

                </mui.CardContent>
            </mui.Collapse>
            <EditModel setOpen={setOpen} remove={remove} editdata={edit} setChecked={setChecked} open={open} editName={editName} setEditName={setEditName} />
        </>
    )
}

export default TreeViewReact

