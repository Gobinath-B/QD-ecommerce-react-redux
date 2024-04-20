import { Rating } from '@mui/material';
import React from 'react'

const Ratings = ({
    onChange,
    value,
    ...props
}) => {
    return (
        <Rating
            {...props}
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
                onChange(newValue)
            }}

        />
    )
}

export default Ratings