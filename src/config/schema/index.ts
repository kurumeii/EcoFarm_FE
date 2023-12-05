import { ACCOUNT_TYPE } from '@/utils/constants/enums'
import { capitalize, omit } from 'lodash-es'
import { type TFunction } from 'next-i18next'
import { z } from 'zod'

export const createCommonSchema = <T extends TFunction>(t: T) => {
  const passwordSchema = z
    .string()
    .min(8, {
      message: capitalize(
        t('auth:validation.password.min', {
          min: 8,
        }),
      ),
    })
    .max(20, {
      message: capitalize(
        t('auth:validation.password.max', {
          max: 20,
        }),
      ),
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(.{8,20})$/g,
      t('validation.password.invalid', {
        ns: 'auth',
      }),
    )

  const emailSchema = z
    .string()
    .min(1, { message: capitalize(t('auth:validation.email.isRequired')) })
    .email({
      message: capitalize(t('auth:validation.email.isInValid')),
    })

  const dateSchema = z.date({
    required_error: capitalize(t('common:validation.date.isRequired')),
    invalid_type_error: capitalize(t('common:validation.date.isInValid')),
  })

  return {
    passwordSchema,
    emailSchema,
    dateSchema,
  }
}

export const createLoginSchema = <T extends TFunction>(t: T) => {
  return z.object({
    usernameOrEmail: z.string().min(1, {
      message: capitalize(t('auth:validation.usernameOrEmail.isRequired')),
    }),
    password: createCommonSchema(t).passwordSchema,
    isRemember: z.boolean().optional().default(false),
  })
}

export const createSignUpSchema = <T extends TFunction>(t: T) => {
  return z
    .object({
      username: z.string().min(1, {
        message: capitalize(t('auth:validation.username.isRequired')),
      }),
      email: createCommonSchema(t).emailSchema,
      password: createCommonSchema(t).passwordSchema,
      confirmPassword: createCommonSchema(t).passwordSchema,
      accountType: z.nativeEnum(omit(ACCOUNT_TYPE, ['ADMIN', 'SA']), {
        required_error: capitalize(
          t('auth:validation.account-type.isRequired'),
        ),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: capitalize(t('auth:validation.password.notMatch')),
      path: ['confirmPassword'],
    })
}

export const createForgotPasswordSchema = <T extends TFunction>(t: T) => {
  return z.object({
    email: createCommonSchema(t).emailSchema,
  })
}

export type LoginSchemaType = z.infer<ReturnType<typeof createLoginSchema>>
export type SignUpSchemaType = z.infer<ReturnType<typeof createSignUpSchema>>
export type ForgotPasswordSchemaType = z.infer<
  ReturnType<typeof createForgotPasswordSchema>
>
