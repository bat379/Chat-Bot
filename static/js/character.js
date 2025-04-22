// Character Model Controller
class CharacterModel {
    constructor() {
        this.currentModel = 'female';
        this.currentHairstyle = 'short';
        this.currentClothing = 'casual';
        this.hairColor = '#663300';
        this.clothesColor = '#3333CC';

        // Get DOM elements
        this.femaleModel = document.getElementById('female-model');
        this.maleModel = document.getElementById('male-model');
        this.femaleHair = document.getElementById('female-hair-svg');
        this.maleHair = document.getElementById('male-hair-svg');
        this.femaleClothes = document.getElementById('female-clothes-svg');
        this.maleClothes = document.getElementById('male-clothes-svg');

        // Initialize model and bind events
        this.initializeModel();
        this.bindEvents();
    }

    initializeModel() {
        this.setModel(this.currentModel);
        this.updateAppearance();
        
        // Add transition classes
        [this.femaleModel, this.maleModel].forEach(model => {
            model.classList.add('model-transition');
            model.style.opacity = model === this.femaleModel ? '1' : '0';
        });
    }

    bindEvents() {
        // Gender toggle
        document.querySelectorAll('.gender-option').forEach(button => {
            button.addEventListener('click', (e) => {
                const model = e.target.dataset.model;
                this.setModel(model);
                this.updateButtonStates('gender-option', e.target);
            });
        });

        // Hairstyle options
        document.querySelectorAll('.hairstyle-option').forEach(button => {
            button.addEventListener('click', (e) => {
                const style = e.target.dataset.style;
                this.setHairstyle(style);
                this.updateButtonStates('hairstyle-option', e.target);
            });
        });

        // Clothing options
        document.querySelectorAll('.clothing-option').forEach(button => {
            button.addEventListener('click', (e) => {
                const style = e.target.dataset.style;
                this.setClothing(style);
                this.updateButtonStates('clothing-option', e.target);
            });
        });

        // Color swatches and inputs
        document.querySelectorAll('.color-swatch').forEach(swatch => {
            swatch.addEventListener('click', (e) => {
                const color = e.target.dataset.color;
                const isHair = e.target.closest('.color-picker').querySelector('#hair-color');
                if (isHair) {
                    this.setHairColor(color);
                    document.getElementById('hair-color').value = color;
                } else {
                    this.setClothesColor(color);
                    document.getElementById('clothes-color').value = color;
                }
            });
        });

        ['hair-color', 'clothes-color'].forEach(id => {
            document.getElementById(id).addEventListener('input', (e) => {
                if (id === 'hair-color') {
                    this.setHairColor(e.target.value);
                } else {
                    this.setClothesColor(e.target.value);
                }
            });
        });
    }

