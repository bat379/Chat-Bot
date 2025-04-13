// Character Model Controller
class CharacterModel {
    constructor() {
        // DOM Elements
        this.femaleModel = document.getElementById('female-model');
        this.maleModel = document.getElementById('male-model');
        this.femaleHair = document.getElementById('female-hair');
        this.maleHair = document.getElementById('male-hair');
        this.femaleClothes = document.getElementById('female-clothes');
        this.maleClothes = document.getElementById('male-clothes');
        
        // Style selectors
        this.hairstyleSelectors = document.querySelectorAll('.hairstyle-option');
        this.clothingSelectors = document.querySelectorAll('.clothing-option');
        
        // Current settings
        this.currentModel = 'female';
        this.currentHairstyle = 'long';
        this.currentClothing = 'casual';
        this.hairColor = '#663300';
        this.clothesColor = '#3333CC';
        
        // Create SVG models
        this.createSVGModels();
        
        // Initialize
        this.initEventListeners();
        this.updateAppearance();
    }
    
    createSVGModels() {
        // Create female model SVG
        const femaleSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        femaleSVG.setAttribute('width', '300');
        femaleSVG.setAttribute('height', '600'); // Increased height for larger model
        femaleSVG.setAttribute('viewBox', '0 0 300 600'); // Adjusted viewBox for larger model
        
        // Female body (skin tone)
        const femaleBody = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        femaleBody.setAttribute('d', 'M150,100 C180,100 200,130 200,170 L200,230 C200,250 190,270 180,290 L180,420 C180,460 170,500 150,500 C130,500 120,460 120,420 L120,290 C110,270 100,250 100,230 L100,170 C100,130 120,100 150,100 Z');
        femaleBody.setAttribute('fill', '#FFD8B1');
        
        // Female face
        const femaleFace = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        femaleFace.setAttribute('cx', '150');
        femaleFace.setAttribute('cy', '90');
        femaleFace.setAttribute('rx', '45'); // Increased radius for larger face
        femaleFace.setAttribute('ry', '55'); // Increased radius for larger face
        femaleFace.setAttribute('fill', '#FFD8B1');
        
        // Female eyes
        const femaleLeftEye = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        femaleLeftEye.setAttribute('cx', '140');
        femaleLeftEye.setAttribute('cy', '80');
        femaleLeftEye.setAttribute('r', '5');
        femaleLeftEye.setAttribute('fill', '#000');
        
        const femaleRightEye = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        femaleRightEye.setAttribute('cx', '160');
        femaleRightEye.setAttribute('cy', '80');
        femaleRightEye.setAttribute('r', '5');
        femaleRightEye.setAttribute('fill', '#000');
        
        // Female mouth
        const femaleMouth = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        femaleMouth.setAttribute('d', 'M140,105 Q150,115 160,105');
        femaleMouth.setAttribute('stroke', '#000');
        femaleMouth.setAttribute('fill', 'none');
        
        // Female arms
        const femaleArms = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        femaleArms.setAttribute('d', 'M100,170 L80,250 L100,250 L120,170 Z M200,170 L220,250 L200,250 L180,170 Z');
        femaleArms.setAttribute('fill', '#FFD8B1');
        
        // Female legs
        const femaleLegs = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        femaleLegs.setAttribute('d', 'M130,420 L140,600 L160,600 L170,420 Z');
        femaleLegs.setAttribute('fill', '#FFD8B1');
        
        // Female hair container (will be styled via CSS)
        const femaleHairSVG = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        femaleHairSVG.setAttribute('id', 'female-hair-svg');
        femaleHairSVG.setAttribute('fill', this.hairColor);
        
        // Female clothes container (will be styled via CSS)
        const femaleClothingSVG = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        femaleClothingSVG.setAttribute('id', 'female-clothes-svg');
        femaleClothingSVG.setAttribute('fill', this.clothesColor);
        femaleClothingSVG.setAttribute('d', 'M100,170 L200,170 L180,290 L120,290 Z'); // Improved clothing design
        
        // Add all elements to female SVG
        femaleSVG.appendChild(femaleLegs); // Add legs first
        femaleSVG.appendChild(femaleClothingSVG); // Add clothes second
        femaleSVG.appendChild(femaleBody);
        femaleSVG.appendChild(femaleArms); // Add arms
        femaleSVG.appendChild(femaleFace);
        femaleSVG.appendChild(femaleLeftEye);
        femaleSVG.appendChild(femaleRightEye);
        femaleSVG.appendChild(femaleMouth);
        femaleSVG.appendChild(femaleHairSVG); // Add hair last
        
        // Create male model SVG
        const maleSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        maleSVG.setAttribute('width', '300');
        maleSVG.setAttribute('height', '600'); // Increased height for larger model
        maleSVG.setAttribute('viewBox', '0 0 300 600'); // Adjusted viewBox for larger model
        
        // Male body (skin tone)
        const maleBody = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        maleBody.setAttribute('d', 'M150,100 C190,100 210,130 210,170 L210,230 C210,250 200,270 190,290 L190,420 C190,460 180,500 150,500 C120,500 110,460 110,420 L110,290 C100,270 90,250 90,230 L90,170 C90,130 110,100 150,100 Z');
        maleBody.setAttribute('fill', '#FFD8B1');
        
        // Male face
        const maleFace = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        maleFace.setAttribute('cx', '150');
        maleFace.setAttribute('cy', '90');
        maleFace.setAttribute('rx', '50'); // Increased radius for larger face
        maleFace.setAttribute('ry', '60'); // Increased radius for larger face
        maleFace.setAttribute('fill', '#FFD8B1');
        
        // Male eyes
        const maleLeftEye = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        maleLeftEye.setAttribute('cx', '140');
        maleLeftEye.setAttribute('cy', '80');
        maleLeftEye.setAttribute('r', '6');
        maleLeftEye.setAttribute('fill', '#000');
        
        const maleRightEye = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        maleRightEye.setAttribute('cx', '160');
        maleRightEye.setAttribute('cy', '80');
        maleRightEye.setAttribute('r', '6');
        maleRightEye.setAttribute('fill', '#000');
        
        // Male mouth
        const maleMouth = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        maleMouth.setAttribute('d', 'M135,105 Q150,110 165,105');
        maleMouth.setAttribute('stroke', '#000');
        maleMouth.setAttribute('fill', 'none');
        
        // Male arms
        const maleArms = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        maleArms.setAttribute('d', 'M90,170 L70,250 L90,250 L110,170 Z M210,170 L230,250 L210,250 L190,170 Z');
        maleArms.setAttribute('fill', '#FFD8B1');
        
        // Male legs
        const maleLegs = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        maleLegs.setAttribute('d', 'M120,420 L130,600 L170,600 L180,420 Z');
        maleLegs.setAttribute('fill', '#FFD8B1');
        
        // Male hair container (will be styled via CSS)
        const maleHairSVG = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        maleHairSVG.setAttribute('id', 'male-hair-svg');
        maleHairSVG.setAttribute('fill', this.hairColor);
        
        // Male clothes container (will be styled via CSS)
        const maleClothingSVG = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        maleClothingSVG.setAttribute('id', 'male-clothes-svg');
        maleClothingSVG.setAttribute('fill', this.clothesColor);
        maleClothingSVG.setAttribute('d', 'M90,170 L210,170 L190,290 L110,290 Z'); // Improved clothing design
        
        // Add all elements to male SVG
        maleSVG.appendChild(maleLegs); // Add legs first
        maleSVG.appendChild(maleClothingSVG); // Add clothes second
        maleSVG.appendChild(maleBody);
        maleSVG.appendChild(maleArms); // Add arms
        maleSVG.appendChild(maleFace);
        maleSVG.appendChild(maleLeftEye);
        maleSVG.appendChild(maleRightEye);
        maleSVG.appendChild(maleMouth);
        maleSVG.appendChild(maleHairSVG); // Add hair last
        
        // Clear and append SVGs to containers
        this.femaleModel.innerHTML = '';
        this.maleModel.innerHTML = '';
        this.femaleModel.appendChild(femaleSVG);
        this.maleModel.appendChild(maleSVG);
        
        // Update references to hair and clothes elements
        this.femaleHair = document.getElementById('female-hair-svg');
        this.maleHair = document.getElementById('male-hair-svg');
        this.femaleClothes = document.getElementById('female-clothes-svg');
        this.maleClothes = document.getElementById('male-clothes-svg');
    }
    
