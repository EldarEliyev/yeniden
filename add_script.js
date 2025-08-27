// Character counter functionality
document.addEventListener('DOMContentLoaded', function() {
    // Character counters
    const titleInput = document.getElementById('adTitle');
    const descriptionInput = document.getElementById('adDescription');
    
    if (titleInput) {
        const titleCounter = titleInput.parentNode.querySelector('.char-counter');
        titleInput.addEventListener('input', function() {
            const count = this.value.length;
            const max = this.getAttribute('maxlength');
            titleCounter.textContent = `${count}/${max}`;
            
            if (count > max * 0.9) {
                titleCounter.style.color = '#ff6b35';
            } else {
                titleCounter.style.color = '#999';
            }
        });
    }
    
    if (descriptionInput) {
        const descCounter = descriptionInput.parentNode.querySelector('.char-counter');
        descriptionInput.addEventListener('input', function() {
            const count = this.value.length;
            const max = this.getAttribute('maxlength');
            descCounter.textContent = `${count}/${max}`;
            
            if (count > max * 0.9) {
                descCounter.style.color = '#ff6b35';
            } else {
                descCounter.style.color = '#999';
            }
        });
    }

    // Photo upload functionality
    const photoInput = document.getElementById('photoInput');
    const uploadArea = document.getElementById('uploadArea');
    const photoPreview = document.getElementById('photoPreview');
    
    if (photoInput && uploadArea && photoPreview) {
        // Drag and drop functionality
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = '#ff6b35';
            this.style.background = 'rgba(255,107,53,0.1)';
        });
        
        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.borderColor = '#ddd';
            this.style.background = 'transparent';
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = '#ddd';
            this.style.background = 'transparent';
            
            const files = e.dataTransfer.files;
            handleFiles(files);
        });
        
        // File input change
        photoInput.addEventListener('change', function() {
            handleFiles(this.files);
        });
    }

    function handleFiles(files) {
        const maxFiles = 10;
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        
        let validFiles = [];
        
        for (let i = 0; i < Math.min(files.length, maxFiles); i++) {
            const file = files[i];
            
            if (!allowedTypes.includes(file.type)) {
                alert(`${file.name} - Yalnız JPEG və PNG formatları qəbul edilir.`);
                continue;
            }
            
            if (file.size > maxSize) {
                alert(`${file.name} - Fayl həcmi 5MB-dan çox ola bilməz.`);
                continue;
            }
            
            validFiles.push(file);
        }
        
        // Clear previous previews
        photoPreview.innerHTML = '';
        
        // Show previews
        validFiles.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.createElement('div');
                preview.className = 'photo-item';
                preview.innerHTML = `
                    <img src="${e.target.result}" alt="Preview ${index + 1}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;">
                    <button type="button" onclick="removePhoto(this)" style="position: absolute; top: 5px; right: 5px; background: red; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; cursor: pointer;">×</button>
                `;
                preview.style.position = 'relative';
                preview.style.display = 'inline-block';
                preview.style.margin = '5px';
                photoPreview.appendChild(preview);
            };
            reader.readAsDataURL(file);
        });
    }

    // City and district relationship
    const citySelect = document.getElementById('city');
    const districtSelect = document.getElementById('district');
    
    const districts = {
        'baku': [
            { value: 'nasimi', text: 'Nəsimi' },
            { value: 'yasamal', text: 'Yasamal' },
            { value: 'sabail', text: 'Səbail' },
            { value: 'narimanov', text: 'Nərimanov' },
            { value: 'khatai', text: 'Xətai' },
            { value: 'binagadi', text: 'Binəqədi' },
            { value: 'surakhani', text: 'Suraxanı' },
            { value: 'sabunchu', text: 'Sabunçu' }
        ],
        'ganja': [
            { value: 'kepez', text: 'Kəpəz' },
            { value: 'nizami', text: 'Nizami' }
        ],
        'sumgayit': [
            { value: 'sumgayit1', text: '1-ci məhəllə' },
            { value: 'sumgayit2', text: '2-ci məhəllə' },
            { value: 'sumgayit3', text: '3-cü məhəllə' }
        ]
    };
    
    if (citySelect && districtSelect) {
        citySelect.addEventListener('change', function() {
            const selectedCity = this.value;
            districtSelect.innerHTML = '<option value="">Rayon seçin</option>';
            
            if (selectedCity && districts[selectedCity]) {
                districts[selectedCity].forEach(district => {
                    const option = document.createElement('option');
                    option.value = district.value;
                    option.textContent = district.text;
                    districtSelect.appendChild(option);
                });
                districtSelect.disabled = false;
            } else {
                districtSelect.disabled = true;
            }
        });
    }

    // Form submission
    const form = document.getElementById('addAdForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'red';
                    isValid = false;
                } else {
                    field.style.borderColor = '#e1e5e9';
                }
            });
            
            if (!isValid) {
                alert('Zəhmət olmasa bütün vacib sahələri doldurun.');
                return;
            }
            
            // Show success message
            alert('Elanınız uğurla yerləşdirildi! Moderasiyadan keçdikdən sonra saytda görünəcək.');
            
            // Redirect to main page
            setTimeout(() => {
                window.location.href = 'elan_list.html';
            }, 1000);
        });
    }

    // Preview functionality
    const previewBtn = document.querySelector('.preview-btn');
    if (previewBtn) {
        previewBtn.addEventListener('click', function() {
            // Create preview modal or new window
            alert('Önizləmə funksiyası tezliklə əlavə ediləcək.');
        });
    }

    // Phone number formatting
    const phoneInput = document.getElementById('contactPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            
            if (value.startsWith('994')) {
                value = '+' + value;
            } else if (value.startsWith('0')) {
                value = '+994' + value.substring(1);
            } else if (value.length > 0 && !value.startsWith('+994')) {
                value = '+994' + value;
            }
            
            this.value = value;
        });
    }
});

// Remove photo function
function removePhoto(button) {
    button.parentElement.remove();
}

// Premium option selection
document.addEventListener('change', function(e) {
    if (e.target.type === 'checkbox' && e.target.name === 'premium') {
        const premiumOptions = document.querySelectorAll('input[name="premium"]');
        const selectedOptions = Array.from(premiumOptions).filter(cb => cb.checked);
        
        let totalCost = 0;
        selectedOptions.forEach(option => {
            switch(option.value) {
                case 'top':
                    totalCost += 15;
                    break;
                case 'urgent':
                    totalCost += 8;
                    break;
                case 'highlight':
                    totalCost += 5;
                    break;
            }
        });
        
        // Update total cost display if needed
        console.log('Ümumi premium xərc:', totalCost, '₼');
    }
});