import { supabase } from './supabase.js'

export class RegisterService {
  // Generar número de cuenta de 14 dígitos único
  static generateAccountNumber() {
    // Generar 14 dígitos aleatorios
    let accountNumber = ''
    for (let i = 0; i < 14; i++) {
      accountNumber += Math.floor(Math.random() * 10)
    }
    return accountNumber
  }

  // Generar CCI de 20 dígitos
  static generateCCI() {
    let cci = ''
    for (let i = 0; i < 20; i++) {
      cci += Math.floor(Math.random() * 10)
    }
    return cci
  }

  // Verificar si DNI ya existe
  static async checkDNIExists(dni) {
    try {
      const { data, error } = await supabase
        .from('titular')
        .select('dni_tit')
        .eq('dni_tit', dni)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      return !!data
    } catch (error) {
      console.error('Error verificando DNI:', error)
      throw new Error('Error al verificar DNI')
    }
  }

  // Verificar si email ya existe
  static async checkEmailExists(email) {
    try {
      const { data, error } = await supabase
        .from('titular')
        .select('eml_tit')
        .eq('eml_tit', email)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      return !!data
    } catch (error) {
      console.error('Error verificando email:', error)
      throw new Error('Error al verificar email')
    }
  }

  // Verificar si teléfono ya existe
  static async checkPhoneExists(phone) {
    try {
      const { data, error } = await supabase
        .from('titular')
        .select('tlf_tit')
        .eq('tlf_tit', phone)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      return !!data
    } catch (error) {
      console.error('Error verificando teléfono:', error)
      throw new Error('Error al verificar teléfono')
    }
  }

  // Verificar si número de cuenta ya existe
  static async checkAccountExists(accountNumber) {
    try {
      const { data, error } = await supabase
        .from('cuenta_bancaria')
        .select('nro_cta')
        .eq('nro_cta', accountNumber)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      return !!data
    } catch (error) {
      console.error('Error verificando cuenta:', error)
      throw new Error('Error al verificar número de cuenta')
    }
  }

  // Generar número de cuenta único
  static async generateUniqueAccountNumber() {
    let accountNumber
    let exists = true
    let attempts = 0
    const maxAttempts = 10

    while (exists && attempts < maxAttempts) {
      accountNumber = this.generateAccountNumber()
      exists = await this.checkAccountExists(accountNumber)
      attempts++
    }

    if (exists) {
      throw new Error('No se pudo generar un número de cuenta único')
    }

    return accountNumber
  }

  // Registrar nuevo titular y cuenta
  static async registerNewAccount(userData) {
    try {
      // Validaciones previas
      const dniExists = await this.checkDNIExists(userData.dni)
      if (dniExists) {
        throw new Error('El DNI ya está registrado')
      }

      const emailExists = await this.checkEmailExists(userData.email)
      if (emailExists) {
        throw new Error('El email ya está registrado')
      }

      const phoneExists = await this.checkPhoneExists(userData.telefono)
      if (phoneExists) {
        throw new Error('El teléfono ya está registrado')
      }

      // Generar datos automáticos
      const accountNumber = await this.generateUniqueAccountNumber()
      const cci = this.generateCCI()

      // 1. Crear titular
      const { data: titular, error: titularError } = await supabase
        .from('titular')
        .insert({
          nom_tit: userData.nombre,
          fir_ape_tit: userData.primerApellido,
          sec_ape_tit: userData.segundoApellido,
          dni_tit: userData.dni,
          eml_tit: userData.email,
          tlf_tit: userData.telefono
        })
        .select()
        .single()

      if (titularError) {
        console.error('Error creando titular:', titularError)
        throw new Error('Error al crear titular: ' + titularError.message)
      }

      // 2. Crear cuenta bancaria
      const { data: cuenta, error: cuentaError } = await supabase
        .from('cuenta_bancaria')
        .insert({
          idn_tit: titular.idn_tit,
          tpo_cta: userData.tipoCuenta,
          nro_cta: accountNumber,
          pin_cta: userData.pin,
          cci_cta: cci,
          sld_cta: userData.saldoInicial || 0
        })
        .select()
        .single()

      if (cuentaError) {
        console.error('Error creando cuenta:', cuentaError)
        // Si falla la cuenta, intentar eliminar el titular creado
        await supabase
          .from('titular')
          .delete()
          .eq('idn_tit', titular.idn_tit)
        
        throw new Error('Error al crear cuenta bancaria: ' + cuentaError.message)
      }

      // Retornar datos completos de la cuenta creada
      return {
        titular,
        cuenta: {
          ...cuenta,
          nom_tit: titular.nom_tit,
          fir_ape_tit: titular.fir_ape_tit,
          sec_ape_tit: titular.sec_ape_tit,
          dni_tit: titular.dni_tit,
          eml_tit: titular.eml_tit,
          tlf_tit: titular.tlf_tit
        }
      }

    } catch (error) {
      console.error('Error en registro:', error)
      throw error
    }
  }

  // Validaciones de formulario
  static validateFormData(userData) {
    const errors = {}

    // Validar nombre
    if (!userData.nombre || userData.nombre.trim().length < 2) {
      errors.nombre = 'El nombre debe tener al menos 2 caracteres'
    }

    // Validar apellidos
    if (!userData.primerApellido || userData.primerApellido.trim().length < 2) {
      errors.primerApellido = 'El primer apellido debe tener al menos 2 caracteres'
    }

    if (!userData.segundoApellido || userData.segundoApellido.trim().length < 2) {
      errors.segundoApellido = 'El segundo apellido debe tener al menos 2 caracteres'
    }

    // Validar DNI (8 dígitos)
    if (!userData.dni || !/^[0-9]{8}$/.test(userData.dni)) {
      errors.dni = 'El DNI debe tener exactamente 8 dígitos'
    }

    // Validar email
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    if (!userData.email || !emailRegex.test(userData.email)) {
      errors.email = 'Ingresa un email válido'
    }

    // Validar teléfono (7-15 dígitos)
    if (!userData.telefono || !/^[0-9]{7,15}$/.test(userData.telefono)) {
      errors.telefono = 'El teléfono debe tener entre 7 y 15 dígitos'
    }

    // Validar PIN (4 dígitos)
    if (!userData.pin || !/^[0-9]{4}$/.test(userData.pin)) {
      errors.pin = 'El PIN debe tener exactamente 4 dígitos'
    }

    // Validar confirmación de PIN
    if (userData.pin !== userData.confirmPin) {
      errors.confirmPin = 'Los PINs no coinciden'
    }

    // Validar tipo de cuenta
    if (!userData.tipoCuenta || !['AHORRO', 'CORRIENTE'].includes(userData.tipoCuenta)) {
      errors.tipoCuenta = 'Selecciona un tipo de cuenta válido'
    }

    // Validar saldo inicial (opcional, debe ser >= 0)
    if (userData.saldoInicial && (isNaN(userData.saldoInicial) || parseFloat(userData.saldoInicial) < 0)) {
      errors.saldoInicial = 'El saldo inicial debe ser un número positivo'
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }
}