    initEventListeners() {
        // Hairstyle options
        this.hairstyleSelectors.forEach(selector => {
            selector.addEventListener('click', () => {
                this.setHairstyle(selector.dataset.style);
                this.updateActiveClass(this.hairstyleSelectors, selector);
            });
        });
        
        // Clothing options
        this.clothingSelectors.forEach(selector => {
            selector.addEventListener('click', () => {
                this.setClothing(selector.dataset.style);
                this.updateActiveClass(this.clothingSelectors, selector);
            });
        });
    }
    
    setModel(model) {
        this.currentModel = model;
        
        // Update visibility
        if (model === 'female') {
            this.femaleModel.classList.remove('hidden');
            this.maleModel.classList.add('hidden');
        } else {
            this.femaleModel.classList.add('hidden');
            this.maleModel.classList.remove('hidden');
        }
        
        // Apply animation
        const activeModel = model === 'female' ? this.femaleModel : this.maleModel;
        activeModel.classList.add('model-change');
        setTimeout(() => {
            activeModel.classList.remove('model-change');
        }, 500);
        
        this.updateAppearance();
    }
    
    setHairstyle(style) {
        this.currentHairstyle = style;
        this.updateAppearance();
    }
    
    setClothing(style) {
        this.currentClothing = style;
        this.updateAppearance();
    }
    
