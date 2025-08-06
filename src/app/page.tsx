"use client"
import Image from "next/image";
import { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react"
import { FormData } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { infixToPostfix } from "@/lib/helperFns";




export default function Home() {
  
  const [ stack, setStack ] = useState<string[]>( [] )
  const [ boxes, setBoxes ] = useState<ReactNode[]>( [] )
  const [ formData, setFormData ] = useState<FormData>( {
    input: "K+L-M*N+(O^P)*W/U/V*T+Q",
    postfix: "",
    answer: null
  } )  
  
  

  useEffect( () => {
    if ( stack ) {
      setBoxes( prev => 

        stack.map( (elem, index) =>
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="box"
          >
            <div className="h-[50px] w-[300px] bg-sky-500"></div>
          </motion.div>
        )
      )
    }
  }, [ stack ] )
  

  console.log(stack)


  const handleInfixtoPostfix = () => {

    const delay = 600;

    let delayCount = 0;

    for ( let i = 0; i < formData.input.length; i++ ) {
      if ( formData.input[ i ] === "(" || formData.input[ i ] === ")" || formData.input[ i ] === "*" || formData.input[ i ] === "/" ) {
        setTimeout( () => {
          setStack( prev => {
            const result = [ ...prev, formData.input[ i ] ]
            return result
          })
        }, delayCount * delay)
        delayCount++
      }
    }
  }

  const handleInputChange = () => {

  }

  return (
    <div className="p-4">
      <div className="relative flex flex-col-reverse gap-4 h-[600px] w-[400px] bg-sky-100">
        <AnimatePresence>

          {boxes}
        </AnimatePresence>
        {/* <motion.div delayChil> */}
        {/* </motion.div> */}


      </div>
      <Input className="w-100" placeholder="" value={ formData.input } onChange={handleInputChange} />
      <Button onClick={ handleInfixtoPostfix }>Convert</Button>
      <div>Postfix: { formData.postfix }</div>
      
    </div>
  );
}
