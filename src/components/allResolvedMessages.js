import React, { useEffect, useState } from 'react'
import { ModalBody } from 'react-bootstrap'
import { Modal, ModalFooter, ModalHeader } from 'reactstrap'

const AllResolvedMessages = ({ activeModal, resolvedMessages }) => {
    const [containerResolved, setContainerResolved] = useState(activeModal)
    console.log(resolvedMessages)
    useEffect(() => {
        setContainerResolved(activeModal)
        console.log(resolvedMessages, 'resolvedModal')
    }, [activeModal])
    return (
        <>
            <Modal
                isOpen={containerResolved}
            // toggle={() => { setContainerEscalation(false), toggle(false) }}
            >
                <ModalHeader style={{ background: '#3bacb6', color: '#fff' }}>
                    <h5 style={{ color: '#fff' }}>All Resolved Messages</h5>
                </ModalHeader>
                <ModalBody>
                    {
                        resolvedMessages && resolvedMessages.length > 0 && resolvedMessages.map((messages) => {
                            if (messages != null) {
                                return (<div className='card p-4'>
                                    <h6>{messages}</h6>
                                </div>)
                            }
                        })
                    }
                </ModalBody>
                <ModalFooter>
                    <button
                        className="main-btn"
                    >
                        Close
                    </button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default AllResolvedMessages