    setHairColor(color) {
        this.hairColor = color;
        this.updateAppearance();
    }
    
    setClothesColor(color) {
        this.clothesColor = color;
        this.updateAppearance();
    }
    
    updateAppearance() {
        // Get current elements
        const hairElement = this.currentModel === 'female' ? this.femaleHair : this.maleHair;
        const clothesElement = this.currentModel === 'female' ? this.femaleClothes : this.maleClothes;
        
        // Update colors
        if (hairElement) hairElement.setAttribute('fill', this.hairColor);
        if (clothesElement) clothesElement.setAttribute('fill', this.clothesColor);
        
        // Update hairstyle path based on style
        if (hairElement) {
            switch(this.currentHairstyle) {
                case 'long':
                    hairElement.setAttribute('d', this.currentModel === 'female' 
                        ? 'M110,20 C90,40 90,70 110,90 L190,90 C210,70 210,40 190,20 Z'
                        : 'M105,20 C85,40 85,70 105,90 L195,90 C215,70 215,40 195,20 Z');
                    break;
                case 'short':
                    hairElement.setAttribute('d', this.currentModel === 'female'
                        ? 'M120,20 C100,30 100,50 120,60 L180,60 C200,50 200,30 180,20 Z'
                        : 'M115,20 C95,30 95,50 115,60 L185,60 C205,50 205,30 185,20 Z');
                    break;
                case 'curly':
                    hairElement.setAttribute('d', this.currentModel === 'female'
                        ? 'M110,20 C80,30 80,50 90,70 C100,90 110,100 150,100 C190,100 200,90 210,70 C220,50 220,30 190,20 Z'
                        : 'M105,20 C75,30 75,50 85,70 C95,90 105,100 150,100 C195,100 205,90 215,70 C225,50 225,30 195,20 Z');
                    break;
                case 'bob':
                    hairElement.setAttribute('d', this.currentModel === 'female'
                        ? 'M110,20 C90,30 90,60 110,80 L190,80 C210,60 210,30 190,20 Z'
                        : 'M105,20 C85,30 85,60 105,80 L195,80 C215,60 215,30 195,20 Z');
                    break;
                default:
                    hairElement.setAttribute('d', this.currentModel === 'female'
                        ? 'M110,20 C90,40 90,70 110,90 L190,90 C210,70 210,40 190,20 Z'
                        : 'M105,20 C85,40 85,70 105,90 L195,90 C215,70 215,40 195,20 Z');
            }
        }
        
        // Update clothing path based on style
        if (clothesElement) {
            switch(this.currentClothing) {
                case 'casual':
                    clothesElement.setAttribute('d', this.currentModel === 'female'
                        ? 'M100,180 L120,180 L120,320 C120,350 130,380 150,380 C170,380 180,350 180,320 L180,180 L200,180 L200,380 L100,380 Z'
                        : 'M90,180 L110,180 L110,320 C110,350 130,380 150,380 C170,380 190,350 190,320 L190,180 L210,180 L210,380 L90,380 Z');
                    break;
                case 'formal':
                    clothesElement.setAttribute('d', this.currentModel === 'female'
                        ? 'M100,180 L120,180 L135,210 L150,180 L165,210 L180,180 L200,180 L200,380 L100,380 Z'
                        : 'M90,180 L110,180 L125,210 L150,180 L175,210 L190,180 L210,180 L210,380 L90,380 Z');
                    break;
                case 'dress':
                    clothesElement.setAttribute('d', this.currentModel === 'female'
                        ? 'M100,180 L200,180 L220,380 L80,380 Z'
                        : 'M90,180 L210,180 L230,380 L70,380 Z');
                    break;
                case 'sporty':
                    clothesElement.setAttribute('d', this.currentModel === 'female'
                        ? 'M100,180 L120,180 L120,250 L180,250 L180,180 L200,180 L200,380 L100,380 Z'
                        : 'M90,180 L110,180 L110,250 L190,250 L190,180 L210,180 L210,380 L90,380 Z');
                    break;
                default:
                    clothesElement.setAttribute('d', this.currentModel === 'female'
                        ? 'M100,180 L120,180 L120,320 C120,350 130,380 150,380 C170,380 180,350 180,320 L180,180 L200,180 L200,380 L100,380 Z'
                        : 'M90,180 L110,180 L110,320 C110,350 130,380 150,380 C170,380 190,350 190,320 L190,180 L210,180 L210,380 L90,380 Z');
            }
        }
    }
    
    updateActiveClass(elements, activeElement) {
        elements.forEach(el => {
            el.classList.remove('active');
        });
        activeElement.classList.add('active');
    }
    
    getCurrentSettings() {
        return {
            model: this.currentModel,
            hairstyle: this.currentHairstyle,
            clothing: this.currentClothing,
            hairColor: this.hairColor,
            clothesColor: this.clothesColor
        };
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.characterModel = new CharacterModel();
});
