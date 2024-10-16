// import Image from "next/image";
// import Modal from "./ui/modal";
// import { Fragment } from "react";

// export default function Home() {
//   return (
//     <Fragment>
//         <h1>Hi this is a Test13213</h1>
//           <button className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700">
//           Show Modal
//         </button>
//         <Modal {/>
//     </Fragment>
//   );
// }

'use client'
import { useState } from "react"
import Modal from "./ui/modal.tsx";
//import Trash from "./icons/Trash"

export default function App() {
  const [open, setOpen] = useState(false)
  return (
    <main className="App">
      <button className="btn btn-danger" onClick={() => setOpen(true)}>
         Delete
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="text-center w-56">
          <button className="mx-auto text-red-500" />
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this item?
            </p>
          </div>
          <div className="flex gap-4">
            <button className="btn btn-danger w-full">Delete</button>
            <button
              className="btn btn-light w-full"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </main>
  )
}
