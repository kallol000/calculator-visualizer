"use client"
import Image from "next/image";
import { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence, stagger } from "motion/react"
import { FormData } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { infixToPostfix } from "@/lib/helperFns";
import { exit } from "process";




export default function Home() {
  
  const [ stack, setStack ] = useState<string[]>( ["a", "b", "c", "d", "e", "f"] )
  const [ boxes, setBoxes ] = useState<ReactNode[]>( [] )
  const [ stack, setStack ] = useState<string[]>( ["a", "b", "c", "d", "e", "a", "b", "c", "d", "e"] )
  const [ formData, setFormData ] = useState<FormData>( {
    input: "K+L-M*N+(O^P)*W/U/V*T+Q",
    postfix: "",
    answer: null
  } )  
  
  
    const containerVariants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.3, // delay between each item
          when: "beforeChildren",
        },
      },
    }

  
  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }
  

  useEffect( () => {
    if ( stack ) {
      setBoxes( prev => 
        stack.map( (elem, index) =>
          <motion.div
            key={index}
            variants={childVariant}
            
          >
            <div className="h-[50px] w-[300px] bg-sky-500">{elem}</div>
          </motion.div>
        )
      )
    }
  }, [ stack ] )
  

  console.log(stack)


  const handleInfixtoPostfix = () => {

    setStack(prev => prev.slice(0, -1))
  }

  const handleInputChange = () => {

  }

  const parentVariant = {
    hidden: {
      opacity: 0,
      transition: {
        when: "beforeChildren",
        duration: 1
      }
    },
    visible: {
      opacity: 1,
      transition: {
        when: "afterChildren",
        delayChildren: stagger(.3)
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: .5
      }
    }
    
  }

  const childVariant = {
    hidden: {opacity: 0},
    visible: {opacity: 1, transition: {duration: .5}},
    exit: {opacity: 0, transition: {duration: .5}},

  }



  return (
    <div className="p-4">
      <AnimatePresence>
        <motion.div
          className="relative flex flex-col-reverse gap-4 h-[600px] w-[400px] bg-sky-100"
          variants = {parentVariant}
          initial = "hidden"
          animate = "visible"
          exit = "exit"
          key = "111"
        >
            {boxes}
        </motion.div>
      </AnimatePresence>  
        {/* <motion.div delayChil> */}
        {/* </motion.div> */}


      <Input className="w-100" placeholder="" value={ formData.input } onChange={handleInputChange} />
      <Button onClick={ handleInfixToPostfix }>Convert</Button>
      <div>Postfix: { formData.postfix }</div>
      
    </div>
  );
}
