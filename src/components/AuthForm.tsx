'use client'
import React, { useState, useCallback } from 'react' 
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import axios from 'axios'

import { Input } from './Input'
import { Button } from './Button'
import { AuthSocialButton } from './AuthSocialButton'

type Variant = 'LOGIN' | 'REGISTER'

export const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState(false)

  const toggleVariant = useCallback(() => {
    if(variant === 'LOGIN') {
      setVariant('REGISTER')
    }else {
      setVariant('LOGIN')
    }
  }, [variant])

  const handleOnSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    if(variant === 'REGISTER') {
      axios.post('/api/register', data)
    }

    if(variant === 'LOGIN') {
      //Next auth sign in
    }
  }

  const socialAction = async (action: string) => {
    setIsLoading(true);
    //Next auth social sign in
  }

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  })

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form 
          className="space-y-6"
          onSubmit={handleSubmit(handleOnSubmit)}  
        > 
          {
            variant === 'REGISTER' && (
              <Input 
                id="name" 
                label="Nome" 
                register={register}
                errors={errors}
                disabled={isLoading}
              />
            )
          }
          <Input 
            id="email" 
            label="Email" 
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input 
            id="password" 
            label="Senha" 
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <Button 
              fullWidth
              disabled={isLoading}
              type="submit"  
            >{variant === 'REGISTER' ? 'Criar conta' : 'Entrar'}</Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm ">
              <span className="bg-white px-2 text-gray-500">
                Ou continue com
              </span>
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')} />
            <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} />
          </div>
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {
              variant === 'LOGIN' ? 'Novo no mensseger?' : 'Já possui uma conta?'
            }
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {
              variant === 'LOGIN' ? 'Crie uma conta' : 'Entre com sua conta'
            }
          </div>
        </div>
      </div>
    </div>
  )
}
