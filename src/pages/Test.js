import React, { useEffect, useState } from 'react'
import { fetchData } from '../action/dataAction'
import { connect } from 'react-redux'

const Test = ({ jj, fetchData }) => {
    const [data, setData] = useState()

    console.log(data)

    useEffect(() => {
        fetchData();
        setData(jj)
    }, [jj])
    return (
        <div>

        </div>
    )
}

const mapState = (state) => ({
    jj: state
})

export default connect(mapState, { fetchData })(Test);
