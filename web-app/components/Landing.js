import React from 'react'
import { Fugaz_One } from 'next/font/google'
import Button from './Button'
import Link from 'next/link'

const fugaz = Fugaz_One({subsets: ["latin"], weight:['400']})


export default function Landing() {
  return (
    <div className='py-10 sm:py-14 md:py-20 flex flex-col gap-4 sm:gap-8'>
        <h1 className={'text-5xl sm:text-text-6xl md_text-7xl text-center ' + fugaz.className}>
            <span>
                Welcome to the <span className='textGradient '>crypto tracker</span>
            </span>
        </h1>
        <p className='text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[400px] '>
            Diplays top 5 <span className='textGradient '>cryptos currencies</span> to get live updates on their prices!
        </p>
        <div className='flex gap-4 justify-center'>
            <Link href={'/Dashboard'}>
                <Button className="w-fit" text="Log-in"/>
            </Link>
            <Link href={'/Dashboard'}>
                <Button className="w-fit" text="Register"/>
            </Link>
        </div>
    </div>
  )
}
