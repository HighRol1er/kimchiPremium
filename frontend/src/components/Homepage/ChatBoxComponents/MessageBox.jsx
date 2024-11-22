import { FaRegCircleUser } from "react-icons/fa6";

const MessageBox = ({ msg }) => {
  return (
    <>
      <li className="p-1 flex items-center gap-2">
        <FaRegCircleUser className=''/> {msg}
      </li>
    </>
  )
}

export default MessageBox