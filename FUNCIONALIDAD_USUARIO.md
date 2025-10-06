# 👤 Funcionalidad de Gestión de Usuario

## Nuevas Características Implementadas

### 🔍 Información del Usuario
- **Botón "Mi Info"** en el header para ver información completa del usuario
- **Modal informativo** que muestra todos los datos del usuario:
  - Nombre completo
  - DNI
  - Correo electrónico
  - Teléfono
  - Tipo de cuenta
  - Número de cuenta
  - CCI
  - Saldo actual

### ✏️ Edición de Datos
- **Botón "Modificar Datos"** dentro del modal de información
- **Modal de edición** que permite actualizar:
  - ✅ Correo electrónico (con validación de formato)
  - ✅ Número de teléfono (9-15 dígitos)
  - ❌ Nombre (solo lectura)
  - ❌ DNI (solo lectura)

### 🛡️ Validaciones Implementadas
- **Correo**: Formato válido de email
- **Teléfono**: Solo números, entre 9 y 15 dígitos
- **Campos requeridos**: No se permite envío con campos vacíos

### 🎨 Componentes Creados
1. **UserInfoModal.jsx** - Modal para mostrar información completa
2. **EditUserModal.jsx** - Modal para editar datos permitidos
3. **NavigationButtons.jsx** - Actualizado con botón "Mi Info"

### 🔧 Backend
- **BankService.actualizarDatosUsuario()** - Función para actualizar datos en Supabase
- Actualización directa en la tabla `titular` de la base de datos

### 💻 Uso
1. Click en "Mi Info" en el header
2. Ver toda la información del usuario
3. Click en "Modificar Datos" para editar
4. Actualizar correo y/o teléfono
5. Guardar cambios con validación automática

## Estructura de Archivos
```
src/components/dashboard/
├── UserInfoModal.jsx      # Modal información usuario
├── EditUserModal.jsx      # Modal edición datos
├── NavigationButtons.jsx  # Botones header (actualizado)
└── index.js              # Exportaciones (actualizado)
```

## API Utilizada
```javascript
// Actualizar datos de usuario
BankService.actualizarDatosUsuario(idnTit, {
  telefono: '999999999',
  correo: 'nuevo@email.com'
})
```

¡La aplicación bancaria ahora incluye gestión completa de información de usuario con validaciones y seguridad! 🎉