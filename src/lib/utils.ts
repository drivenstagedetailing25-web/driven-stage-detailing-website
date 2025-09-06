/**
 * Validates if an email has a correct format using regular expression
 * @param email - The email to validate
 * @returns true if the email is valid, false otherwise
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false
  }

  // Regular expression to validate emails
  // Allows: letters, numbers, dots, hyphens and underscores before @
  // Domain must have at least one dot and valid letters
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  
  return emailRegex.test(email.trim())
}

/**
 * Validates if a string is not empty (after trimming)
 * @param value - The value to validate
 * @returns true if the value is not empty, false otherwise
 */
export function isNotEmpty(value: string): boolean {
  return typeof value === 'string' && value.trim().length > 0
}

interface EmailTemplateData {
  name: string
  email: string
  phone?: string
  service: string
  preferredDate: string
  preferredTime: string
  message?: string
}

/**
 * Generates an elegant HTML template for contact emails
 * @param data - The contact form data
 * @returns HTML string formatted for email
 */
export function generateEmailTemplate(data: EmailTemplateData): string {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nueva consulta desde el sitio web</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        line-height: 1.6;
        color: #333;
        margin: 0;
        padding: 20px;
        background-color: #f4f4f4;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background: white;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      .header {
        background: linear-gradient(135deg, #FFD700, #FFA500);
        color: white;
        padding: 30px 20px;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
        font-weight: bold;
      }
      .content {
        padding: 30px;
      }
      .field-group {
        margin-bottom: 20px;
        border-left: 4px solid #FFD700;
        padding-left: 15px;
      }
      .field-label {
        font-weight: bold;
        color: #555;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .field-value {
        font-size: 16px;
        color: #333;
        margin-top: 5px;
      }
      .service-highlight {
        background: #f8f9fa;
        border: 1px solid #e9ecef;
        border-radius: 5px;
        padding: 15px;
        margin: 20px 0;
      }
      .datetime-container {
        display: flex;
        gap: 20px;
      }
      .datetime-item {
        flex: 1;
        background: #f8f9fa;
        padding: 15px;
        border-radius: 5px;
        text-align: center;
      }
      .message-section {
        background: #f8f9fa;
        border-radius: 5px;
        padding: 20px;
        margin-top: 20px;
      }
      .footer {
        background: #333;
        color: white;
        padding: 20px;
        text-align: center;
        font-size: 14px;
      }
      .contact-info {
        background: #e3f2fd;
        border-radius: 5px;
        padding: 15px;
        margin-top: 15px;
      }
      .icon {
        display: inline-block;
        width: 20px;
        margin-right: 10px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>🚗 Nueva Consulta de Detailing</h1>
        <p>Alguien se ha contactado a través del sitio web</p>
      </div>
      
      <div class="content">
        <div class="field-group">
          <div class="field-label">👤 Cliente</div>
          <div class="field-value">${data.name}</div>
        </div>

        <div class="contact-info">
          <div class="field-group" style="border: none; padding: 0; margin-bottom: 10px;">
            <div class="field-label">📧 Email</div>
            <div class="field-value">
              <a href="mailto:${data.email}" style="color: #1976d2; text-decoration: none;">
                ${data.email}
              </a>
            </div>
          </div>
          
          ${data.phone ? `
          <div class="field-group" style="border: none; padding: 0; margin-bottom: 0;">
            <div class="field-label">📱 Teléfono</div>
            <div class="field-value">
              <a href="tel:${data.phone}" style="color: #1976d2; text-decoration: none;">
                ${data.phone}
              </a>
            </div>
          </div>
          ` : ''}
        </div>

        <div class="service-highlight">
          <div class="field-label">🔧 Servicio Solicitado</div>
          <div class="field-value" style="font-size: 18px; font-weight: 600; color: #FF8C00;">
            ${data.service}
          </div>
        </div>

        <div style="margin: 25px 0;">
          <div class="field-label" style="margin-bottom: 15px;">📅 Preferencia de Cita</div>
          <div class="datetime-container">
            <div class="datetime-item">
              <div class="field-label">Fecha Preferida</div>
              <div class="field-value" style="font-weight: 600;">
                ${new Date(data.preferredDate).toLocaleDateString('es-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
            <div class="datetime-item">
              <div class="field-label">Hora Preferida</div>
              <div class="field-value" style="font-weight: 600;">
                ${data.preferredTime}
              </div>
            </div>
          </div>
        </div>

        ${data.message ? `
        <div class="message-section">
          <div class="field-label">💬 Mensaje Adicional</div>
          <div class="field-value" style="margin-top: 10px; font-style: italic;">
            "${data.message}"
          </div>
        </div>
        ` : ''}
      </div>

      <div class="footer">
        <p><strong>Driven Stage Detailing</strong></p>
        <p>Email recibido el ${new Date().toLocaleDateString('es-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</p>
      </div>
    </div>
  </body>
  </html>
  `
}
