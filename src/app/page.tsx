"use client"
import Image from "next/image";
import { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react"
import { FormData } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isOperand, precedence } from "@/lib/helperFns";




export default function Home() {
  
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
        // setTimeout()
        stack.map( (item, index) =>
          <motion.li
              key={index}
              variants={itemVariants}
              // initial="initial"
              // animate="animate"
              exit="exit"
              layout // this helps keep layout smooth
              style={{
                listStyle: 'none',
                marginBottom: '10px',
                background: '#eee',
                padding: '8px',
                borderRadius: '4px',
              }}
            >
              {item}
            </motion.li>
        )
      )
    }
  }, [ stack ] )
  


  // const handleInfixtoPostfix = () => {

  //   const delay = 600;

  //   let delayCount = 0;
  
  //   for ( let i = 0; i < formData.input.length; i++ ) {
    //     if ( formData.input[ i ] === "(" || formData.input[ i ] === ")" || formData.input[ i ] === "*" || formData.input[ i ] === "/" ) {
      //       setTimeout( () => {
        //         setStack( prev => {
  //           const result = [ ...prev, formData.input[ i ] ]
  //           return result
  //         })
  //       }, delayCount * delay)
  //       delayCount++
  //     }
  //   }
  // }
  

  const handleInfixToPostfix = () => {
    setStack(prev => [...prev].slice(0, prev.length - 1))
  }

  const handleInputChange = () => {

  }

  return (
    <div className="p-4">
      <div className="relative flex flex-col-reverse gap-4 h-[600px] w-[400px] bg-sky-100">
        <motion.ul
           variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ padding: 0 }}
        >
          <AnimatePresence>
            {boxes}
          </AnimatePresence>

        </motion.ul>

        {/* <motion.div delayChil> */}
        {/* </motion.div> */}


      </div>
      <Input className="w-100" placeholder="" value={ formData.input } onChange={handleInputChange} />
      <Button onClick={ handleInfixToPostfix }>Convert</Button>
      <div>Postfix: { formData.postfix }</div>
      
    </div>
  );
}
