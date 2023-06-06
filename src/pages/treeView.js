import React, { useState } from 'react'

import TreeView from '@mui/lab/TreeView';
import * as muIcon from '@mui/icons-material';
import * as mui from '@mui/material'
import TreeItem from '@mui/lab/TreeItem';
import { styled } from "@mui/material/styles";
import Data from './data';


const TreeViewReact = () => {

    const [expanded, setExpanded] = React.useState(false);

    const [data, setData] = useState(Data)

    const [name, setName] = useState()
    const [parent, setParent] = useState()

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
            {Array.isArray(nodes.child)
                ? nodes.child.map((node) => renderTree(node))
                : null}
        </TreeItem>
    );



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


    const save = () => {
        if (parent) {

            let genId = Math.random().toString(10).slice(2)
            const info = { 'id': genId, "name": name, child: [] }

            if (data.name === parent) {

                data.child.push(info);
                console.log("add")
                setName('')

            }

            const child = (nodes) => (
                nodes.child.map((member) => {
                    if (member.name === parent) {
                        member.child.push(info);
                        console.log("child")
                        setName('')
                    } else if (member.child) {
                        member.child.map((item) => child(item))
                    }
                })
            );

            child(data)

            // data.child.map((member) => {
            //     if (member.name === parent) {
            //         member.child.push(info);
            //         console.log("child")
            //         setName('')
            //     }
            // })

            // console.log("rer")
            return info;

        } else {
            console.log('error')
        }

    }

    // <mui.MenuItem value={nodes.name} >
    //     {nodes.name}
    // </mui.MenuItem>

    // const optionTree = (nodes) => (
    //     <>
    //         <mui.MenuItem value={nodes.name} >
    //             {nodes.name}
    //         </mui.MenuItem>
    //         {Array.isArray(nodes.child) ? nodes.child.map((node) => optionTree(node)) : null}
    //     </>
    // )


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
                        <mui.TextField required defaultValue="" value={name} onChange={(e) => setName(e.target.value)} id="standard-basic" label="Name" variant="standard" />
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
                                {/* <mui.MenuItem value={20}>Twenty</mui.MenuItem> */}
                            </mui.Select>

                        </mui.FormControl>
                    </mui.Typography>

                    <mui.Typography sx={{ margin: '10px 20px' }}>
                        <mui.Button variant="contained" onClick={save} >Add Data</mui.Button>
                    </mui.Typography>

                </mui.CardContent>
            </mui.Collapse>
        </>
    )
}

export default TreeViewReact


//  <select
//      labelId="demo-simple-select-standard-label"
//      id="demo-simple-select-standard"
//      value={parent}
//      onChange={(e) => setParent(e.target.value)}
//      label="parent">
//          {optionTree(data)}
//  </select>