import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const body = await req.formData()
    const data: Record<string, string> = {}
    for (const [key, val] of body.entries()) {
      if (typeof val === 'string') data[key] = val.trim()
    }

    if (!data.email) {
      return new Response('Email is required', { status: 400 })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!
    )

    const { error } = await supabase.from('contact_submissions').insert({
      name: data.name || null,
      email: data.email,
      message: data.message || data.Message || null,
      page: data.page || data.booking_card || null,
      booking_card: data.booking_card || null,
      booking_type: data.booking_type || null,
      booking_hours: data.booking_hours || null,
      topic: data.topic || null,
      scope: data.scope || null,
      timeline: data.timeline || null,
      budget: data.budget || null,
    })

    if (error) throw error

    const redirectUrl = data._next || 'https://www.kevinglock.de'
    return new Response(null, {
      status: 302,
      headers: { Location: redirectUrl },
    })
  } catch (err) {
    return new Response(err instanceof Error ? err.message : 'Internal error', {
      status: 500,
    })
  }
})
