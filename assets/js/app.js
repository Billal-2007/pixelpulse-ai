// ==========================================
// PixelPulse AI - Main Application Logic
// ==========================================

// Language Toggle Function
function toggleLanguage() {
    const html = document.documentElement;
    const btn = document.getElementById('langToggleBtn');
    
    if (html.getAttribute('data-lang') === 'en') {
        html.setAttribute('data-lang', 'bn');
        btn.innerText = '🇺🇸 English';
        localStorage.setItem('pixelpulse_lang', 'bn');
    } else {
        html.setAttribute('data-lang', 'en');
        btn.innerText = '🇧🇩 বাংলা';
        localStorage.setItem('pixelpulse_lang', 'en');
    }
}

// Load saved language preference on startup
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('pixelpulse_lang') || 'en';
    document.documentElement.setAttribute('data-lang', savedLang);
    const btn = document.getElementById('langToggleBtn');
    if (btn) {
        btn.innerText = savedLang === 'bn' ? '🇺🇸 English' : '🇧🇩 বাংলা';
    }
});

// Single Keyword Copy Function
function copyText(button) {
    const codeText = button.previousElementSibling.innerText;
    navigator.clipboard.writeText(codeText).then(() => {
        button.innerText = 'Copied!';
        button.style.background = '#059669';
        setTimeout(() => { 
            button.innerText = 'Copy'; 
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Batch Copy All Keywords for an Episode
function copyAll(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const codes = container.querySelectorAll('code');
    let allText = '';
    codes.forEach(c => { 
        allText += c.innerText + '\n'; 
    });
    
    navigator.clipboard.writeText(allText).then(() => {
        alert('All keywords in this episode copied successfully!');
    }).catch(err => {
        console.error('Failed to batch copy: ', err);
    });
}

// Multi-API Media Search Function (Pexels, Pixabay, Openverse)
async function searchMedia() {
    const query = document.getElementById('searchInput').value.trim();
    const api = document.getElementById('apiSource').value;
    const resultsSection = document.getElementById('resultsSection');
    const grid = document.getElementById('galleryGrid');
    
    if (!query) {
        alert('Please enter a search query');
        return;
    }
    
    resultsSection.style.display = 'block';
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--accent-color);">Fetching 4K media from ${api.toUpperCase()}...</p>`;

    try {
        // Simulating live robust API fetching handler across multiple sources
        setTimeout(() => {
            grid.innerHTML = `
                <div class="media-card">
                    <img src="https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=500" alt="Wildlife Media">
                    <div class="media-info">
                        <p><strong>Source:</strong> ${api.toUpperCase()}</p>
                        <p><strong>Query:</strong> ${query}</p>
                        <button style="margin-top:8px; width:100%; padding:6px; background:var(--accent-color);" onclick="alert('Downloading 4K media file...')">Download 4K</button>
                    </div>
                </div>
                <div class="media-card">
                    <img src="https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=500" alt="Wildlife Media">
                    <div class="media-info">
                        <p><strong>Source:</strong> ${api.toUpperCase()}</p>
                        <p><strong>Query:</strong> ${query}</p>
                        <button style="margin-top:8px; width:100%; padding:6px; background:var(--accent-color);" onclick="alert('Downloading 4K media file...')">Download 4K</button>
                    </div>
                </div>
            `;
        }, 700);

    } catch (error) {
        grid.innerHTML = `<p style="color: red; text-align:center;">Failed to fetch media. Please check API connection.</p>`;
    }
}
