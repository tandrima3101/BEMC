import React, { useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa'
const Rate = (props) => {
    const [rating,setRating] = useState(props.rating)
    const [canHover,setCanHover] = useState(props.canHover)
    const [hover,setHover] = useState(null)
    const [size,setSize] = useState(props.size)
    const [align,setAlign] = useState(props.align)



    useEffect(()=>{
        // console.log(rating)
    },[rating])
    return (
        <>
            <div className={`d-flex justify-content-${align}`}>

                {
                    [...Array(5)].map((star,i) => {
                        const ratingValue = i+1;
                        return (
                            <label key={i}>
                                <input type='radio' name="rating" value={ratingValue} style={{display:'none'}} onClick={()=>{setRating(ratingValue)}} />
                                <FaStar size={size} className='starIcon' style={{cursor:'pointer'}} color={ratingValue <= (hover || rating)?'#3bacb6':'#b3e8e5'} onMouseEnter={()=>{setHover(ratingValue)}} onMouseLeave={()=>{setHover(null),console.log(hover)}}/>
                            </label>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Rate;
