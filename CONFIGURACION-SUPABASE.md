# 🔧 Configuración Final de Supabase

## ⚠️ PASO IMPORTANTE: Ejecutar Funciones SQL

**ANTES de usar la aplicación**, debes ejecutar las siguientes funciones SQL en tu panel de Supabase:

### 1. Ve a tu Panel de Supabase
🔗 https://hhlomroigntrwbvntwbo.supabase.co

### 2. Abre el SQL Editor
- Haz clic en "SQL Editor" en el menú izquierdo
- Selecciona "+ New query"

### 3. Ejecuta estas Funciones SQL (copia y pega):

```sql
-- Función para actualizar saldo después de un depósito
CREATE OR REPLACE FUNCTION actualizar_saldo_deposito(p_idn_tit INTEGER, p_monto NUMERIC)
RETURNS VOID AS $$
BEGIN
    UPDATE cuenta_bancaria 
    SET sld_cta = sld_cta + p_monto
    WHERE idn_tit = p_idn_tit;
END;
$$ LANGUAGE plpgsql;

-- Función para actualizar saldo después de un retiro
CREATE OR REPLACE FUNCTION actualizar_saldo_retiro(p_idn_tit INTEGER, p_monto NUMERIC)
RETURNS VOID AS $$
BEGIN
    UPDATE cuenta_bancaria 
    SET sld_cta = sld_cta - p_monto
    WHERE idn_tit = p_idn_tit;
END;
$$ LANGUAGE plpgsql;

-- Función para actualizar saldos después de una transferencia
CREATE OR REPLACE FUNCTION actualizar_saldo_transferencia(p_idn_tit_origen INTEGER, p_idn_tit_destino INTEGER, p_monto NUMERIC)
RETURNS VOID AS $$
BEGIN
    -- Retirar del origen
    UPDATE cuenta_bancaria 
    SET sld_cta = sld_cta - p_monto
    WHERE idn_tit = p_idn_tit_origen;
    
    -- Depositar al destino
    UPDATE cuenta_bancaria 
    SET sld_cta = sld_cta + p_monto
    WHERE idn_tit = p_idn_tit_destino;
END;
$$ LANGUAGE plpgsql;
```

### 4. (OPCIONAL) Datos de Prueba

Si quieres datos de prueba para probar la aplicación:

```sql
-- Insertar titular de prueba
INSERT INTO titular (nom_tit, fir_ape_tit, sec_ape_tit, dni_tit, eml_tit, tlf_tit) 
VALUES ('Juan', 'Pérez', 'García', '12345678', 'juan@email.com', '987654321')
ON CONFLICT (dni_tit) DO NOTHING;

-- Insertar cuenta de prueba
INSERT INTO cuenta_bancaria (idn_tit, tpo_cta, nro_cta, pin_cta, cci_cta, sld_cta)
VALUES (
    (SELECT idn_tit FROM titular WHERE dni_tit = '12345678'),
    'AHORRO',
    '12345678901234',
    '1234',
    '12345678901234567890',
    1000.00
)
ON CONFLICT (nro_cta) DO NOTHING;

-- Insertar otro titular para transferencias
INSERT INTO titular (nom_tit, fir_ape_tit, sec_ape_tit, dni_tit, eml_tit, tlf_tit) 
VALUES ('María', 'González', 'López', '87654321', 'maria@email.com', '123456789')
ON CONFLICT (dni_tit) DO NOTHING;

-- Insertar segunda cuenta
INSERT INTO cuenta_bancaria (idn_tit, tpo_cta, nro_cta, pin_cta, cci_cta, sld_cta)
VALUES (
    (SELECT idn_tit FROM titular WHERE dni_tit = '87654321'),
    'CORRIENTE',
    '98765432109876',
    '5678',
    '98765432109876543210',
    500.00
)
ON CONFLICT (nro_cta) DO NOTHING;
```

## ✅ Una vez ejecutado el SQL:

🌐 **Abre la aplicación:** http://localhost:3000

### 🔐 Credenciales de Prueba:

**Cuenta 1:**
- Número: `12345678901234`
- PIN: `1234`

**Cuenta 2:**
- Número: `98765432109876`
- PIN: `5678`

---

## 🎯 ¡Todo Listo!

Tu aplicación de cajero bancario está completamente configurada y lista para usar. 

**Características disponibles:**
- ✅ Login seguro
- ✅ Consulta de saldo
- ✅ Depósitos
- ✅ Retiros
- ✅ Transferencias
- ✅ Historial de operaciones
- ✅ Diseño responsive

**¡Disfruta tu cajero bancario virtual! 🏦✨**