import * as mui from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Remove from './remove';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const EditModel = (props) => {

    const [edName, setEdName] = useState()
    const [open, setOpen] = useState(false);

    // -------- edit
    const editdata = () => {
        props.editdata(edName)
    }

    // ------------ model 
    const model = () => {
        setOpen(true)
    }

    // -------------- remove 
    const removeData = () => {
        props.remove()
    }

    const close = () => {
        props.setChecked('')
        props.setOpen(false)
    }

    useEffect(() => {
        setEdName(props.editName)
    }, [props])

    return (
        <div>
            <mui.Modal
                keepMounted
                open={props.open}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <mui.Box sx={style}>
                    <div>
                        <CloseIcon onClick={close} style={{ cursor: 'pointer', marginLeft: '380px', paddingBottom: '20px' }} />
                    </div>
                    <mui.TextField required defaultValue="" value={edName} id="standard-basic" style={{ width: '100%' }} label="Name" variant="standard" onChange={(e) => setEdName(e.target.value)} />
                    <mui.Stack direction="row" sx={{ mt: 4 }} spacing={2}>
                        <mui.Button variant="contained" type='button' onClick={editdata}>Edit</mui.Button>
                        {/* {props.editName === 'jon' ? '' : <mui.Button variant="contained" type='button' onClick={removeData} style={{ background: '#d80000' }} >remove</mui.Button>} */}
                        {props.editName === 'jon' ? '' : <mui.Button variant="contained" type='button' onClick={model} style={{ background: '#d80000' }} >remove</mui.Button>}
                    </mui.Stack>
                </mui.Box>
            </mui.Modal>
            <Remove setOpen={setOpen} remove={removeData} open={open} />
        </div>
    )
}

export default EditModel
