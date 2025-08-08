"use client"
import Image from "next/image";
import { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence, stagger } from "motion/react"
import { FormData } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { infixToPostfix, isOperand, precedence } from "@/lib/helperFns";




export default function Home() {
  
  const [ stack, setStack ] = useState<string[]>( [] )
  const [ boxes, setBoxes ] = useState<ReactNode[]>( [] )
  const [ formData, setFormData ] = useState<FormData>( {
    input: "K+L-M*N+(O^P)*W/U/V*T+Q",
    postFix: "",
    answer: null
  } )  

  useEffect( () => {
    if ( stack ) {
      setBoxes( prev => 
        stack.map( (elem, index) =>
          <motion.div
            key={index}
            variants={ childVariant }
            initial="hidden"
            animate="visible"
            exit = "hidden"
            
          >
            <div className="h-[50px] w-[300px] bg-sky-500">{elem}</div>
          </motion.div>
        )
      )
    }
  }, [ stack ] )
  

  console.log(stack)

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleInfixToPostfix = async () => {
    const input = formData.input
    let localPostFix = "";
    const tempStack = [ ...stack ]

    for ( let i = 0; i < input.length; i++ ) {
      const char = input[i]
        if (isOperand(char)) {
          localPostFix += char;
          setFormData( prev => ( { ...prev, postfix: localPostFix } ) )
          await delay(300);
        }
        else if (char == '(') {
          tempStack.push( '(' );
          setStack([...tempStack]); // trigger animation
          await delay(300);
        }
        else if (char == ')') {
            while (tempStack[tempStack.length - 1] != '(') {
                localPostFix += tempStack[tempStack.length - 1];
                tempStack.pop();
            }
            tempStack.pop();
        }
        else {
            while (tempStack.length != 0 && precedence(char) <= precedence(tempStack[tempStack.length - 1])) {
                localPostFix += tempStack[tempStack.length - 1];
                tempStack.pop();
            }
            tempStack.push(char);
        }
    }

    // while (tempStack.length != 0) {
    //     localPostFix += tempStack[tempStack.length - 1];
    //     tempStack.pop();
    // }

    setStack(prev => tempStack)
  }

  console.log(stack)
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
    
  }

  const childVariant = {
    hidden: {opacity: 0},
    visible: { opacity: 1, transition: { duration: .5 } },

  }



  return (
    <div className="p-4">
        <motion.div
          className="relative flex flex-col-reverse gap-4 h-[600px] w-[400px] bg-sky-100"
          variants = {parentVariant}
          initial = "hidden"
          animate = "visible"
          >
          <AnimatePresence>
            {boxes}
          </AnimatePresence>   
        </motion.div>


      <Input className="w-100" placeholder="" value={ formData.input } onChange={ handleInputChange } />
      <Button onClick={ handleInfixToPostfix }>Convert</Button>
      <div>postFix: { formData.postFix }</div>
      
    </div>
  );
}
