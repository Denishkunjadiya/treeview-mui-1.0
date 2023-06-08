import * as mui from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const Remove = (props) => {

    const removeData = () => {
        props.remove()
        props.setOpen(false)
    }

    const close = () => {
        props.setOpen(false)
    }

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
                        <CloseIcon onClick={close} style={{ cursor: 'pointer', marginLeft: '280px', paddingBottom: '20px' }} />
                    </div>
                    Are You Sure ?
                    <mui.Stack direction="row" sx={{ mt: 4 }} spacing={2}>
                        <mui.Button variant="contained" type='button' onClick={close} >No</mui.Button>
                        <mui.Button variant="contained" type='button' onClick={removeData} style={{ background: '#d80000' }} >Yes</mui.Button>
                    </mui.Stack>
                </mui.Box>
            </mui.Modal>

        </div>
    )
}

export default Remove
