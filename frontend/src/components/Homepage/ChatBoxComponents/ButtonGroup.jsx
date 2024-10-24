import React from 'react'
import { Button } from "@chakra-ui/react"

const ButtonGroup = ({onClickAutoCompleteChangeNameCommand}) => {
  return (
    <div className='flex gap-1 ml-2'>
      <Button onClick={onClickAutoCompleteChangeNameCommand} size="xs" colorScheme="blue">호칭</Button>
      <Button size="xs" colorScheme="blue">아이콘</Button>
      <Button size="xs" colorScheme="yellow">메모</Button>
      {/* <Button size="xs" colorScheme="blue">호칭</Button> */}
    </div>
  )
}

export default ButtonGroup