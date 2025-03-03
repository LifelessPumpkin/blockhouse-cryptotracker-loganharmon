import { Fugaz_One } from 'next/font/google'
import React from 'react'
import Button from './Button'

const fugaz = Fugaz_One({subsets: ["latin"], weight:['400']})

export default function Login() {
  return (
    <div className='flex flex-col flex-1 justify-center
    items-center gap-4'>
        <h2 className={'text-4xl sm:text-5xl md:text-6xl textGradient ' + fugaz.className}>
            Log-in/Register
        </h2>
        <div class="form__group field">
            <input type="input" class="form__field" placeholder="E-Mail" required=""/>
            <label for="name" class="form__label">E-Mail</label>
        </div>
        <div class="form__group field">
            <input type="input" class="form__field" placeholder="Password" required=""/>
            <label for="name" class="form__label">Password</label>
        </div>
        <Button className="w-fit" text="Submit"/>
        <p className='text-center'>Don't have an account? <span className='textGradient'> Sign up!</span>

        </p>
    </div>
  )
}