    updateButtonStates(className, activeButton) {
        document.querySelectorAll(`.${className}`).forEach(button => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    }

    setModel(model) {
        if (this.currentModel === model) return;
        
        this.currentModel = model;
        const fadeOut = model === 'female' ? this.maleModel : this.femaleModel;
        const fadeIn = model === 'female' ? this.femaleModel : this.maleModel;
        
        fadeOut.style.opacity = '0';
        fadeOut.classList.add('hidden');
        fadeIn.classList.remove('hidden');
        
        // Force reflow
        fadeIn.offsetHeight;
        fadeIn.style.opacity = '1';
        
        this.updateAppearance();
    }

    setHairstyle(style) {
        this.currentHairstyle = style;
        const hairElement = this.currentModel === 'female' ? this.femaleHair : this.maleHair;
        
        const hairstyles = {
            female: {
                short: 'M90,40 C70,60 70,90 90,110 Q125,120 160,110 C180,90 180,60 160,40 Q125,30 90,40 Z',
                long: 'M90,40 C70,60 70,160 90,200 Q125,210 160,200 C180,160 180,60 160,40 Q125,30 90,40 Z',
                curly: 'M90,40 C70,60 70,90 90,110 Q105,130 125,140 Q145,130 160,110 C180,90 180,60 160,40 Q125,20 90,40 Z',
                bob: 'M90,40 C70,60 70,100 90,130 Q125,140 160,130 C180,100 180,60 160,40 Q125,30 90,40 Z'
            },
            male: {
                short: 'M85,40 C65,60 65,80 85,100 Q125,110 165,100 C185,80 185,60 165,40 Q125,30 85,40 Z',
                long: 'M85,40 C65,60 65,140 85,170 Q125,180 165,170 C185,140 185,60 165,40 Q125,30 85,40 Z',
                curly: 'M85,40 C65,60 65,90 85,110 Q105,130 125,120 Q145,130 165,110 C185,90 185,60 165,40 Q125,20 85,40 Z',
                spiky: 'M85,40 L95,30 L105,40 L115,25 L125,40 L135,25 L145,40 L155,30 L165,40 C185,60 185,80 165,100 Q125,110 85,100 C65,80 65,60 85,40 Z'
            }
        };

        const genderHairstyles = hairstyles[this.currentModel];
        hairElement.setAttribute('d', genderHairstyles[style]);
    }

    setClothing(style) {
        this.currentClothing = style;
        const clothesElement = this.currentModel === 'female' ? this.femaleClothes : this.maleClothes;
        
        const clothes = {
            female: {
                casual: 'M85,170 L165,170 L145,290 L105,290 Z',
                formal: 'M85,170 L165,170 L155,290 L95,290 L85,170 M105,200 L145,200',
                dress: 'M85,170 C85,220 95,270 105,290 L145,290 C155,270 165,220 165,170 Z',
                sporty: 'M85,170 L165,170 L145,250 L105,250 Z M95,250 L155,250 L145,290 L105,290 Z'
            },
            male: {
                casual: 'M85,170 L175,170 L155,290 L105,290 Z',
                formal: 'M85,170 L175,170 L165,290 L95,290 L85,170 M105,200 L155,200',
                dress: 'M85,170 C85,220 95,270 105,290 L155,290 C165,270 175,220 175,170 Z',
                sporty: 'M85,170 L175,170 L155,250 L105,250 Z M95,250 L165,250 L155,290 L105,290 Z'
            }
        };

        const genderClothes = clothes[this.currentModel];
        clothesElement.setAttribute('d', genderClothes[style]);
    }

    setHairColor(color) {
        this.hairColor = color;
        const transition = 'fill 0.3s ease';
        this.femaleHair.style.transition = transition;
        this.maleHair.style.transition = transition;
        this.femaleHair.setAttribute('fill', color);
        this.maleHair.setAttribute('fill', color);
    }

    setClothesColor(color) {
        this.clothesColor = color;
        const transition = 'fill 0.3s ease';
        this.femaleClothes.style.transition = transition;
        this.maleClothes.style.transition = transition;
        this.femaleClothes.setAttribute('fill', color);
        this.maleClothes.setAttribute('fill', color);
    }

    updateAppearance() {
        requestAnimationFrame(() => {
            try {
                this.setHairstyle(this.currentHairstyle);
                this.setClothing(this.currentClothing);
                this.setHairColor(this.hairColor);
                this.setClothesColor(this.clothesColor);
            } catch (error) {
                console.error('Error updating appearance:', error);
                // Should provide more specific error handling
            }
        });
    }
}

// Add CSS for transitions and interactions
const style = document.createElement('style');
style.textContent = `
    .model-transition {
        transition: all 0.3s ease-in-out;
    }
    .model-image {
        position: relative;
        cursor: pointer;
    }
    .model-image svg {
        transition: transform 0.3s ease;
        will-change: transform;
    }
    .model-image:hover svg {
        transform: scale(1.02);
    }
    .hidden {
        display: none;
    }
    .active {
        background-color: #4CAF50 !important;
        color: white !important;
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.characterModel = new CharacterModel();
    } catch (error) {
        console.error('Error initializing CharacterModel:', error);
    }
});

// Update the SVG paths in the HTML first
const femaleBody = `
    <!-- Female body - more curved, feminine shape -->
    <path d="M125,100 C145,100 160,130 160,170 L160,230 C160,250 150,270 140,290 L140,380 C140,420 130,460 125,460 C120,460 110,420 110,380 L110,290 C100,270 90,250 90,230 L90,170 C90,130 105,100 125,100 Z" fill="#FFD8B1"/>
    
