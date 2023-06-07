import React, { useState } from 'react'

import TreeView from '@mui/lab/TreeView';
import * as muIcon from '@mui/icons-material';
import * as mui from '@mui/material'
import * as yup from 'yup';

import TreeItem from '@mui/lab/TreeItem';
import { styled } from "@mui/material/styles";
import Data from './data';
import EditModel from './EditModel';



const TreeViewReact = () => {

    const [expanded, setExpanded] = useState(false);

    const [data, setData] = useState(Data)
    const [open, setOpen] = useState(false);

    const [name, setName] = useState()
    const [parent, setParent] = useState()
    const [chake, setChecked] = useState()
    const [id, setId] = useState()

    const [editName, setEditName] = useState('');

    const [errors, setErrors] = useState()

    const valid = yup.object().shape({
        name: yup.string().required('Name is Required')
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
        const removeRec = (removeData) => {
            if (removeData.id === id) {

                // const { name, id, child, ...newRecord } = removeData
                // console.log(removeData)
                // console.log(newRecord)
                setOpen(old => [...old,name,id,])

            } else {
                removeData.child.map(item => removeRec(item))
            }
        }
        removeRec(data)
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
        if (parent) {

            let genId = Math.random().toString(10).slice(2)
            const info = { 'id': genId, "name": name, child: [] }
            valid.validate({ name })
                .then(() => {
                    const add = (aa) => {
                        if (aa.name === parent) {
                            aa.child.push(info);
                            setName('')
                            console.log("Add")
                        } else {
                            aa.child.map((item) => add(item))
                        }
                    }
                    add(data)
                }).catch((err) => {
                    const validError = {};
                    err.inner.forEach((error) => {
                        validError[error.path] = error.message;
                    })
                    setErrors(validError)
                })

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

                    <mui.Typography sx={{ margin: 'auto 30px' }}>
                        <mui.TextField required name='name' defaultValue="" value={name} onChange={(e) => setName(e.target.value)} id="standard-basic" label="Name" variant="standard" />
                    </mui.Typography>

                    <mui.Typography sx={{ margin: '10px 20px' }}>
                        <mui.FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>

                            <mui.InputLabel id="demo-simple-select-standard-label">parent</mui.InputLabel>
                            <mui.Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={parent}
                                onChange={(e) => setParent(e.target.value)}
                                label="parent"
                            >
                                {optionTree(data)}
                            </mui.Select>

                        </mui.FormControl>
                    </mui.Typography>

                    <mui.Typography sx={{ margin: '10px 20px' }}>
                        <mui.Button variant="contained" onClick={save} >Add Data</mui.Button>
                    </mui.Typography>

                </mui.CardContent>
            </mui.Collapse>
            <EditModel setOpen={setOpen} remove={remove} editdata={edit} setChecked={setChecked} open={open} editName={editName} setEditName={setEditName} />
        </>
    )
}

export default TreeViewReact

