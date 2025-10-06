# 🏦 Cajero Bancario React

Sistema de cajero bancario desarrollado en React con conexión a Supabase.

## 🚀 Características

- ✅ **Autenticación segura** con número de cuenta y PIN
- 💰 **Gestión de saldo** en tiempo real
- 📥 **Depósitos** con validación de montos
- 📤 **Retiros** con verificación de saldo
- � **Historial de operaciones** completo
- � **Gestión de usuarios** con edición de datos
- 📱 **Diseño responsive** para móviles y desktop
- 🎨 **Interfaz moderna** estilo BCP minimalista

## 🛠️ Instalación

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
```bash
# Copia el archivo de ejemplo
cp .env.example .env

# Edita el archivo .env con tus credenciales de Supabase
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

⚠️ **IMPORTANTE**: 
- Nunca subas el archivo `.env` al repositorio
- Las credenciales están protegidas usando variables de entorno
- El archivo `.env` está incluido en `.gitignore`
```

### 2. Configurar Supabase
1. Ve a tu panel de Supabase: https://hhlomroigntrwbvntwbo.supabase.co
2. Abre el **SQL Editor**
3. Ejecuta el contenido del archivo `supabase-functions.sql`

### 3. Ejecutar la aplicación
```bash
npm run dev
```

La aplicación se abrirá en: http://localhost:3000

## 🔐 Datos de Prueba

### Cuenta 1:
- **Número de cuenta:** 12345678901234
- **PIN:** 1234
- **Titular:** Juan Pérez García
- **Saldo inicial:** S/ 1,000.00

### Cuenta 2:
- **Número de cuenta:** 98765432109876
- **PIN:** 5678
- **Titular:** María González López
- **Saldo inicial:** S/ 500.00

## 📱 Uso de la Aplicación

### Iniciar Sesión
1. Ingresa tu número de cuenta (14 dígitos)
2. Ingresa tu PIN (4 dígitos)
3. Haz clic en "Ingresar"

### Operaciones Disponibles

#### 💰 Depósito
- Selecciona "Depósito" en el dashboard
- Ingresa el monto a depositar
- Confirma la operación

#### 💸 Retiro
- Selecciona "Retiro" en el dashboard
- Ingresa el monto a retirar
- El sistema verificará que tengas saldo suficiente

#### 🔄 Transferencia
- Selecciona "Transferencia" en el dashboard
- Ingresa el DNI del destinatario (8 dígitos)
- Busca al titular
- Ingresa el monto a transferir
- Confirma la operación

#### 📊 Historial
- Selecciona "Historial" para ver todas tus operaciones
- Se muestran ordenadas por fecha (más recientes primero)

## 🏗️ Estructura del Proyecto

```
cajero-bancario-react/
├── public/
├── src/
│   ├── components/
│   │   ├── Login.jsx          # Componente de autenticación
│   │   └── Dashboard.jsx      # Panel principal y operaciones
│   ├── services/
│   │   ├── supabase.js        # Configuración de Supabase
│   │   └── bankService.js     # Servicios bancarios
│   ├── App.jsx                # Componente principal
│   ├── App.css                # Estilos principales
│   └── main.jsx               # Punto de entrada
├── package.json
├── vite.config.js
├── index.html
├── supabase-functions.sql     # Funciones SQL para Supabase
└── README.md
```

## 🔧 Tecnologías Utilizadas

- **React 18** - Framework de JavaScript
- **Vite** - Herramienta de desarrollo
- **Supabase** - Base de datos PostgreSQL en la nube
- **Lucide React** - Iconos modernos
- **React Hot Toast** - Notificaciones elegantes
- **CSS3** - Estilos con gradientes y animaciones

## 🗄️ Base de Datos

### Tablas Principales:
- `titular` - Información de los titulares
- `cuenta_bancaria` - Cuentas bancarias
- `operacion` - Registro de operaciones
- `deposito` - Depósitos realizados
- `retiro` - Retiros realizados
- `transferencia` - Transferencias entre cuentas

### Funciones SQL:
- `actualizar_saldo_deposito()` - Actualiza saldo tras depósito
- `actualizar_saldo_retiro()` - Actualiza saldo tras retiro
- `actualizar_saldo_transferencia()` - Actualiza saldos tras transferencia

## 🔒 Seguridad

- Validación de entrada en el frontend
- Verificación de saldos antes de operaciones
- Transacciones atómicas en la base de datos
- Autenticación mediante número de cuenta y PIN
- Conexión segura con Supabase

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 **Móviles** (< 480px)
- 📱 **Tablets** (480px - 768px)
- 💻 **Desktop** (> 768px)

## 🚨 Notas Importantes

1. **Ejecuta las funciones SQL** en Supabase antes de usar la aplicación
2. Las credenciales de Supabase ya están configuradas
3. Los datos de prueba se insertan automáticamente al ejecutar el SQL
4. Todas las operaciones son en tiempo real
5. El historial se actualiza automáticamente

## 📞 Soporte

Si tienes problemas:
1. Verifica que Supabase esté funcionando
2. Asegúrate de haber ejecutado las funciones SQL
3. Revisa la consola del navegador para errores
4. Verifica tu conexión a internet

## 🎯 Próximas Características

- 📧 Notificaciones por email
- 🔐 Autenticación de dos factores
- 📄 Generación de reportes PDF
- 🌙 Modo oscuro
- 🌍 Múltiples idiomas

---

**¡Disfruta usando tu cajero bancario virtual! 🏦✨**