    <!-- Female face base -->
    <ellipse cx="125" cy="85" rx="30" ry="40" fill="#FFD8B1"/>
    
    <!-- Female ears -->
    <path d="M95,75 Q90,85 95,95" stroke="#E8C3A3" fill="#FFD8B1" stroke-width="2"/>
    <path d="M155,75 Q160,85 155,95" stroke="#E8C3A3" fill="#FFD8B1" stroke-width="2"/>
    
    <!-- Female neck -->
    <path d="M115,115 L135,115" stroke="#FFD8B1" stroke-width="10"/>
    
    <!-- Female eyebrows - softer curves -->
    <path d="M110,65 Q115,63 120,65" stroke="#4A4A4A" fill="none" stroke-width="2"/>
    <path d="M130,65 Q135,63 140,65" stroke="#4A4A4A" fill="none" stroke-width="2"/>
    
    <!-- Female eyes - larger and more expressive -->
    <ellipse cx="115" cy="75" rx="5" ry="4" fill="#FFFFFF"/>
    <circle cx="115" cy="75" r="2.5" fill="#000000"/>
    <ellipse cx="135" cy="75" rx="5" ry="4" fill="#FFFFFF"/>
    <circle cx="135" cy="75" r="2.5" fill="#000000"/>
    
    <!-- Female nose - delicate -->
    <path d="M122,80 Q125,85 128,80" stroke="#E8C3A3" fill="none" stroke-width="1.5"/>
    <path d="M125,80 L125,90" stroke="#E8C3A3" stroke-width="1.5"/>
    
    <!-- Female mouth - softer and fuller -->
    <path d="M120,95 Q125,98 130,95" stroke="#FF9999" fill="#FFB6C1" stroke-width="1.5"/>
    
    <!-- Female cheeks - soft blush -->
    <circle cx="110" cy="85" r="5" fill="#FFB6C1" opacity="0.3"/>
    <circle cx="140" cy="85" r="5" fill="#FFB6C1" opacity="0.3"/>
`;

const maleBody = `
    <!-- Male body - broader shoulders, more angular masculine shape -->
    <path d="M125,100 C165,100 185,130 185,170 L185,230 C185,250 175,270 165,290 L165,380 C165,420 145,460 125,460 C105,460 85,420 85,380 L85,290 C75,270 65,250 65,230 L65,170 C65,130 85,100 125,100 Z" fill="#E6C5A9"/>
    
    <!-- Male face base -->
    <ellipse cx="125" cy="85" rx="40" ry="45" fill="#E6C5A9"/>
    
    <!-- Male neck -->
    <path d="M105,115 L145,115" stroke="#E6C5A9" stroke-width="12"/>
    
    <!-- Male ears -->
    <path d="M85,75 Q80,85 85,95" stroke="#D4B499" fill="#E6C5A9" stroke-width="3"/>
    <path d="M165,75 Q170,85 165,95" stroke="#D4B499" fill="#E6C5A9" stroke-width="3"/>
    
    <!-- Male eyebrows -->
    <path d="M105,65 L115,63" stroke="#4A4A4A" stroke-width="2.5"/>
    <path d="M135,63 L145,65" stroke="#4A4A4A" stroke-width="2.5"/>
    
    <!-- Male eyes -->
    <ellipse cx="110" cy="75" rx="4" ry="3" fill="#FFFFFF"/>
    <circle cx="110" cy="75" r="2" fill="#000000"/>
    <ellipse cx="140" cy="75" rx="4" ry="3" fill="#FFFFFF"/>
    <circle cx="140" cy="75" r="2" fill="#000000"/>
    
