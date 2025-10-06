import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase usando variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validación de variables de entorno
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY son requeridas.\n' +
    'Por favor, configúralas en tu archivo .env'
  )
}

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Verificar conexión (solo en desarrollo)
if (import.meta.env.DEV) {
  console.log('🔗 Conectado a Supabase:', supabaseUrl)
}

