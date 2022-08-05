import React, { useEffect } from 'react'
import { useState } from 'react'
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalTitle
} from "reactstrap";



const EscalationModal = ({ activeModal, toggle, escalationData,createEscalation ,openSubmodal}) => {
    const [containerEscalation, setContainerEscalation] = useState(activeModal)
    const [escalationDetails, setEscalationDetails] = useState()
    var today = new Date();
    let data = {
        _id: escalationData?._id,
        status: 'Escalated',
        escalation: escalationDetails?.complain,
        escalationDate: today
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
                        onClick={() => createEscalation(data)}
                    >
                        Submit
                    </button>
                </ModalFooter>
            </Modal>

            
        </>
    )
}

export default EscalationModal