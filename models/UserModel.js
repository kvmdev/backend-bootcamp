import { z } from 'zod'

export const userSchema = z.object({
    nombre: z.string(), 
    email: z.string().email()
})