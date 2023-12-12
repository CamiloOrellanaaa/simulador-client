import { useState } from "react"

const dialog = {
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  position: 'fixed'
}

const content = {
  height: '90%',
  width: '90%',
  position: 'fixed',
  top: '5%',
  // transform: 'translateY(-50%)',
  left: '50%',
  transform: 'translateX(-50%)',
  overflowY: 'hidden',
  overflowX: 'hidden',
  zIndex: '99'
};

export const Dialog = ({ children, onOpen, onClose }) => {
  return (
    <dialog id='dialog' open={onOpen} className='border-0' style={dialog}>
      <button
        className='border-0 opacity-0'
        style={dialog}
        onClick={onClose}
      ></button>
      <div className='bg-dark rounded-4' style={content}>
        <div className="text-end p-2">
          <button
            className='border-0 bg-dark float-end pe-2'
            onClick={onClose}
          >
            <img src='https://img.icons8.com/?size=30&id=13107&format=png' />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  )
}
