import React from 'react'

interface HeadingProps{
    title:string,
    desc:string
}
const Heading:React.FC<HeadingProps> = ({
    title,
    desc
}) => {
  return (
    <div className=' flex flex-col justify-start items-center'>  
        <div className=' font-bold text-3xl text-black '>
           {title}
        </div>
        <div className=' text-sm  font-normal font-serif text-neutral-400'>
          {desc}
        </div>
    </div>
  )
}

export default Heading