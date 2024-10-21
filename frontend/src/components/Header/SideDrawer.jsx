import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { FiMenu } from "react-icons/fi";
import { Link } from 'react-router-dom';

const SideDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <FiMenu onClick={onOpen} size={24} color='white' />
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Menu</DrawerHeader>

        <DrawerBody>
          <ol className='flex flex-col gap-2 font-sans font-semibold'>
            <Link to="/">
              <li>Exchanges</li>
            </Link>
            <Link to="/chart">
              <li>Chart</li>
            </Link>
            <Link to="/marketcap">
              <li>Market cap</li>
            </Link>
          </ol>
        </DrawerBody>

      </DrawerContent>
    </Drawer>
  </>
  );
}

export default SideDrawer