import React, { useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa'
const Rate = () => {
    const [rating,setRating] = useState(null)
    const [hover,setHover] = useState(null)

    useEffect(()=>{
        console.log(rating)
    },[rating])
    return (
        <>
            <div className="d-flex justify-content-center">

                {
                    [...Array(5)].map((star,i) => {
                        const ratingValue = i+1;
                        return (
                            <label key={i}>
                                <input type='radio' name="rating" value={ratingValue} style={{display:'none'}} onClick={()=>{setRating(ratingValue)}} />
                                <FaStar size={50} className='starIcon' style={{cursor:'pointer'}} color={ratingValue <= (hover || rating)?'#3bacb6':'#b3e8e5'} onMouseEnter={()=>{setHover(ratingValue),console.log(hover)}} onMouseLeave={()=>{setHover(null),console.log(hover)}}/>
                            </label>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Rate;
