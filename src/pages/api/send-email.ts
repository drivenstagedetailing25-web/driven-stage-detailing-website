export const prerender = false

import type { APIRoute } from 'astro'
import {
  validateEmail,
  isNotEmpty,
  generateEmailTemplate,
} from '../../lib/utils'

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY

interface EmailRequestBody {
  name: string
  email: string
  phone?: string
  service: string
  preferredDate: string
  preferredTime: string
  message?: string
}

export const POST: APIRoute = async ({ request }) => {
  const body: EmailRequestBody = await request.json()

  const requiredFields = [
    'name',
    'email',
    'service',
    'preferredDate',
    'preferredTime',
  ]

  const missingFields = requiredFields.filter(
    (field) => !body[field as keyof EmailRequestBody],
  )

  if (missingFields.length > 0) {
    return new Response(
      JSON.stringify({
        error: 'Missing required fields',
        missingFields,
      }),
      {
        status: 400,
      },
    )
  }

  if (!validateEmail(body.email)) {
    return new Response(
      JSON.stringify({
        error: 'Invalid email format',
      }),
      {
        status: 400,
      },
    )
  }

  const textFields = ['name', 'service'] as const
  const emptyFields = textFields.filter((field) => !isNotEmpty(body[field]))

  if (emptyFields.length > 0) {
    return new Response(
      JSON.stringify({
        error: 'Some fields are empty or contain only spaces',
        emptyFields,
      }),
      {
        status: 400,
      },
    )
  }

  try {
    const htmlTemplate = generateEmailTemplate(body)

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Formulario Web <no-reply@drivenstagedetailing.com>',
        to: ['info@drivenstagedetailing.com'],
        subject: `Nuevo mensaje de ${body.name} - ${body.service}`,
        html: htmlTemplate,
      }),
    })

    const responseData = await response.json()

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: responseData.message || 'Failed to send email',
        }),
        {
          status: response.status,
        },
      )
    }

    return new Response(
      JSON.stringify({ success: true, id: responseData.id }),
      {
        status: 200,
      },
    )
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Unexpected error' }), {
      status: 500,
    })
  }
}
