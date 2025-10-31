// SISTEMA DE CONTACTO - COMPATIBLE CON LIVE SERVER
console.log('🚀 Sistema de contacto iniciado');

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Sitio cargado en Live Server');
    
    setupBasicSiteFunctions();
    setupContactForms();
});

function setupBasicSiteFunctions() {
    // Menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Scroll suave
    document.querySelectorAll('.nav-menu a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

function setupContactForms() {
    console.log('📝 Configurando formularios...');
    
    const contactForms = document.querySelectorAll('#contact-form');
    console.log(`📋 Formularios encontrados: ${contactForms.length}`);
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            processForm(this);
        });
    });
}

function processForm(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Obtener datos
    const formData = {
        user_name: form.user_name.value,
        user_email: form.user_email.value,
        subject: form.subject.value,
        message: form.message.value
    };
    
    console.log('📤 Procesando formulario:', formData);
    
    // Validar
    if (!formData.user_email.includes('@')) {
        alert('❌ Ingresa un email válido');
        return;
    }
    
    // Mostrar carga
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Intentar con EmailJS
    sendWithEmailJS(formData)
        .then(success => {
            if (success) {
                showMessage('✅ ¡Mensaje enviado! Revisa tu email.', 'success');
                form.reset();
            } else {
                // Modo simulación
                setTimeout(() => {
                    showMessage('✅ Mensaje procesado (modo simulación)', 'success');
                    form.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
                return;
            }
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        })
        .catch(error => {
            console.error('Error:', error);
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
}

function sendWithEmailJS(formData) {
    return new Promise((resolve) => {
        // Verificar si EmailJS está disponible
        if (typeof emailjs === 'undefined') {
            console.log('❌ EmailJS no cargado (¿estás en Live Server?)');
            resolve(false);
            return;
        }
        
        console.log('✅ EmailJS disponible, enviando...');
        
        // Configuración
        emailjs.init("kZL-QLTpIhH63JDMk");
        
        const templateParams = {
            user_name: formData.user_name,
            user_email: formData.user_email,
            subject: formData.subject,
            message: formData.message,
            time: new Date().toLocaleString('es-ES')
        };
        
        emailjs.send('service_2iguanr', 'template_rwefmzk', templateParams)
            .then(response => {
                console.log('🎉 Email enviado:', response);
                resolve(true);
            })
            .catch(error => {
                console.error('❌ Error EmailJS:', error);
                resolve(false);
            });
    });
}

function showMessage(message, type) {
    // Mensaje simple con alert para pruebas
    alert(message);
}

// Verificador de Live Server
console.log('🌐 Verificando entorno...');
if (window.location.protocol === 'file:') {
    console.error('❌ ERROR: Estás en file:// - Usa Live Server!');
    alert('⚠️  ABRE CON LIVE SERVER!\n\nHaz clic derecho en index.html y selecciona "Open with Live Server"');
} else {
    console.log('✅ Entorno correcto:', window.location.href);
}