    <!-- Male nose -->
    <path d="M120,80 Q125,85 130,80" stroke="#D4B499" fill="none" stroke-width="2"/>
    <path d="M125,80 L125,90" stroke="#D4B499" stroke-width="2"/>
    
    <!-- Male mouth -->
    <path d="M115,95 Q125,97 135,95" stroke="#CC9999" fill="none" stroke-width="2"/>
    
    <!-- Male neck (duplicate) -->
    <path d="M105,115 L145,115" stroke="#E6C5A9" stroke-width="12"/>
`;

// Update the hairstyles object with more distinct styles
const hairstyles = {
    female: {
        short: 'M90,40 C70,60 70,90 90,110 Q125,120 160,110 C180,90 180,60 160,40 Q125,30 90,40 Z',
        long: 'M90,40 C70,60 70,160 90,200 Q125,210 160,200 C180,160 180,60 160,40 Q125,30 90,40 Z',
        curly: 'M90,40 C70,60 70,90 90,110 Q105,130 125,140 Q145,130 160,110 C180,90 180,60 160,40 Q125,20 90,40 Z',
        bob: 'M90,40 C70,60 70,100 90,130 Q125,140 160,130 C180,100 180,60 160,40 Q125,30 90,40 Z'
    },
    male: {
        short: 'M85,40 C65,60 65,80 85,100 Q125,110 165,100 C185,80 185,60 165,40 Q125,30 85,40 Z',
        long: 'M85,40 C65,60 65,140 85,170 Q125,180 165,170 C185,140 185,60 165,40 Q125,30 85,40 Z',
        curly: 'M85,40 C65,60 65,90 85,110 Q105,130 125,120 Q145,130 165,110 C185,90 185,60 165,40 Q125,20 85,40 Z',
        spiky: 'M85,40 L95,30 L105,40 L115,25 L125,40 L135,25 L145,40 L155,30 L165,40 C185,60 185,80 165,100 Q125,110 85,100 C65,80 65,60 85,40 Z'
    }
};

// Update the clothes object with more distinct styles
const clothes = {
    female: {
        casual: 'M90,170 Q125,180 160,170 L145,290 Q125,300 105,290 Z',
        formal: 'M90,170 Q125,180 160,170 L150,290 Q125,310 100,290 L90,170 M105,200 Q125,210 145,200',
        dress: 'M90,170 C90,220 100,270 110,290 Q125,300 140,290 C150,270 165,220 165,170 Z',
        sporty: 'M90,170 Q125,180 160,170 L145,250 Q125,260 105,250 Z M95,250 Q125,260 155,250 L145,290 Q125,300 105,290 Z'
    },
    male: {
        casual: 'M65,170 Q125,180 185,170 L165,290 Q125,300 75,290 Z M85,170 L85,220 M165,170 L165,220 M65,170 C65,140 75,130 85,170 M165,170 C175,140 185,130 185,170',
        formal: 'M65,170 Q125,180 185,170 L175,290 Q125,310 75,290 L65,170 M85,200 Q125,210 165,200 M65,170 C65,140 75,130 85,170 M165,170 C175,140 185,130 185,170 M75,170 L75,190 M175,170 L175,190',
        suit: 'M65,170 Q125,180 185,170 L175,290 Q125,300 75,290 Z M85,170 L85,220 M165,170 L165,220 M65,170 C65,140 75,130 85,170 M165,170 C175,140 185,130 185,170 M75,180 L175,180 M75,190 L175,190',
        sporty: 'M65,170 Q125,180 185,170 L165,250 Q125,260 85,250 Z M75,250 Q125,260 175,250 L165,290 Q125,300 85,290 Z M65,170 C65,140 75,130 85,170 M165,170 C175,140 185,130 185,170'
    }
};