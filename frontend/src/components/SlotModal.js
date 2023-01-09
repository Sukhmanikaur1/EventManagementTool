import React, { useRef, useState, useEffect } from 'react';
import Modal from './Modal';

import { v4 as uuid } from 'uuid'

import { useDispatch, useSelector } from 'react-redux';
import { addSlot, deleteSlot, updateSlot } from '../actions/slotActions'

import '../styles/slotModal.css'

const SlotModal = ({ setModalMessage,setShowModalMessage ,slot, closeModal }) => {

    let user = useSelector(state => state.users.currentUser)
    if (!user.fname && JSON.parse(sessionStorage.getItem('user')).fname)
    user= JSON.parse(sessionStorage.getItem('user'))
    let [phone, setPhone] = useState(slot.currentSlot?.phone ? slot.currentSlot.phone : '')
    console.log(user)
    console.log(slot)
    let nameRef = useRef()
    let emailRef = useRef()
    // let phoneRef = useRef()
    useEffect(() => {
        if(slot.currentSlot?.user){
            console.log("here")
        nameRef.current.value=`${slot.currentSlot?.name}`
        emailRef.current.value=slot.currentSlot?.email
        }
        else { 
            
        nameRef.current.value=`${user.fname} ${user.lname}`
        emailRef.current.value=user.username
        }
    },[])
    let dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        
        let newSlot;
        if (slot.currentSlot) {
            newSlot = {
                ...slot.currentSlot,
                name: nameRef.current.value,
                email: emailRef.current.value,
                phone,
            }
        } else {
            newSlot = {
                name: nameRef.current.value,
                email: emailRef.current.value,
                phone,
                eventId: slot.event.eventid,
                place: slot.event.place,
                time: slot.time,
                date: slot.date,
                user,
                id: uuid()
            }
        }

        if (slot.currentSlot)
            dispatch(updateSlot(newSlot))
        else 
            dispatch(addSlot(newSlot))
        
        setModalMessage('Slot saved!')
        setShowModalMessage(true)
        closeModal(false)
    }
console.log('current slot')
console.log(slot)
    const handleDelete = () => {
        setModalMessage('Slot deleted.')
        setShowModalMessage(true)
        dispatch(deleteSlot(slot.currentSlot.id))
        closeModal(false)
    }

    const handlePhone = (e) => {
        let { value } = e.target
        let lstChTypd = value.slice(-1)

        if (!/[0-9]/.test(Number(lstChTypd)) && lstChTypd !== '-' && lstChTypd) return
        if (value.length === 13) return

        if (value.length === 4 && !value.includes('-')) {
            value = value.slice(0, 3) + '-' + value.slice(3)
        } else if (value.length === 8 && value[7] !== '-') {
            value = value.slice(0, 7) + '-' + value.slice(7)
        }
        setPhone(value)
    }

    return ( 
        <Modal>
            <div className='event-modal'>
                <div className='event-details'>
                    <p className='event-p'><span>{slot.event.eventplace}</span>{slot.viewOnly ? <span style={{ color: 'grey' }}>{slot.time} on {slot.date} was booked</span> : <><span>{slot.time}</span> <span>{slot.date}</span></>}</p>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>
                                Name:
                                <input 
                                    defaultValue={slot.currentSlot?.name}
                                    readOnly={slot.viewOnly ? true : false}
                                    style={slot.viewOnly ? { backgroundColor: 'rgb(224, 236, 255)' } : null}
                                    ref={nameRef} 
                                    required
                                    
                                />
                            </label>

                            <label>
                                Email:
                                <input 
                                    type="email"
                                    defaultValue={slot.currentSlot?.email}
                                    ref={emailRef} 
                                    readOnly={slot.viewOnly ? true : false}
                                    style={slot.viewOnly ? { backgroundColor: 'rgb(224, 236, 255)' } : null}
                                    required
                                />
                            </label>

                            <label>
                                Phone:
                                <input 
                                    // ref={phoneRef} 
                                    // defaultValue={slot.currentSlot?.phone}
                                    value={phone}
                                    onChange={handlePhone}
                                    readOnly={slot.viewOnly ? true : false}
                                    style={slot.viewOnly ? { backgroundColor: 'rgb(224, 236, 255)' } : null}
                                    type="tel"
                                    placeholder="ex: 555-555-5555"
                                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            {!slot.viewOnly ? <button>{slot.currentSlot?.user?.username==user?.username ? 'Update' : 'Create'}</button> : null}
                            {slot.currentSlot && !slot.viewOnly ? <button type="button" onClick={handleDelete}>Delete</button> : null}
                            <button type="button" onClick={() => closeModal(false)}>Cancel</button>
                        </div>
                    </form>

                </div>
            </div>
            <div className='event-modal-cloud' onClick={() => closeModal(false)}></div>
        </Modal>
    );
}
 
export default SlotModal;