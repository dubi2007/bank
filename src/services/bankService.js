import { supabase } from './supabase.js'

export class BankService {
  // Autenticar usuario con número de cuenta y PIN
  static async login(nroCuenta, pin) {
    try {
      const { data, error } = await supabase
        .from('cuenta_bancaria')
        .select(`
          *,
          titular:titular(*)
        `)
        .eq('nro_cta', nroCuenta)
        .eq('pin_cta', pin)
        .single()

      if (error) {
        throw new Error('Credenciales incorrectas')
      }

      return data
    } catch (error) {
      throw new Error('Error al iniciar sesión: ' + error.message)
    }
  }

  // Obtener información de la cuenta
  static async getCuentaInfo(idnCta) {
    try {
      const { data, error } = await supabase
        .from('cuenta_bancaria')
        .select(`
          *,
          titular:titular(*)
        `)
        .eq('idn_cta', idnCta)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      throw new Error('Error al obtener información de cuenta: ' + error.message)
    }
  }

  // Realizar depósito
  static async depositar(idnCta, monto) {
    try {
      // Obtener información de la cuenta para conseguir el idn_tit
      const { data: cuenta, error: errorCuenta } = await supabase
        .from('cuenta_bancaria')
        .select('idn_tit')
        .eq('idn_cta', idnCta)
        .single()

      if (errorCuenta || !cuenta) {
        throw new Error('Cuenta no encontrada')
      }

      // Crear operación
      const { data: operacion, error: errorOpe } = await supabase
        .from('operacion')
        .insert({
          idn_tit: cuenta.idn_tit
        })
        .select()
        .single()

      if (errorOpe) throw errorOpe

      // Crear depósito
      const { error: errorDep } = await supabase
        .from('deposito')
        .insert({
          idn_ope: operacion.idn_ope,
          mnt_dep: monto
        })

      if (errorDep) throw errorDep

      // Actualizar saldo de la cuenta
      const { error: errorSaldo } = await supabase
        .rpc('actualizar_saldo_deposito', {
          p_idn_tit: cuenta.idn_tit,
          p_monto: monto
        })

      if (errorSaldo) throw errorSaldo

      return operacion
    } catch (error) {
      throw new Error('Error al realizar depósito: ' + error.message)
    }
  }

  // Realizar retiro
  static async retirar(idnCta, monto) {
    try {
      // Verificar saldo suficiente y obtener idn_tit
      const { data: cuenta, error: errorCuenta } = await supabase
        .from('cuenta_bancaria')
        .select('sld_cta, idn_tit')
        .eq('idn_cta', idnCta)
        .single()

      if (errorCuenta || !cuenta) {
        throw new Error('Cuenta no encontrada')
      }

      if (cuenta.sld_cta < monto) {
        throw new Error('Saldo insuficiente')
      }

      // Crear operación
      const { data: operacion, error: errorOpe } = await supabase
        .from('operacion')
        .insert({
          idn_tit: cuenta.idn_tit
        })
        .select()
        .single()

      if (errorOpe) throw errorOpe

      // Crear retiro
      const { error: errorRet } = await supabase
        .from('retiro')
        .insert({
          idn_ope: operacion.idn_ope,
          mnt_ret: monto
        })

      if (errorRet) throw errorRet

      // Actualizar saldo de la cuenta
      const { error: errorSaldo } = await supabase
        .rpc('actualizar_saldo_retiro', {
          p_idn_tit: cuenta.idn_tit,
          p_monto: monto
        })

      if (errorSaldo) throw errorSaldo

      return operacion
    } catch (error) {
      throw new Error('Error al realizar retiro: ' + error.message)
    }
  }

  // Obtener historial de operaciones
  static async getHistorialOperaciones(idnCta) {
    try {
      // Primero obtener el idn_tit de la cuenta
      const { data: cuenta, error: errorCuenta } = await supabase
        .from('cuenta_bancaria')
        .select('idn_tit')
        .eq('idn_cta', idnCta)
        .single()

      if (errorCuenta || !cuenta) {
        throw new Error('Cuenta no encontrada')
      }

      const { data, error } = await supabase
        .from('operacion')
        .select(`
          *,
          deposito(*),
          retiro(*)
        `)
        .eq('idn_tit', cuenta.idn_tit)
        .order('fch_ope', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      throw new Error('Error al obtener historial: ' + error.message)
    }
  }

  // Actualizar datos del usuario (teléfono y correo)
  static async actualizarDatosUsuario(idnTit, datos) {
    try {
      const { data, error } = await supabase
        .from('titular')
        .update({
          tlf_tit: datos.telefono,
          eml_tit: datos.correo
        })
        .eq('idn_tit', idnTit)

      if (error) {
        throw new Error('Error al actualizar datos: ' + error.message)
      }

      return data
    } catch (error) {
      throw new Error('Error al actualizar datos de usuario: ' + error.message)
    }
  }
}