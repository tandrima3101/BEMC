import React from 'react'
import { useState ,useEffect} from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalTitle
} from "reactstrap";
import SuccessGif from '../../public/assets/images/successGif.gif';
import Image from "next/image";
import Link from 'next/link';

function AmbulanceRequestModal({activeAmbulanceModal,toggle}) {
    console.log(activeAmbulanceModal)
    const [openSubmodal, setOpenSubmodal] = useState(activeAmbulanceModal)
    useEffect(() => {
        setOpenSubmodal(activeAmbulanceModal)
        console.log(activeAmbulanceModal)
    }, [activeAmbulanceModal])
    return (
        <Modal isOpen={openSubmodal} toggle={()=>{setOpenSubmodal(false),toggle(false)}}>
            <ModalBody>
                <h5 className='mt-4 mb-4 text-center text-uppercase' style={{letterSpacing:'1px',lineHeight:'28px',color:'#222'}}>Your Booking Request has been sent.You will be notified once your booking will be confirmed </h5>
                <Image src={SuccessGif} alt='success' />
                <Link href='/authroutes/booking' className='text-center d-block'>Go to Booking Details Page to see your booking status</Link>
            </ModalBody>
            <ModalFooter>
                <Link href="#">
                <button
                    className="main-btn"
                    onClick={() => {
                        setOpenSubmodal(false);
                        toggle(false)
                    }}
                >
                    Done
                </button>
                </Link>
            </ModalFooter>
        </Modal>
    )
}

export default AmbulanceRequestModal