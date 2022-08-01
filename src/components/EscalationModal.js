import React, { useEffect } from 'react'
import { useState } from 'react'
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalTitle
} from "reactstrap";
import SuccessGif from '../../public/assets/images/successGif.gif';
import { callApi } from '../apiHandlers/callApi';
import Image from "next/image";



const EscalationModal = ({ activeModal, toggle, escalationData }) => {
    const [openSubmodal, setOpenSubmodal] = useState(false)
    const [containerEscalation, setContainerEscalation] = useState(activeModal)
    const [escalationDetails, setEscalationDetails] = useState()
    const setHandleEscalation = async () => {
        let dataForEscalation = {
            method: 'post',
            url: 'admin/grievacnes/changeStatusGrievance',
            data: {
                _id: escalationData?._id,
                status: 'Escalated',
                escalation: escalationDetails.complain,
                escalationDate: escalationData?.createdAt
            }
        }
        console.log(escalationData?._id, 'dataaaaaaaaaaa')
        let response = await callApi(dataForEscalation)
        if (response.data.code === 201) {
            setOpenSubmodal(true)
            setContainerEscalation(false),
            toggle(false)
        }
    }
    useEffect(() => {
        setContainerEscalation(activeModal)
        console.log(activeModal)
    }, [activeModal])
    useEffect(() => {
        console.log(escalationData)
    }, [escalationData])
    return (
        <>
            <Modal
                isOpen={containerEscalation}
                toggle={() => { setContainerEscalation(false), toggle(false) }}
            >
                <ModalHeader style={{ background: '#3bacb6', color: '#fff' }}>
                    Enter Your Complain
                </ModalHeader>
                <ModalBody>
                    <div>
                        <label>Your Complain Details</label>
                        <textarea style={{ padding: '10px', height: '200px' }} className="otpinput m-0 mt-2 mb-2 w-100" onChange={(e) => setEscalationDetails({ complain: e.target.value })} />
                    </div>
                    <Modal
                        isOpen={openSubmodal}
                        toggle={() => setOpenSubmodal(!openSubmodal)}
                    ></Modal>
                </ModalBody>
                <ModalFooter>
                    <button
                        className="main-btn"
                        onClick={() => setHandleEscalation()}
                    >
                        Submit
                    </button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={openSubmodal}>
                {/* <ModalHeader>Escalation Request Created Successfully</ModalHeader> */}
                <ModalBody>
                    <Image src={SuccessGif} alt='success' />
                    {/* <p>hiiiiiiiiii</p> */}
                </ModalBody>
                <ModalFooter>
                    <button
                        className="main-btn"
                        onClick={() => {
                            setOpenSubmodal(false);
                        }}
                    >
                        Done
                    </button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default EscalationModal